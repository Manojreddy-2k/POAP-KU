import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [tokenURI, setTokenURI] = useState('');

  // Contract ABI and Address (replace with yours)
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const contractABI = [
    {
      "inputs": [
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "string", "name": "tokenURI", "type": "string" }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "tokenURI", "type": "string" }
      ],
      "name": "publicMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "name": "hasMinted",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setAccount(address);
        setIsConnected(true);
        
        // Initialize contract
        const poapContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(poapContract);
        
      } catch (error) {
        console.error("Error connecting:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Mint POAP function
  const mintPOAP = async () => {
    if (!contract) return;
    
    try {
      const tx = await contract.mint(account, tokenURI);
      await tx.wait();
      alert("POAP minted successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed. See console for details.");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🎓 POAP-KU Minting Portal</h1>
  
        {!isConnected ? (
          <button className="btn connect" onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <>
            <p className="status">🔗 Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
  
            <div className="mint-box">
              <h2>Mint Your POAP</h2>
              <input
                type="text"
                className="input"
                placeholder="Enter token URI (e.g., https://.../badge.json)"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
              />
              <button className="btn mint" onClick={mintPOAP}>Mint POAP</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
}

export default App;