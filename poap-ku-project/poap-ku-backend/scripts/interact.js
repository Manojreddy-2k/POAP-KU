
const hre = require("hardhat");

async function main() {
  // Replace with your actual contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // Get the contract instance
  const POAPKU = await hre.ethers.getContractAt("POAPKU", contractAddress);
  
  // Example: Call a read-only function (if available)
  const name = await POAPKU.name();
  console.log("Contract name:", name);

  // Example: Mint a POAP (if your contract has a mint function)
  const recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Default Hardhat account
  const tokenURI = "https://example.com/poap-metadata/1.json";
  
  const tx = await POAPKU.mint(recipient, tokenURI);
  await tx.wait();
  console.log("Minted POAP to:", recipient);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});