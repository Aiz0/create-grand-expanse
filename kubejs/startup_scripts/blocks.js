StartupEvents.registry("block", (event) => {
    event
        .create(global.items.copper_coil_block)
        .material("metal")
        .hardness(3)
        .resistance(6)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool");

    event
        .create(global.items.sturdy_hull)
        .material("metal")
        .hardness(5)
        .resistance(9)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_iron_tool");
    // Electorlyzer is a custom machinery block.
    event.create(global.items.electrolyzer, "custommachinery");
});
