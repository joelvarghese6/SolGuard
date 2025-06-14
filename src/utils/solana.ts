import { PublicKey } from "@solana/web3.js";

const isSolanaAddress = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};

export { isSolanaAddress };
