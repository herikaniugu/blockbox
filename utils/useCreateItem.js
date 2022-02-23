import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import Web3Modal from 'web3modal';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import { propertyaddress, propertymarketaddress } from '../config';

import Property from '../artifacts/contracts/Property.sol/Property.json';
import Market from '../artifacts/contracts/Market.sol/Market.json';

const onAttachement = async (event) => {
    const file = event.target.files[0];
    try {
        const added = await client.add(file, { progress: (prog) => console.log(`received: ${prog}`) });
        return `https://ipfs.infura.io/ipfs/${added.path}`;
    } catch (error) {
        console.log('Error uploading file: ', error);
    }
};

const createMarket = async (input, image) => {
    const { title, description, price } = input;
    if (!title || !description || !price || !image) return;
    // Upload to IPFS
    const data = JSON.stringify({ title, description, image: image });
    try {
        const added = await client.add(data);
        return createSale(input, `https://ipfs.infura.io/ipfs/${added.path}`);
    } catch (error) {
        console.log('Error uploading file: ', error);
    }
};

const createSale = async (input, url) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection); 
    const signer = provider.getSigner();

    // Create the item
    let contract = new ethers.Contract(propertyaddress, Property.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(input.price, 'ether');

    // List the item for sale on the marketplace
    contract = new ethers.Contract(propertymarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(propertyaddress, tokenId, price, { value: listingPrice });
    await transaction.wait();
};

module.exports = { createSale, createMarket, onAttachement };