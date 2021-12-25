import { Token } from './token'

/**
 * Known WSOL implementation addresses, used in our implementation of Solana#wrapped
 */
export const WSOL: { [chainId: number]: Token } = {
  // Mainnet
  [101]: new Token(101, 'So11111111111111111111111111111111111111112', 9, 'SOL', 'Wrapped SOL'),
  // Testnet
  [102]: new Token(102, 'So11111111111111111111111111111111111111112', 9, 'wSOL', 'Wrapped SOL'),
  // Devnet
  [103]: new Token(103, 'So11111111111111111111111111111111111111112', 9, 'SOL', 'Wrapped SOL')
}
