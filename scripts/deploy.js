const hre = require("hardhat");
const fs = require('fs');

async function main() {
  [signer1, signer2] = await ethers.getSigners();

  const Wallet = await ethers.getContractFactory("Wallet", signer1);
  const walletContract = await Wallet.deploy();

  const Dex = await ethers.getContractFactory("Dex", signer1);
  const dexContract = await Dex.deploy();

  const Dai = await ethers.getContractFactory("Dai", signer2);
  const dai = await Dai.deploy();

  await walletContract.addToken(
    ethers.utils.formatBytes32String('Dai'),
    dai.address
  );
  
  await walletContract.addToken(
    ethers.utils.formatBytes32String('Eth'),
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  );

  fs.writeFileSync('./config.js', `
  export const walletContractAddress = "${walletContract.address}"
  export const daiAddress = "${dai.address}"  
  export const dexContractAddress = "${dexContract.address}"
  `)

  console.log("Wallet deployed to:", walletContract.address, "by", signer1.address);
  console.log("Dai deployed to:", dai.address, "by", signer2.address);
  console.log("Dex deployed to:", dexContract.address, "by", signer1.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });