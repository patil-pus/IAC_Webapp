packer {
  required_plugins {
    amazon = {
      version = " >= 1.0.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9" #us-east-1
}

variable "ssh_username" {
  type    = string
  default = "admin"
}
# variable "SOURCE_AMI_DEV_OWNER" {
#   type    = string
#   default = "454063085085"
# }
# variable "SOURCE_AMI_DEMO_OWNER" {
#   type    = string
#   default = "743136055866"
# }
variable "subnet_id" {
  type    = string
  default = "subnet-09a15fd70f9812bd8" #us_east_1
}
variable "INSTANCE_TYPE" {
  type    = string
  default = "t2.micro"
}

source "amazon-ebs" "debian-ami" {

  ami_name                    = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  source_ami                  = "${var.source_ami}"
  instance_type               = "${var.INSTANCE_TYPE}"
  region                      = "${var.aws_region}"
  ami_description             = "AMI FOR CSYE"
  ssh_username                = "${var.ssh_username}"
  subnet_id                   = "${var.subnet_id}"
  associate_public_ip_address = true
  ami_users                   = ["743136055866", "460740249339"]



  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }


}

build {

  sources = ["source.amazon-ebs.debian-ami"]


  provisioner "file" {
    source      = "/home/runner/work/IAC_Webapp/IAC_Webapp/webapp.zip"
    destination = "~/webapp.zip "



  provisioner "shell" {
    script = "Packer/update_and_start_services.sh"

  }


}

