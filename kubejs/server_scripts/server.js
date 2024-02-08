ServerEvents.recipes((event) => {
    function SmeltAndBlast(output, input) {
        event.smelting(output, input);
        event.blasting(output, input);
    }

    event
        .shaped(
            Item.of("sophisticatedbackpacks:backpack", 1),
            ["ABA", "CDC", "EBE"],
            {
                A: "minecraft:leather",
                B: "farmersdelight:canvas",
                C: "farmersdelight:rope",
                D: "minecraft:barrel",
                E: "minecraft:bundle",
            }
        )
        .id("sophisticatedbackpacks:backpack");

    // Remove crafting of iron and gold tools
    // We want alternate recipes for iron tools later
    // gold should only be found as loot
    event.remove([
        { output: "#forge:tools/iron" },
        { output: "#forge:tools/gold" },
    ]);

    // Remove ad astra hammer recipes.
    // We don't want this sheet/plate recipe.
    event.remove([
        { id: "ad_astra:recipes/hammer" },
        { input: "ad_astra:hammer" },
    ]);

    // Remove original andesite recipe
    event.remove({
        output: "create:andesite_alloy",
        input: "minecraft:andesite",
    });

    // andesite compound recipe from create:astral
    event.shaped(
        Item.of(global.items.andesite_compound, 1),
        ["AAA", "BBB", "CCC"],
        {
            A: "minecraft:andesite",
            B: "create:zinc_nugget",
            C: "minecraft:clay_ball",
        }
    );

    SmeltAndBlast("create:andesite_alloy", global.items.andesite_compound);

    //Mixing
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
        ]
    );

    //Alloying
});
