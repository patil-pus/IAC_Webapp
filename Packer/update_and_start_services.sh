
sudo DEBIAN_FRONTEND=noninteractive apt update -q
sudo DEBIAN_FRONTEND=noninteractive apt upgrade -q -y

sudo apt-get install -y nodejs npm

sudo apt-get install -y curl software-properties-common gnupg

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt-get install -y nodejs




node -v
npm -v

sudo DEBIAN_FRONTEND=noninteractive apt -q --assume-yes install mariadb-client mariadb-server
sudo mysql --execute="ALTER USER 'root'@'localhost' IDENTIFIED BY 'root'; FLUSH PRIVILEGES;"
sudo systemctl start mariadb
sudo systemctl enable mariadb

sudo DEBIAN_FRONTEND=noninteractive apt install -y unzip

sudo unzip 'webapp.zip '-d webapp
sudo apt-get clean



