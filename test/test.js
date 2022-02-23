describe("Market", function() {
    it("Should create and execute market sales", async function() {
        const Market = await ethers.getContractFactory("Market");
        const market = await Market.deploy();
        await market.deployed();
        const marketAddress = market.address;

        const Property = await ethers.getContractFactory("Property");
        const property = await Property.deploy(marketAddress);
        await property.deployed();
        const propertyContractAddress = property.address;

        let listingPrice = await market.getListingPrice();
        listingPrice = listingPrice.toString();

        const auctionPrice = ethers.utils.parseUnits('1', 'ether');

        await property.createToken("https://github.com/herikaniugu/blockbox");
        await property.createToken("https://blockbox-demo.herokuapp.com");

        await market.createMarketItem(propertyContractAddress, 1, auctionPrice, { value: listingPrice });
        await market.createMarketItem(propertyContractAddress, 2, auctionPrice, { value: listingPrice });

        const [_, buyerAddress] = await ethers.getSigners();

        await market.connect(buyerAddress).createMarketSale(propertyContractAddress, 1, { value: auctionPrice});

        let items = await market.fetchMarketItems();
        items = await Promise.all(items.map(async (index) => {
            const tokenUri = await property.tokenURI(index.tokenId);
            let item = {
                price: index.price.toString(),
                tokenId: index.tokenId.toString(),
                seller: index.seller,
                owner: index.owner,
                tokenUri
            };
            return item;
        }));
        console.log("items: ", items);
    });
});