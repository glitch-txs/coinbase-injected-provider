declare global{
  interface Window {
    ethereum?: any
    coinbaseWalletExtension?: any
  }
}

export const checkCoinbase = ()=>{
  if(typeof window != 'undefined'){
    let provider;
    if (window.coinbaseWalletExtension){
      provider = window.coinbaseWalletExtension
    } else if (window.ethereum.providers?.length) {
      // edge case if MM and CBW are both installed
      window.ethereum.providers.forEach(async (p: any) => {
        if (p.isCoinbaseWallet) provider = p;
      });
    } else if (window.ethereum?.isCoinbaseWallet){
      provider = window.ethereum;
    }
    return provider
  }else{
    console.log('Onboarding to install Coinbase')
    return false
  }
}