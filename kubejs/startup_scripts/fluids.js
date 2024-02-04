StartupEvents.registry("fluid", (event) => {
    //create fluids here
    event
        .create(global.fluids.molten_tin)
        .thickTexture(0xb6d5e6)
        .bucketColor(0xb6d5e6)
        .stillTexture("kubejs:block/fluid/molten/still")
        .flowingTexture("kubejs:block/fluid/molten/flowing");
});
