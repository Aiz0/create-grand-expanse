StartupEvents.registry("block", (event) => {
    event
        .create(global.items.copper_coil_block)
        .material("metal")
        .hardness(3)
        .resistance(6)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool");

    // Electorlyzer is a custom machinery block.
    event.create(global.items.electrolyzer, "custommachinery");
});
