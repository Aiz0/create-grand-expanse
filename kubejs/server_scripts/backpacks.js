ServerEvents.recipes((event) => {
    // Backpacks
    event.shaped(
        Item.of("sophisticatedbackpacks:backpack", 1),
        ["ABA", "CDC", "EBE"],
        {
            A: "minecraft:leather",
            B: "farmersdelight:canvas",
            C: "#forge:rope",
            D: "minecraft:barrel",
            E: "minecraft:bundle",
        },
    );

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

    // Upgrades
    const upgrade_base = "sophisticatedbackpacks:upgrade_base";
    event.recipes.shaped(upgrade_base, ["SIS", "ICI", "SIS"], {
        S: "minecraft:string",
        I: "#forge:plates/iron",
        C: "farmersdelight:canvas",
    });

    //Pickup
    event.recipes.shaped(
        "sophisticatedbackpacks:pickup_upgrade",
        [" I ", "FBF", " I "],
        {
            B: upgrade_base,
            F: "create:funnel",
            I: "#forge:plates/iron",
        },
    );
    FillBrass(
        "sophisticatedbackpacks:advanced_pickup_upgrade",
        "sophisticatedbackpacks:pickup_upgrade",
    );
    // Filters
    event.recipes.shapeless("sophisticatedbackpacks:filter_upgrade", [
        upgrade_base,
        "create:filter",
    ]);
    FillBrass(
        "sophisticatedbackpacks:advanced_filter_upgrade",
        "sophisticatedbackpacks:filter_upgrade",
    );
    // Magnet
    event.recipes.shaped(
        "sophisticatedbackpacks:magnet_upgrade",
        ["RCR", "IBI", "RCR"],
        {
            B: "sophisticatedbackpacks:pickup_upgrade",
            C: "minecraft:compass",
            I: "#forge:plates/iron",
            R: "minecraft:redstone",
        },
    );
    FillBrass(
        "sophisticatedbackpacks:advanced_magnet_upgrade",
        "sophisticatedbackpacks:magnet_upgrade",
    );

    event.recipes.shaped(
        "sophisticatedbackpacks:advanced_magnet_upgrade",
        ["RCR", "IBI", "RCR"],
        {
            B: "sophisticatedbackpacks:advanced_pickup_upgrade",
            C: "minecraft:compass",
            I: "#forge:plates/iron",
            R: "minecraft:redstone",
        },
    );

    // Feeding
    // event.recipes.shaped(
    //     "sophisticatedbackpacks:feeding_upgrade",
    //     ["", "B", ""],
    //     {
    //         B: upgrade_base,
    //     },
    // );

    // Compacting
    event.recipes.shapeless("sophisticatedbackpacks:compacting_upgrade", [
        upgrade_base,
        "storagedrawers:compacting_drawers_3",
    ]);
    event.recipes.shaped(
        "sophisticatedbackpacks:advanced_compacting_upgrade",
        ["RTR", "GBG", "RTR"],
        {
            B: "sophisticatedbackpacks:compacting_upgrade",
            G: "#forge:plates/gold",
            R: "minecraft:redstone",
            T: "#forge:plates/tin",
        },
    );
    // Restock
    event.recipes.shaped(
        "sophisticatedbackpacks:restock_upgrade",
        [" I ", "PBP", " I "],
        {
            B: upgrade_base,
            P: "minecraft:sticky_piston",
            I: "#forge:plates/iron",
        },
    );
    FillBrass(
        "sophisticatedbackpacks:advanced_restock_upgrade",
        "sophisticatedbackpacks:restock_upgrade",
    );

    // Deposit
    event.recipes.shaped(
        "sophisticatedbackpacks:deposit_upgrade",
        [" I ", "CBC", " I "],
        {
            B: upgrade_base,
            C: "create:chute",
            I: "#forge:plates/iron",
        },
    );
    FillBrass(
        "sophisticatedbackpacks:advanced_deposit_upgrade",
        "sophisticatedbackpacks:deposit_upgrade",
    );

    // Refill
    event.recipes.shaped(
        "sophisticatedbackpacks:refill_upgrade",
        [" I ", "CBC", " I "],
        {
            B: upgrade_base,
            C: "#forge:chests",
            I: "#forge:plates/iron",
        },
    );
    FillBrass(
        "sophisticatedbackpacks:advanced_refill_upgrade",
        "sophisticatedbackpacks:refill_upgrade",
    );

    // Void
    event.recipes.shapeless("sophisticatedbackpacks:void_upgrade", [
        upgrade_base,
        "trashcans:item_trash_can",
    ]);
    FillBrass(
        "sophisticatedbackpacks:advanced_void_upgrade",
        "sophisticatedbackpacks:void_upgrade",
    );

    // Crafting
    event.recipes.shapeless("sophisticatedbackpacks:crafting_upgrade", [
        upgrade_base,
        "minecraft:crafting_table",
    ]);

    // JukeBox
    event.recipes.shaped("sophisticatedbackpacks:jukebox_upgrade", [
        upgrade_base,
        "minecraft:jukebox",
    ]);

    // Tank
    event.recipes.shaped(
        "sophisticatedbackpacks:tank_upgrade",
        [" P ", "TBT", " P "],
        {
            B: upgrade_base,
            T: "create:fluid_tank",
            P: "#forge:plates/copper",
        },
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

    function FillBrass(output, input) {
        event.recipes.create.filling(output, [
            input,
            Fluid.of("tconstruct:molten_brass", FluidAmounts.INGOT * 5),
        ]);
    }
});
