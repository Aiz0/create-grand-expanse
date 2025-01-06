StartupEvents.registry("block", (event) => {
    event
        .create(global.items.copper_coil_block)
        .soundType("copper")
        .hardness(3)
        .resistance(6)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool");

    event
        .create(global.items.sturdy_hull)
        .soundType("lantern")
        .hardness(5)
        .resistance(9)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_iron_tool");

    event
        .create(global.items.smoldering_core)
        .item((i) => {
            i.tooltip("Found on in craters on the moon");
        })
        .soundType("metal")
        .hardness(9)
        .resistance(25)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_diamond_tool");

    event
        .create(global.items.low_density_structure)
        .soundType("copper")
        .hardness(4)
        .resistance(7)
        .requiresTool(true)
        .model("grand_expanse:block/low_density_structure")
        .defaultCutout()
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_iron_tool");

    event
        .create(global.items.lunium_nova_ore)
        .soundType("stone")
        .hardness(7)
        .resistance(12)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_diamond_tool");

    // Electorlyzer is a custom machinery block.
    event.create(global.items.electrolyzer, "custommachinery");
});

// Modify Existing Blocks
BlockEvents.modification((event) => {
    event.modify("ae2:flawless_budding_quartz", (block) => {
        block.destroySpeed = -1;
        block.explosionResistance = Math.max;
    });
});
