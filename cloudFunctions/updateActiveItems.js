Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed");
    const logger = Moralis.Cloud.getLogger();
    logger.info("Looking for confirmed Tx...");
    if (confirmed) {
        logger.info("Found Item!");

        const ActiveItem = Moralis.Object.extend("ActiveItem");

        const query = new Moralis.Query(ActiveItem);
        query.equalTo("marketplaceAddress", request.object.get("address"));
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        query.equalTo("seller", request.object.get("seller"));
        const alreadyListedItem = await query.first();
        if (alreadyListedItem) {
            logger.info(`Deleting already listed ${alreadyListedItem.id}`);
            await alreadyListedItem.destroy();
            logger.info(
                `Deleting item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("nftAddress")} since it's already been listed`
            );
        }

        const activeItem = new ActiveItem();

        activeItem.set("marketplaceAddress", request.object.get("address"));
        activeItem.set("nftAddress", request.object.get("nftAddress"));
        activeItem.set("price", request.object.get("price"));
        activeItem.set("tokenId", request.object.get("tokenId"));
        activeItem.set("seller", request.object.get("seller"));

        logger.info(
            `Adding Address: ${request.object.get("address")}. TokenId: ${request.object.get(
                "tokenId"
            )}`
        );
        logger.info("Saving...");
        await activeItem.save();
    } else {
        logger.info("Item not found yet");
    }
});

Moralis.Cloud.afterSave("ItemCanceled", async (request) => {
    const confirmed = request.object.get("confirmed");
    const logger = Moralis.Cloud.getLogger();
    logger.info("Looking for confirmed Tx for ItemCanceled...");
    if (confirmed) {
        logger.info("Found Item for ItemCanceled!");

        const ActiveItem = Moralis.Object.extend("ActiveItem");
        const query = new Moralis.Query(ActiveItem);
        query.equalTo("marketplaceAddress", request.object.get("address"));
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        logger.info(`Query: ${query}`);

        const canceledItem = await query.first();
        logger.info(`CanceledItem: ${canceledItem}`);
        if (canceledItem) {
            logger.info(`Deleting ${canceledItem.id}`);
            await canceledItem.destroy();
            logger.info(
                `Deleted tokenId ${request.object.get("tokenId")} at address ${request.object.get(
                    "address"
                )} since it was canceled`
            );
        } else {
            logger.info(
                `No item found with address ${request.object.get(
                    "address"
                )} and tokenId ${request.object.get("tokenId")}`
            );
        }
    } else {
        logger.info("Item not found yet");
    }
});

Moralis.Cloud.afterSave("ItemBought", async (request) => {
    const confirmed = request.object.get("confirmed");
    const logger = Moralis.Cloud.getLogger();
    logger.info("Looking for confirmed Tx for ItemBought...");
    if (confirmed) {
        logger.info("Found Item for ItemBought!");

        const ActiveItem = Moralis.Object.extend("ActiveItem");
        const query = new Moralis.Query(ActiveItem);
        query.equalTo("marketplaceAddress", request.object.get("address"));
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        logger.info(`Query: ${query}`);

        const boughtItem = await query.first();
        logger.info(`BoughtItem: ${boughtItem}`);
        if (boughtItem) {
            logger.info(`Deleting ${boughtItem.id}`);
            await boughtItem.destroy();
            logger.info(
                `Deleted tokenId ${request.object.get("tokenId")} at address ${request.object.get(
                    "address"
                )} since it was bought`
            );
        } else {
            logger.info(
                `No item found with address ${request.object.get(
                    "address"
                )} and tokenId ${request.object.get("tokenId")}`
            );
        }
    } else {
        logger.info("Item not found yet");
    }
});
