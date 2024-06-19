ServerEvents.recipes((event) => {
    // Alloying
    // early game alloys can be mixed as well

    mix(
        "tconstruct:molten_rose_gold",
        "tconstruct:molten_gold",
        "tconstruct:molten_copper",
    );
    mix(
        "tconstruct:molten_bronze",
        "tconstruct:molten_tin",
        "tconstruct:molten_copper",
    );
    alloy(
        global.fluids.molten_dense_tungsten,
        [
            "tconstruct:molten_tungsten",
            "tconstruct:molten_nickel",
            "tconstruct:molten_iron",
        ],
    );

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
                amount: FluidAmounts.NUGGET * fluidIngredients.length,
            },
            temperature: 700,
        });
    }
    
    function cast(fluid, amount, output, catalyst, cooling_time, consume, basin) {
        event.custom({
            type: "tconstruct:casting_" + basin ? "basin" : "table",
            cast: { item: catalyst },
            cast_consumed: consume,
            cooling_time: cooling_time,
            fluid: { amount: amount, tag: fluid },
            result: { tag: output },
        })
    }

    function pour(fluid, amount, output, cooling_time, consume, basin) {
        event.custom({
            type: "tconstruct:casting_" + basin ? "basin" : "table",
            cast_consumed: consume,
            cooling_time: cooling_time,
            fluid: { amount: amount, tag: fluid },
            result: { tag: output },
        })
    }

    function mix(output, fluid1, fluid2) {
        event.recipes.create
            .mixing(Fluid.of(output, FluidAmounts.NUGGET), [
                Fluid.of(fluid1, FluidAmounts.NUGGET),
                Fluid.of(fluid2, FluidAmounts.NUGGET),
            ])
            .heated();
    }
});
