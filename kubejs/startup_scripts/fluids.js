StartupEvents.registry("fluid", (event) => {
    //create fluids here

    event.create(global.fluids.andesite_mixture).thinTexture(0x808582);
    // Molten stuff
    molten_metal(global.fluids.molten_cast_iron, 0x313131);
    molten_metal(global.fluids.molten_dense_tungsten, 0x9ba35c);

    function molten_metal(fluid, color) {
        event
            .create(fluid)
            .stillTexture("tinkers_construct:block/fluid/molten/still")
            .flowingTexture("tinkers_construct:block/fluid/molten/flowing")
            .color(color);
    }
});
