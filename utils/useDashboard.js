import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import axios from 'axios';

import { propertyaddress, propertymarketaddress } from '../config';

import Property from '../artifacts/contracts/Property.sol/Property.json';
import Market from '../artifacts/contracts/Market.sol/Market.json';

const fetchProperties = async () => {
    const web3Modal = new Web3Modal(); // new Web3Modal({ network: "mainnet", cacheProvider: true });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(propertymarketaddress, Market.abi, signer);
    const tokenContract = new ethers.Contract(propertyaddress, Property.abi, provider);
    const data = await marketContract.fetchItemsCreated();

    const items = await Promise.all(data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            sold: i.sold,
            image: meta.data.image,
            image: meta.data.image,
            title: meta.data.title,
            description: meta.data.description
        }
        return item;
    }));
    return items;
};

const buyProperty = async (property) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(propertymarketaddress, Market.abi, signer);
    const price = ethers.utils.parseUnits(property.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(propertyaddress, property.itemId, {
      value: price
    });
    await transaction.wait();
    return true;
};

module.exports = { fetchProperties, buyProperty };