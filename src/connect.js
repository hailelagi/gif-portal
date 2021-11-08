const { solana } = window;

export async function checkIfWalletIsConnected() {
  try {
    if (solana.isPhantom) {
      console.log('Phantom wallet found!');
    }
    else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  } catch (error) {
    console.error(error);
  }
};
