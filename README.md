# Clothes Shop App

## Node Version Manager

You need to install the Node version > 18 to install dependencies and run commands.

- Install [nvm](http://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html)
- Run `nvm install 18` in terminal
- Install dependencies `npm install` or `yarn install`

## Get Started

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/clothes-shop.git
   cd clothes-shop
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Run with docker
1. Build image:
   ```sh
   docker build -t react-app:latest .
   ```

2. Run container
   ```sh
   docker run -d -p 80:80 --name react-server react-app
   ```