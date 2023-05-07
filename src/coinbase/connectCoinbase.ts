import { checkCoinbase } from "./helpers/checkCoinbase"

export const connectToCoinbase = async ()=>{

  const provider = checkCoinbase()

  if(Boolean(provider)){

    await provider.request({ method: 'eth_requestAccounts' })
    .then(async()=> {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }],
      }).catch(async (er: any)=>{
        if(er.code === 4902 || er?.data?.originalError?.code == 4902){
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x38',
                  chainName: 'Smart Chain',
                  nativeCurrency: {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18,
                  },
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  blockExplorerUrls: ['https://bscscan.com'],
                  iconUrls: [''], // Currently ignored by Coinbase?.
                },
              ],
            })
            .catch((er: any)=>{
              console.error("Coinbase: user rejected the add new chain request", er)
            })
        }
      })
    })
    .catch((err: any) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Coinbase: user rejected the connection request');
      } else {
        console.error('Coinbase: request connection error',err);
      }
    });
  }

  return provider
}