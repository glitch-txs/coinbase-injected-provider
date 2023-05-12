import React from 'react'

type Props = {}

// TypeScript
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

const APP_NAME = 'My Awesome App'
const APP_LOGO_URL = 'https://example.com/logo.png'
const DEFAULT_ETH_JSONRPC_URL = `https://eth.llamarpc.com`
const DEFAULT_CHAIN_ID = 1

// Initialize Coinbase Wallet SDK
export const coinbaseWallet = typeof window != 'undefined' ? new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
}) : {makeWeb3Provider: ()=> ({request: ()=>{}, on:()=>{}})}

// Initialize a Web3 Provider object
export const ethereum = coinbaseWallet.makeWeb3Provider?.(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

ethereum?.on?.('accountsChanged', console.log)

const handleAccount = async()=>{
  const accounts = await ethereum.request({method:'eth_requestAccounts'})
  console.log(accounts)
}

const sdk = (props: Props) => {


  return (
    <div>sdk
      <button onClick={handleAccount} >Connect</button>
    </div>
  )
}

export default sdk