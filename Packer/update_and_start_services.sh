sudo DEBIAN_FRONTEND=noninteractive apt update -q
sudo DEBIAN_FRONTEND=noninteractive apt -q --assume-yes install mariadb-client mariadb-server

sudo apt update

sudo systemctl start mariadb
sudo systemctl enable mariadb

sudo apt-get clean
