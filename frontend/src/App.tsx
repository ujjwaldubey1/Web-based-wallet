import React, { useState } from 'react'
import { ethers } from 'ethers'
import { generateMnemonic } from 'bip39';


const App = () => {
  const [publicKey , setPublicKey] = useState('');
  const [privateKey , setPrivateKey] = useState('');
  const [mnemonics, setMnemonics] = useState('');
   const handleGenratePublickPrivateKey = () =>{
        const newWallet = ethers.Wallet.createRandom();

        setPublicKey(newWallet.publicKey);
        setPrivateKey(newWallet.privateKey);
        

   }

   const handleMnemonics = () =>{

   }

  return (
    <div>
      <button className='bg-green-700 rounded-md' onClick={handleGenratePublickPrivateKey}>Create Wallet </button>

      <div>
        <p > Public key : {publicKey}</p>
        <p>Private key : {privateKey}</p>
      </div>

    </div>
  )
}

export default App
