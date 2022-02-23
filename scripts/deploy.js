const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const Market = await hre.ethers.getContractFactory("Market");
    const market = await Market.deploy();
    await market.deployed();
    console.log("Market deployed to:", market.address);

    const Property = await hre.ethers.getContractFactory("Property");
    const property = await Property.deploy(market.address);
    await property.deployed();
    console.log("Property deployed to:", property.address);

    let config = `
        export const propertymarketaddress = "${market.address}";
        export const propertyaddress = "${property.address}";
    `;

    let data = JSON.stringify(config)
    fs.writeFileSync("config.js", JSON.parse(data))
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});


// >npx hardhat run scripts/deploy.js --network testnet
