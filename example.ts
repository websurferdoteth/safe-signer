import SafeSigner, { SafeSignerRequest } from './src/index';
const messageRequest = {
  type: 'message',
  data: {
    message: 'Hello, world!'
  },
};


const EIP712FormattedMessage = {
  domain: {
    name: "EIP-712 Message",
    version: "1",
  },
  types: {
    Person: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "wallet",
        type: "address",
      },
    ],
    Mail: [
      {
        name: "from",
        type: "Person",
      },
      {
        name: "to",
        type: "Person",
      },
      {
        name: "contents",
        type: "string",
      },
    ],
  },
  primaryType: "Mail",
  message: {
    from: {
      name: "Alice",
      wallet: "0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  },
}

const signTypedDataRequest = {
  chain: 'mainnet',
  type: 'EIP712Message',
  data: EIP712FormattedMessage,
};

const transactionRequest = {
  type: 'transaction',
  data: {
    to: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    value: 0,
    chain: 31337
  },
};

async function main() {
  const signer = new SafeSigner();
  
  await signer.start();
  console.log("SafeSigner started");
  try {
    console.log("Asking for signature on message");
    const response = await signer.sendRequest(messageRequest as SafeSignerRequest);
    console.log('User signed response:', response);
    console.log("Asking for signature on EIP712 Typed Data Message");
    const responseAgain = await signer.sendRequest(signTypedDataRequest as unknown as SafeSignerRequest);
    console.log('User signed response:', responseAgain);
    const responseAgainAgain = await signer.sendRequest(transactionRequest as unknown as SafeSignerRequest);
    console.log('User signed response:', responseAgainAgain);
    transactionRequest.data.chain = 111555111;
    const responseAgainAgainAgain = await signer.sendRequest(transactionRequest as unknown as SafeSignerRequest);
    console.log('User signed response:', responseAgainAgainAgain);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    signer.stop();
  }
}

// create promise that waits a few seconds
function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

main();