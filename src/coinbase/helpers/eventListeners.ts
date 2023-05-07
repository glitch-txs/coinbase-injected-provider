type ConnectInfo = {
  chainId: string
}

const handleAccount = (accounts: string[]) => {
  console.log('Coinbase: user changed address to: ', accounts[0])
}

const handleChain = (chainId: string) => {
  console.log('Coinbase: chain id - ', chainId)
}

const handleConnect = (connectInfo: ConnectInfo)=>{
  console.log('Coinbase: provider is connected in:', connectInfo.chainId)
}

const handleDisconnect = (err: any)=>{
  console.log('Coinbase: the provider is desconnected from blockchain, refresh the dapp and check your internet connection')
  console.error(err)
}

//Init Coinbase API event listeners
export const eventListeners = (provider: any)=>{
  provider.on("accountsChanged", handleAccount);
  provider.on("chainChanged", handleChain);
  provider.on('connect', handleConnect);
  provider.on('disconnect', handleDisconnect);
}

export const removeEventsCoinbase = (provider: any)=>{
  provider.removeListener("accountsChanged", handleAccount);
  provider.removeListener("chainChanged", handleChain);
  provider.removeListener('connect', handleConnect);
  provider.removeListener('disconnect', handleDisconnect);
}