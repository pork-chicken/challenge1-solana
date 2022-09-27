// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const publicKey = process.argv[2];
const amount = process.argv[3];
console.log("publicKey", publicKey);
console.log("amount", amount);

if (!publicKey || !amount) {
    console.log("Usage: node index.js PUBLICKEY AMOUNT");
    return;
}

const airDropSol = async (publicKey, amount) => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            amount * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const mainFunction = async () => {
    console.log("Start airdrop");
    await airDropSol(publicKey, amount);
    const url = "https://solscan.io/account/" + publicKey + "?cluster=devnet";
    console.log("Finish airdrop, check the solscan", url);
};

mainFunction();
