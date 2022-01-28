const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

/*
describe('gif-portal', () => {
  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.GifPortal;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});
*/

/* 
Anchor abstracts away:
- JSON RPC wrapper call to a solana cluster(local)
- interfacing with solana/web3 api
- interfacing with solana
 */

async function main() {
  console.log("starting...")

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.GifPortal;
  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount]
  });

  console.log("tx signature =>", tx)

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("Gif count", account.totalGifs.toString())

  await program.rpc.addGif({
    accounts: {
      baseAccount: baseAccount.publicKey
    }
  })

  account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log("gif state change", account.totalGifs.toString())
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
