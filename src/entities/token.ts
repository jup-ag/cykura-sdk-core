import invariant from 'tiny-invariant'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { BaseCurrency } from './baseCurrency'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends BaseCurrency {
  public readonly isNative: false = false
  public readonly isToken: true = true

  /**
   * The contract address on the chain on which this token lives
   */
  public readonly address: web3.PublicKey

  public constructor(chainId: number, address: web3.PublicKey, decimals: number, symbol?: string, name?: string) {
    super(chainId, decimals, symbol, name)
    this.address = address
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return other.isToken && this.chainId === other.chainId && this.address.equals(other.address)
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

    const thisKeyAsNumber = new anchor.BN(this.address.toBuffer())
    const otherKeyAsNumber = new anchor.BN(other.address.toBuffer())

    return thisKeyAsNumber.lt(otherKeyAsNumber)
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): Token {
    return this
  }
}
