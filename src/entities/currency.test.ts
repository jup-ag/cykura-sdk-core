import { web3 } from '@project-serum/anchor'
import { Solana, Token } from './index'

describe('Currency', () => {
  const ADDRESS_ZERO = new web3.PublicKey(0)
  const ADDRESS_ONE = new web3.PublicKey(1)

  const t0 = new Token(1, ADDRESS_ZERO, 18)
  const t1 = new Token(1, ADDRESS_ONE, 18)

  describe('#equals', () => {
    it('Solana on same chains is Solana', () => {
      expect(Solana.onChain(1).equals(Solana.onChain(1)))
    })
    it('Solana is not token0', () => {
      expect(Solana.onChain(1).equals(t0)).toStrictEqual(false)
    })
    it('token1 is not token0', () => {
      expect(t1.equals(t0)).toStrictEqual(false)
    })
    it('token0 is token0', () => {
      expect(t0.equals(t0)).toStrictEqual(true)
    })
    it('token0 is equal to another token0', () => {
      expect(t0.equals(new Token(1, ADDRESS_ZERO, 18, 'symbol', 'name'))).toStrictEqual(true)
    })
  })
})
