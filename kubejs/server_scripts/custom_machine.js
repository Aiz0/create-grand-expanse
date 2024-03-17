ServerEvents.recipes((event) => {
    event.recipes.custommachinery
        .custom_machine(global.items.electrolyzer, 20)
        .requireStructure(
            [
                ["bbb", "ccc", "bbb", "t t"],
                ["bsb", "csc", "bsb", "tmt"],
                ["bbb", "ccc", "bbb", "t t"],
            ],
            {
                t: "create:fluid_tank",
                b: "create:copper_casing",
                c: "grand_expanse:copper_coil_block",
                s: "create:andesite_encased_shaft_tier_0",
            },
        )
        .requireSU(64, 4)
        .requireFluid(Fluid.of("minecraft:water", 100))
        .produceFluid(Fluid.of("mekanism:oxygen", 10))
        .produceFluid(Fluid.of("mekanism:hydrogen", 20));

    event.recipes.custommachinery
        .custom_machine(global.items.fluix_generator, 20)
        .biomeWhitelist("ad_astra:lunar_wastelands")
        .requireSU(64)
        .requireFluid(Fluid.of(global.fluids.crystal, 100))
        .produceFluid(Fluid.of(global.fluids.fluix, 20));
});
