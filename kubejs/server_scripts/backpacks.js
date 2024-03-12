ServerEvents.recipes((event) => {
    // Backpacks
    // First upgrade when you get plates
    backpack(
        "sophisticatedbackpacks:iron_backpack",
        "sophisticatedbackpacks:backpack",
        "#forge:plates/iron",
    );
    // Second upgrade when you get molten metals.
    backpack(
        "sophisticatedbackpacks:gold_backpack",
        "sophisticatedbackpacks:iron_backpack",
        "#forge:ingots/rose_gold",
    );
    // Third upgrade when you get alloying/brass
    backpack(
        "sophisticatedbackpacks:diamond_backpack",
        "sophisticatedbackpacks:gold_backpack",
        "#forge:plates/brass",
    );

    function backpack(outputBackpack, inputBackpack, inputItem) {
        event
            .shaped(outputBackpack, ["III", "IBI", "III"], {
                I: inputItem,
                B: inputBackpack,
            })
            .modifyResult((inventory, itemstack) => {
                let item = inventory.find(Item.of(inputBackpack));
                if (item.getNbt() === null) {
                    return itemstack;
                }
                let nbt = { contentsUuid: item.getNbt().contentsUuid };
                return itemstack.withNBT(nbt);
            });
    }
});
