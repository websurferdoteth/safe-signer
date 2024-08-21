# SafeSigner
The purpose of SafeSigner is to enable developers to sign messages and transactions from their preferred browser or mobile wallet without increasing your  surface area for hacks by requiring you to view, copy and paste your private key.

## TODO
[x] Add message signing method 
[x] Add multiple methods for signing:
- [x] Add message (EIP712) signing method
- [x] Add Transaction signing method
[x] Add convenient ways to interact:
- [x] From contract deployment processes
- [x] From any other process that needs a signature
[ ] Add Sign out button
[x] Add message standard that handles message type, network, data, etc.
[x] Add ability to change networks
[ ] Add Custom Chain Support
[ ] Safely handle when wallet doesn't have the requested chain
[ ] Bubble up front end errors such as transaction rejections to back end
[x] Clean up api responses
[ ] Add Readme instructions for api use
[ ] Detect chain from transaction and remove top level chain property
[ ] Add "Ready to sign" button so that users can change their wallet before being flooded with requests

## How to use
You can import the SafeSigner class and use it like so:
```typescript
// Start the service
const signer = new SafeSigner();
await signer.start();

const request: SafeSignerRequest = {
  type: 'message',
  data: {
    message: 'Hello, world!'
  }
};

// Send a message to be signed by the user
const signedMessage = await signer.sendRequest(request);
```
The user is then prompted to sign in their browser and it returns the signed message.

## Limitations
Because you have to sign each request manually from your wallet this method is not practical for signing dozens of transactions in one sitting unless you have great patience.