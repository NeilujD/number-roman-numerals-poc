# Description
POC that permit to convert a number to roman numerals using express on server side and redis.
This version use SSE to send back the result.

# Requirements
1. Node version should be >=12

2. Redis

3. Installation
```bash
git clone git@github.com:NeilujD/number-roman-numerals-poc.git
cd number-roman-numerals-poc
npm install
```

# Start locally
1. Start first redis with default config
```bash
npm run start:redis
```

2. Then start the express server
```bash
npm start
```

# Test
```bash
npm test
```