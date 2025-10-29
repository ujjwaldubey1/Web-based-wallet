import React, { useState } from 'react';
import { ethers } from 'ethers';
// No 'bip39' or 'buffer' needed

const App = () => {
  const [wallets, setWallets] = useState([]);

  // (Fixed typo: handlehandleGenrateWallet -> handleGenerateWallet)
  const handleGenerateWallet = () => {
    const newWallet = ethers.Wallet.createRandom();

    const newWalletData = {
      // (Fixed typo: publiKey -> publicKey)
      publicKey: newWallet.publicKey,
      privateKey: newWallet.privateKey,
      // (Fixed typo: mnemonics -> mnemonic)
      mnemonic: newWallet.mnemonic.phrase,
    };
    setWallets([...wallets, newWalletData]);
  };

  return (
    // 1. Overall Page Container (Dark mode, full height, padding)
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* 2. Main content wrapper (centered, max-width) */}
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-white">
            React Wallet Generator
          </h1>
          {/* 3. Main Button (Modern styling) */}
          <button
            onClick={handleGenerateWallet}
            className="
              px-8 py-3 bg-indigo-600 text-white font-semibold 
              rounded-lg shadow-lg hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
              transition duration-300 ease-in-out transform hover:-translate-y-1
            "
          >
            Generate New Wallet
          </button>
        </div>

        {/* --- Wallet List Grid --- */}
        {/* 4. Responsive grid for the wallet cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 5. Map and create a "card" for each wallet */}
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className="
                bg-gray-800 rounded-xl shadow-2xl p-6
                border border-gray-700
                transition duration-300 hover:border-indigo-500
              "
            >
              {/* Card Header */}
              <h3 className="text-2xl font-bold text-indigo-400 mb-4">
                Wallet {index + 1}
              </h3>

              {/* Card Content */}
              <div className="space-y-3">
                
                {/* Public Key */}
                <div>
                  <label className="text-sm font-medium text-gray-400">
                    Public Key
                  </label>
                  <p className="font-mono text-sm text-gray-100 break-all">
                    {wallet.publicKey}
                  </p>
                </div>

                {/* Private Key (with security warning) */}
                <div>
                  <label className="text-sm font-medium text-yellow-400">
                    Private Key (Secret!)
                  </label>
                  <p className="font-mono text-sm text-yellow-500 break-all">
                    {wallet.privateKey}
                  </p>
                </div>

                {/* Mnemonic (with security warning) */}
                <div>
                  <label className="text-sm font-medium text-red-400">
                    Mnemonic (Secret!)
                  </label>
                  <p className="font-mono text-sm text-red-500 break-all">
                    {wallet.mnemonic}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6. A small helper note if no wallets exist yet */}
        {wallets.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p>Click the button to generate your first wallet.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;