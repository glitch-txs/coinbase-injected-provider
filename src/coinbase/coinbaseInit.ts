import { checkAccountAndChainId } from "./helpers/checkAccountAndChain"
import { checkCoinbase } from "./helpers/checkCoinbase"
import { eventListeners, removeEventsCoinbase } from "./helpers/eventListeners"

export const coinbaseInit = ()=>{
  const provider = checkCoinbase()
  if (Boolean(provider)){        
    eventListeners(provider)
    checkAccountAndChainId(provider)
  }

  return ()=> removeEventsCoinbase(provider)
}