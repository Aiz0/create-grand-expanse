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
        .create(global.items.low_density_structure)
        .soundType("copper")
        .hardness(4)
        .resistance(7)
        .requiresTool(true)
        .model("grand_expanse:block/low_density_structure")
        .defaultCutout()
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_iron_tool");
    
    // Electorlyzer is a custom machinery block.
    event.create(global.items.electrolyzer, "custommachinery");
    
});
