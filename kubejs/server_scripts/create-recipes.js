ServerEvents.recipes((event) => {
    // All recipes using create should be done in here.

    // Mixing Recipes.
    // Will be replaced with helper function later.
    event.recipes.createMixing(
        Fluid.of(global.fluids.molten_rose_gold, FluidAmounts.NUGGET),
        [
            {
                fluid: "createmetallurgy:molten_gold",
                amount: FluidAmounts.NUGGET,
            },
            {
                fluid: "createmetallurgy:molten_copper",
                amount: FluidAmounts.NUGGET,
            },
        ],
    );
});
