import invariant from 'tiny-invariant'
import { Currency } from './currency'
import { NativeCurrency } from './nativeCurrency'
import { Token } from './token'
import { WSOL } from './wsol'

/**
 * Solana is the main usage of a 'native' currency, i.e. for Solana mainnet, testnet and devnet
 */
export class Solana extends NativeCurrency {
  protected constructor(chainId: number) {
    const wsol = WSOL[chainId]
    super(chainId, wsol.decimals, wsol.symbol, wsol.name)
  }

  public get wrapped(): Token {
    const wsol = WSOL[this.chainId]
    invariant(!!wsol, 'WRAPPED')
    return wsol
  }

  private static _solanaCache: { [chainId: number]: Solana } = {}

  public static onChain(chainId: number): Solana {
    return this._solanaCache[chainId] ?? (this._solanaCache[chainId] = new Solana(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
