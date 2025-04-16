const hre = require("hardhat");

async function main() {
  // Make sure this matches EXACTLY with your contract name in POAPKU.sol
  const POAPKU = await hre.ethers.getContractFactory("POAPKU");
  const poap = await POAPKU.deploy();
  
  await poap.waitForDeployment();

  console.log("POAPKU deployed to:", await poap.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});