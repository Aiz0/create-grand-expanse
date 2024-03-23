StartupEvents.registry("block", (event) => {
    event
        .create(global.items.copper_coil_block)
        .material("heavy_metal")
        .hardness(3)
        .resistance(6)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool");

    event
        .create(global.items.sturdy_hull)
        .material("heavy_metal")
        .hardness(5)
        .resistance(9)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_iron_tool");
    event
        .create(global.items.dense_tungsten_hull)
        .material('heavy_metal')
        .hardness(7)
        .resistance(10)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_iron_tool");
    // Electorlyzer is a custom machinery block.
    event.create(global.items.electrolyzer, "custommachinery");
});
