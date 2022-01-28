import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from "./idl.json";
import kp from "./keypair.json";

const { solana } = window;
const { SystemProgram } = web3;

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);

export const baseAccount = web3.Keypair.fromSecretKey(secret);
export const programID = new PublicKey(idl.metadata.address);

const network = clusterApiUrl('devnet');
const opts = {
  // prefer: finalized
  preflightCommitment: "processed"
};

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

export async function createGifAccount(){
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount]
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log(account)
    return account.gifs
    
  } catch(err){
    console.log("Error creating BaseAccount account: => ", err)
    return null;
  }
}

export function getProvider(){
  const conn = new Connection(network, opts.preflightCommitment)
  const provider = new Provider(
    conn, window.solana, opts.preflightCommitment
  );

  return provider
}
