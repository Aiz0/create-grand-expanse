ServerEvents.recipes((event) => {
    // All recipes using create should be done in here.

    // Mixing Recipes.
    // Will be replaced with helper function later.
    event.recipes.create.mixing(
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

    // rubber from latex via mixing gives 1 extra rubber compared to handcrafting
    event.recipes.create.mixing(
        "thermal:rubber",
        Fluid.of("thermal:latex", FluidAmounts.BOTTLE),
    );
    event.recipes.create
        .mixing("thermal:rosin", Fluid.of("thermal:resin", FluidAmounts.BOTTLE))
        .heated();

    event.recipes.create.mixing(
        Fluid.of(global.fluids.andesite_mixture, FluidAmounts.INGOT),
        ["minecraft:andesite", "create:zinc_nugget", "minecraft:clay_ball"],
    );

    event.recipes.create
        .compacting("createdeco:cast_iron_ingot", [
            "minecraft:iron_ingot",
            "createmetallurgy:graphite",
        ])
        .heated()
        .id("minecraft:compacting/cast_iron_ingot");

    // Mill ore to dust for chance for extra
    Ingredient.of("#forge:raw_materials").itemIds.forEach((item) => {
        const material = item.split("_").pop();
        const output = AlmostUnified.getPreferredItemForTag(
            `forge:dusts/${material}`,
        );
        if (output.isEmpty()) {
            return;
        }
        event.recipes.create.milling([output, output.withChance(0.5)], item);
    });
});
