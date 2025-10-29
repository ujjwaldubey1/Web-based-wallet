import React, { useState } from 'react'
import { ethers } from 'ethers'
import { generateMnemonic } from 'bip39';
import { Buffer } from 'buffer';


const App = () => {
  // const [publicKey , setPublicKey] = useState('');
  // const [privateKey , setPrivateKey] = useState('');
  // const [mnemonics, setMnemonics] = useState('');
  //  const handleGenratePublickPrivateKey = () =>{
  //       const newWallet = ethers.Wallet.createRandom();

  //       setPublicKey(newWallet.publicKey);
  //       setPrivateKey(newWallet.privateKey);
  //       setMnemonics(newWallet.mnemonic.phrase);
  //  }

  //  const handleMnemonics = () =>{
  //     const mnemonics = generateMnemonic();
  //     setMnemonics(mnemonics);
  //  }
  const [wallets , setWallets] = useState([]);
  const handlehandleGenrateWallet = () => {
      const newWallets = ethers.Wallet.createRandom();

      const newWalletData = {
        publiKey : newWallets.publicKey,
        privateKey : newWallets.privateKey,
        mnemonics : newWallets.mnemonic.phrase
      }
      setWallets([...wallets,newWalletData]);
  }
  return (
    <div>
      {/* <button className='bg-green-700 rounded-md' onClick={handleGenratePublickPrivateKey}>Create Wallet </button>
{/* 
    <button className='bg-red-500 rounded-b-lg' onClick={handleMnemonics}>Generate Mnemonics</button> */}
      {/* /* <div>
        <p > Public key : {publicKey}</p>
        <p>Private key : {privateKey}</p>
        <p>Mnemonics : {mnemonics}</p>
      </div> */ }
      <button className='bg-green-400 rounded-sm' onClick={handlehandleGenrateWallet}>GenrateWallet</button>

      <div>
        {wallets.map((wallets , index)=>(
         <div key={index} >
           <h3>Wallet {index +1}</h3>
          <p>public key : {wallets.publiKey}</p>
          <p>private key : {wallets.privateKey}</p>
          <p>Mnemonics :  {wallets.mnemonics}</p>
         </div>
        ))}
      </div>

    </div>
  )
}

export default App
