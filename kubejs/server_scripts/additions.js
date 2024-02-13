ServerEvents.recipes((event) => {
    // andesite compound recipe from create:astral
    event.shaped(
        Item.of(global.items.andesite_compound, 1),
        ["AAA", "BBB", "CCC"],
        {
            A: "minecraft:andesite",
            B: "create:zinc_nugget",
            C: "minecraft:clay_ball",
        },
    );
    SmeltAndBlast("create:andesite_alloy", global.items.andesite_compound);

    // Thermal saw blade
    // crafting item
    event.shaped(Item.of("thermal:saw_blade", 1), [" A ", "AAA", " A "], {
        A: "create:iron_sheet",
    });

    // Thermal Drill
    // crafting item
    event.shaped(Item.of("thermal:drill_head", 1), [" A ", "ABA", "BBB"], {
        A: "create:andesite_alloy",
        B: "create:iron_sheet",
    });
    // Thermal arboreal extractor
    // Early game to get access to tree fluids.
    event.shaped(
        Item.of("thermal:device_tree_extractor", 1),
        ["ABA", "BCB", "ADA"],
        {
            A: "create:andesite_alloy",
            B: "#minecraft:planks",
            C: "create:fluid_tank",
            D: "thermal:drill_head",
        },
    );

    function SmeltAndBlast(output, input) {
        event.smelting(output, input);
        event.blasting(output, input);
    }

    // Compressed blocks
    for (const [original_block, blocks] of Object.entries(global.compressed)) {
        blocks.forEach((block, index, array) => {
            const block_tier_below =
                index + 1 == array.length ? original_block : array[index + 1];
            event.shapeless(block, `9x ${block_tier_below}`);
            event.shapeless(`9x ${block_tier_below}`, block);
        });
    }
});
