const anchor = require('@project-serum/anchor');


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

async function main() {
  console.log("starting...")

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.GifPortal;
  const tx = await program.rpc.initialize();

  console.log("tx signature =>", tx)
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
