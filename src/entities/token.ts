import invariant from 'tiny-invariant'
import { validateAndParseAddress } from '../utils/validateAndParseAddress'
import { BaseCurrency } from './baseCurrency'
import { Currency } from './currency'
import bs58 from 'bs58'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends BaseCurrency {
  public readonly isNative: false = false
  public readonly isToken: true = true

  /**
   * The contract address on the chain on which this token lives
   */
  public readonly address: string

  public constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string) {
    super(chainId, decimals, symbol, name)
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return other.isToken && this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    // console.log('HELLO FROM SORRS BEFOER')
    const bytes0 = Buffer.from(this.address.toString())
    const address0 = bs58.encode(bytes0)
    // console.log(address0)
    const bytes1 = Buffer.from(other.address.toString())
    const address1 = bs58.encode(bytes1)
    // console.log(address1)
    // return this.address.toString() < other.address.toString()
    return address0.toLowerCase() < address1.toLowerCase()
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): Token {
    return this
  }
}
