# Daily Swap

## Prerequisites

- Node.js =v16
- npm (Node Package Manager)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dailycrypto-me/dex.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd dex
   ```
3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set env variables**
   ```bash
   cp .env.example .env
   ```

   Fill the environment variables
   
   ```bash
   # rpc url
   REACT_APP_NETWORK_URL=

   # chain id
   REACT_APP_CHAIN_ID=

   # wallet connect project id
   # https://cloud.walletconnect.com/
   REACT_APP_WALLET_CONNECT_PROJECT_ID=

   # block explorer url
   REACT_APP_EXPLORER_URL=

   # development / production
   NODE_ENV=

   GENERATE_SOURCEMAP=false
   ```


## Running the Application

```bash
npm run start
````

Once the application is up and running, you can access the application via the specified endpoint (e.g., http://localhost:3000).
