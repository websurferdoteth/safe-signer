# SafeSigner
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
- [x] Add Custom Chain Support
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
const { data: signedMessage, error } = await signer.signRequest(request);
```

### Options Parameter

The `signRequest` method accepts an optional second parameter `options`:

- **`address`**: If specified, SafeSigner will enforce that the user connects with this exact wallet address before allowing them to sign.

```typescript
const { data: signedMessage, error } = await signer.signRequest(request, {
    address: '0x1234567890123456789012345678901234567890'
});
```

### API Use

You can also interact with SafeSigner through an API:
```bash
    npx tsx ./start.ts # This starts the server so that requests can be received
    
    # Basic request
    curl -X POST \
        -H 'Content-Type: application/json' \
        -d '{"request": {"message": "Hello, world!"}}' \
        http://localhost:3000/api/submit-request

    # Request with address enforcement
    curl -X POST \
        -H 'Content-Type: application/json' \
        -d '{"request": {"message": "Hello, world!"}, "options": {"address": "0x1234567890123456789012345678901234567890"}}' \
        http://localhost:3000/api/submit-request
```

## Running the Example

The repository includes an `example.ts` file that demonstrates how to use SafeSigner. Here's how to run it:

### Running with tsx

There are a few options for running the example:

#### Option 1: Using npx (Recommended)
```bash
npx tsx example.ts
```

#### Option 2: Install tsx globally
1. **Install tsx globally** (if not already installed):
   ```bash
   npm install -g tsx
   ```

2. **Run the example**:
   ```bash
   tsx example.ts
   ```

### What happens
   - The SafeSigner service starts and opens a web interface in your browser
   - A few different types of signature requests are sent to the web interface
   - You'll see multiple signing requests in your wallet
   - After signing, the returned signatures or transaction hashes are logged to the console

### Example Output
```
Ready on http://localhost:3000
SafeSigner started
Asking for signature on message
Client connected
 ○ Compiling / ...
 ✓ Compiled / in 1214ms (1969 modules)
 GET / 200 in 2237ms
Client connected
Client is ready
SafeSigner: Client is ready
Message signature: {
  data: '0x6a63a187cc2511029b4ef4a73c0d5fba53ed6fc57976c0d472b1b4634eade9ae681d59362382e484189e9660f972056c49633236deeaa546ebd611e66b77dea61c'
}
Asking for signature on EIP712 Typed Data Message
Typed message signature: {
  data: '0xdd04019990bb8f84b47f9e166277a65114724a9b96f72c6fa7c09cf180431e731ed9754134badd4d9c3cc60dc8b4523e9c6143e3871d6d0387e860b58afa95f11b'
}
....
```

### Customizing the Example

You can modify `example.ts` to test different types of requests:

- **Message signing**: Change the `request` object to use `message` instead of transaction parameters
- **Typed data signing**: Use `types` and `domain` for EIP-712 signing
- **Transaction signing and broadcasting**: Provide transaction parameters (like `to`, `value`, `chain`, etc.) to sign and send a transaction; the returned value will be the transaction hash.
- **Different networks**: Modify the `chain` parameter to use other networks


## Limitations
Because you have to sign each request manually from your wallet this method is not practical for signing dozens of transactions in one sitting unless you have great patience. 🧘
