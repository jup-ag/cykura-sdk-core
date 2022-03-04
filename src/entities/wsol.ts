import { web3 } from '@project-serum/anchor'
import { Token } from './token'

export const WSOL = new Token(101, new web3.PublicKey('So11111111111111111111111111111111111111112'), 9, 'wSOL', 'Wrapped SOL')

/**
 * Known WSOL implementation addresses, used in our implementation of Solana#wrapped
 */
// export const WSOL: { [chainId: number]: Token } = {
//   // Mainnet
//   [101]: wSolToken,
//   // Testnet
//   [102]: wSolToken,
//   // Devnet
//   [103]: wSolToken,
// }
