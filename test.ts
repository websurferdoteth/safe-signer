import SafeSigner, { SafeSignerRequest } from './src/index';

const request = {
  network: 'mainnet',
  type: 'message',
  data: {
    message: 'Hello, world!'
  }
};

async function main() {
  const signer = new SafeSigner();
  
  await signer.start();
  console.log("signer server started");
  try {
    console.log("asking question");
    const response = await signer.sendRequest(request as SafeSignerRequest);
    console.log('User signed response:', response);
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