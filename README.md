# dailydex.net

## Installation
Install NVM package (for Ubuntu)
```
sudo apt-get update
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
```

Install Dependencies
```
cd daily-dex
nvm use 16
npm i --legacy-peer-deps
```

Compile Build - Final output will be in `build` directory
```
npm run build
```

