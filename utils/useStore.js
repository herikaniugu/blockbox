import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import Web3Modal from 'web3modal';
import axios from 'axios';

import { propertyaddress, propertymarketaddress } from '../config';

import Property from '../artifacts/contracts/Property.sol/Property.json';
import Market from '../artifacts/contracts/Market.sol/Market.json';

let rpcEndpoint = null;
if (process.env.NEXT_PUBLIC_WORKSPACE_URL) rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;

const fetchProperties = async () => {
    console.log(0, rpcEndpoint);
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
    const tokenContract = new ethers.Contract(propertyaddress, Property.abi, provider);
    const marketContract = new ethers.Contract(propertymarketaddress, Market.abi, provider);
    const data = await marketContract.fetchMyProperties();

    const items = await Promise.all(data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            itemId: i.itemId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            title: meta.data.title,
            description: meta.data.description,
        }
        return item;
    }));
    return items;
};

module.exports = { fetchProperties };
