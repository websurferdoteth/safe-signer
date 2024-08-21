import SafeSigner, { SafeSignerRequest } from './src/index';

const request = {
  type: 'message',
  data: {
    message: 'Hello, world!'
  },
  chain: 'mainnet'
};

async function main() {
  const signer = new SafeSigner();
  
  await signer.start();
  console.log("signer server started");
  try {
    console.log("Asking for signature");
    const response = await signer.sendRequest(request as SafeSignerRequest);
    console.log('User signed response:', response);
    console.log("Asking for signature");
    request.chain = 'sepolia';
    const responseAgain = await signer.sendRequest(request as SafeSignerRequest);
    console.log('User signed response:', responseAgain);
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