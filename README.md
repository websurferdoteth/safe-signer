# SafeSigner (WIP)
>This whole project is very erratic. Perhaps there is a better construction that would solve the problems but the issues are related to needing to ensure the chain changes before a sign request is made. Due to React I don't see a clean, simple way of solving the problems.

The purpose of SafeSigner is to enable developers to sign messages and transactions from their preferred browser or mobile wallet without increasing your surface area for hacks by requiring you to view, copy and paste your private key.

## TODO
- [x] Add message signing method
- [x] Add message (EIP712) signing method
- [x] Add Transaction signing method
- [x] From contract deployment processes
- [x] From any other process that needs a signature
- [x] Add Sign out button
- [x] Add message standard that handles message type, network, data, etc.
- [x] Add ability to change networks
- [x] Bubble up front end errors such as transaction rejections to back end
- [x] Clean up api responses
- [x] Safely handle when wallet doesn't have the requested chain
- [x] Detect chain from transaction and remove top level chain property
- [ ] Return connected address somewhere
- [ ] Add Custom Chain Support
- [ ] Add Readme instructions for api use
- [ ] Add "Ready to sign" button so that users can change their wallet before being flooded with requests

## How to use

SafeSigner supports signing arbitrary messages, typed messages (EIP712) and broadcasting transactions.
Under the hood we are using the [Viem](https://viem.sh/) methods `SignMessage`, `SignTypedData` and `PrepareTransactionRequest`.
Our `SafeSignerRequest` type is just a wrapper over the parameter types for each of these methods.

You can import the SafeSigner class and use it like so:
```typescript
// Start the service
const signer = new SafeSigner();
await signer.start();

const request: SafeSignerRequest = {
    message: 'Hello, world!'
};

// Send a message to be signed by the user
const signedMessage = await signer.sendRequest(request);
```
The user is then prompted to sign in their browser and it returns the signed message.

You can also interact with SafeSigner through an API:
```bash
    tsx ./start.ts # This starts the server so that requests can be received
    curl -X POST \
        -H 'Content-Type: application/json' \
        -d '{"message": "Hello, world!"}' \
        http://localhost:3000/api/submit-request

```

## Limitations
Because you have to sign each request manually from your wallet this method is not practical for signing dozens of transactions in one sitting unless you have great patience. 🧘