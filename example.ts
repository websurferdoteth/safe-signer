import SafeSigner from './src/index';
const messageRequest = {
  message: 'Hello, world!'
};

async function main() {
  const signer = new SafeSigner();
  
  await signer.start();
  console.log("SafeSigner started");
  try {
    console.log("Asking for signature on message from specific address");
    const messageResponse = await signer.sendRequest(messageRequest);
    console.log('Message signature:', messageResponse);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    signer.stop();
  }
}

main();