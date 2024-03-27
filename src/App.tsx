import { useState } from 'react'
import Web3 from 'web3'
import { ConnectedView } from './views/connectedView'
import { DisconnectedView } from './views/disconnectedView'

function App() {
  const [isConnect, setIsConnected] = useState(false)
  const [ethBalance, setEthBalance] = useState("")
  const [loading, setLoading] = useState(false)
  

  const detectCurrentProvider = () => {
    let provider
    if (window.ethereum) {
      provider = window.ethereum
    } else if (window.web3) {
      provider = window.web3.currentProvider
    } else {
      console.log("metamask needed")
    }

    return provider
  }

  const connectMetamask = async () => {
    try {
      setLoading(true)
      const currentProvider = detectCurrentProvider()
      if(currentProvider) {
        await currentProvider.request({method: "eth_requestAccounts"})
        const web3 = new Web3(currentProvider)
        const userAccount = await web3.eth.getAccounts()
        const account = userAccount[0]
        let ethBalance = await web3.eth.getBalance(account)
        setEthBalance(ethBalance.toString())
        setIsConnected(true)
        setLoading(false)
      }
    } catch (error) {
      console.error("Conected metamask error: ", error)
      setLoading(false)
    }
  }

  const disconnectMetamask = () => {
    setIsConnected(false)
  }


  return (
    <main className='font-extralight p-5 bg-gray-600 min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden'>
      {
        isConnect ? 
          <ConnectedView disconectMeta={disconnectMetamask} ethBalance={ethBalance}/> : 
          <DisconnectedView connectMeta={connectMetamask} loading={loading} />
      }
    </main>
  )
}

export default App
