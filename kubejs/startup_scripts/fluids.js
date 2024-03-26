StartupEvents.registry("fluid", (event) => {
    //create fluids here

    event.create(global.fluids.andesite_mixture).thinTexture(0x808582);
    // Molten stuff
    molten_metal(global.fluids.molten_tin, 0x7ea0b5);
    molten_metal(global.fluids.molten_nickel, 0xbdac78);
    molten_metal(global.fluids.molten_desh, 0xd68d4d);
    molten_metal(global.fluids.molten_silver, 0xb4c0db);
    molten_metal(global.fluids.molten_lead, 0x312d43);
    molten_metal(global.fluids.molten_rose_gold, 0xf4af94);
    molten_metal(global.fluids.molten_bronze, 0xe59831);
    molten_metal(global.fluids.molten_cast_iron, 0x313131);
    molten_metal(global.fluids.molten_invar, 0x567473);
    molten_metal(global.fluids.molten_constantan, 0xb6883e);
    molten_metal(global.fluids.molten_electrum, 0xe7e68c);
    molten_metal(global.fluids.molten_dense_tungsten, 0x9ba35c);

    function molten_metal(fluid, color) {
        event
            .create(fluid)
            .stillTexture("tinkers_construct:block/fluid/molten/still")
            .flowingTexture("tinkers_construct:block/fluid/molten/flowing")
            .color(color);
    }
});
