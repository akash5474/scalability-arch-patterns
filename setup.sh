#!/bin/bash
apt-get update && apt-get dist-upgrade -y
apt-get install git -y

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | bash
source ~/.profile

nvm install iojs

git clone https://github.com/akash5474/scalability-arch-patterns.git

cd scalability-arch-patterns
npm install