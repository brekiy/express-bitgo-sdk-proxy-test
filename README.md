an extremely simple node express proxy setup to let the frontend use BitGo SDK methods with a non-BitGo backend

## setup + usage
- `npm install`
- `npm install -g typescript` ignore if you already have it
- `npm install -g ts-node` ignore if you already have it
- replace the enterprise id, access token, etc. with yours
- `tsc create-tss-wallet.ts`
- `node server.js`
- `ts-node create-tss-wallet.js` in another shell

