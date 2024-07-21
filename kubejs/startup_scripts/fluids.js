StartupEvents.registry("fluid", (event) => {
    //create fluids here
    const shimmer = event
        .create(global.fluids.fluix_shimmer)
        .stillTexture("grand_expanse:block/fluid/fluix_still")
        .flowingTexture("grand_expanse:block/fluid/fluix_flowing");

    shimmer.block
        .tagBlock("ad_astra:exclude_in_space")
        .transparent(true)
        .renderType("translucent");

    event.create(global.fluids.andesite_mixture).thinTexture(0x808582);
    event.create(global.fluids.cryo_solution).thinTexture(0x85ff85);

    // Molten stuff
    molten_metal(global.fluids.molten_cast_iron, 0x313131);

    function molten_metal(fluid, color) {
        event
            .create(fluid)
            .stillTexture("tinkers_construct:block/fluid/molten/still")
            .flowingTexture("tinkers_construct:block/fluid/molten/flowing")
            .color(color);
    }
});
