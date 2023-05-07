export const checkAccountAndChainId = async(provider: any)=>{
  await provider.request({ method: 'eth_accounts' })
  .then(async (accounts: string[])=>{
    console.log('Metamask: user is connected as: ', accounts[0])
    //if there's an account then the user is connected to a specific chain
    await provider.request({ method: 'eth_chainId' }).then((chainId: any)=> {
    console.log('Metamask: chain id - ', chainId)
    }).catch((e: any) => console.error(e))
  }).catch((e: any) => console.error(e))
}