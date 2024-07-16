ServerEvents.recipes((event) => {
    // Alloying
    // early game alloys can be mixed as well

    mix("tconstruct:molten_rose_gold", [
        "tconstruct:molten_gold",
        "tconstruct:molten_copper",
    ]);
    mix("tconstruct:molten_bronze", [
        "tconstruct:molten_tin",
        "tconstruct:molten_copper",
    ]);

    //Andesite
    melt(
        global.items.andesite_compound,
        global.fluids.andesite_mixture,
        FluidAmounts.INGOT,
        20,
        500
    );
    melt(
        "create:andesite_alloy",
        global.fluids.andesite_mixture,
        FluidAmounts.INGOT,
        20,
        500
    );
    melt(
        "minecraft:redstone_block",
        "thermal:redstone",
        FluidAmounts.METAL_BLOCK,
        225,
        750
    );
    melt(
        "minecraft:redstone",
        "thermal:redstone",
        FluidAmounts.INGOT,
        25,
        750
    )
    cast_type(
        global.fluids.andesite_mixture,
        FluidAmounts.INGOT,
        "create:andesite_alloy",
        global.casts.ingot,
        10
    );
    event.remove({
        id: "tconstruct:smeltery/casting/seared/smeltery_controller",
    });
    event.shaped("tconstruct:smeltery_controller", ["BCB", "CSC", "BCB"], {
        B: "tconstruct:seared_brick",
        S: "grand_expanse:smoldering_core",
        C: "minecraft:copper_ingot",
    });

    function alloy(output, fluids) {
        const fluidIngredients = fluids.reduce((result, fluid) => {
            result.push({ fluid: fluid, amount: FluidAmounts.NUGGET });
            return result;
        }, []);

        event.custom({
            type: "tconstruct:alloy",
            inputs: fluidIngredients,
            result: {
                fluid: output,
                amount: FluidAmounts.INGOT * fluidIngredients.length,
            },
            temperature: 700,
        });
    }

    function cast(
        fluid,
        amount,
        output,
        catalyst,
        cooling_ticks,
        consume,
        basin
    ) {
        event.custom({
            type: "tconstruct:casting_" + basin ? "basin" : "table",
            cast: { item: catalyst },
            cast_consumed: consume,
            cooling_time: cooling_ticks,
            fluid: { amount: amount, fluid: fluid },
            result: output,
        });
    }

    function cast_type(fluid, amount, output, type, cooling_ticks) {
        event.custom({
            type: "tconstruct:casting_table",
            cast: { tag: "tconstruct:casts/multi_use/" + type },
            cast_consumed: false,
            cooling_time: cooling_ticks,
            fluid: { amount: amount, fluid: fluid },
            result: output,
        });
        event.custom({
            type: "tconstruct:casting_table",
            cast: { tag: "tconstruct:casts/single_use/" + type },
            cast_consumed: true,
            cooling_time: cooling_ticks,
            fluid: { amount: amount, fluid: fluid },
            result: output,
        });
    }

    function pour(fluid, amount, output, cooling_ticks, consume, basin) {
        event.custom({
            type: "tconstruct:casting_" + basin ? "basin" : "table",
            cast_consumed: consume,
            cooling_time: cooling_ticks,
            fluid: { amount: amount, fluid: fluid },
            result: output,
        });
    }

    //temperature guide:
    // lava = 1000°C
    // blazing blood = 1500°C
    function melt(item, output, amount, ticks, temperature) {
        event.custom({
            type: "tconstruct:melting",
            ingredient: { item: item },
            result: { amount: amount, fluid: output },
            temperature: temperature,
            time: ticks,
        });
    }

    function mix(output, ingredients) {
        let ingMix = [];
        ingredients.forEach((i) => {
            ingMix.push({ fluid: i, amount: 10 });
        });
        event.recipes.create
            .mixing(Fluid.of(output, FluidAmounts.NUGGET), ingMix)
            .heated();
    }
});
