ServerEvents.recipes((event) => {
    // Alloying
    // early game alloys can be mixed as well

    alloy(
        global.fluids.molten_dense_tungsten,
        [
            "createmetallurgy:molten_tungsten",
            "tconstruct:molten_nickel",
            "tconstruct:molten_iron",
        ],
        60,
        "heated",
    );

    function alloy(output, fluids, processingTime, heatRequirement) {
        const fluidIngredients = fluids.reduce((result, fluid) => {
            result.push({ fluid: fluid, amount: FluidAmounts.NUGGET });
            return result;
        }, []);

        event.custom({
            type: "tconstruct:alloy",
            input: fluidIngredients,
            results: [
                {
                    fluid: output,
                    amount: FluidAmounts.NUGGET * fluidIngredients.length,
                },
            ],
            temperature: 700,
        });
    }

    function mixAndAlloy(output, fluid1, fluid2, processingTime) {
        alloy(output, [fluid1, fluid2], processingTime, "heated");
        event.recipes.create
            .mixing(Fluid.of(output, FluidAmounts.NUGGET), [
                Fluid.of(fluid1, FluidAmounts.NUGGET),
                Fluid.of(fluid2, FluidAmounts.NUGGET),
            ])
            .heated();
    }
});
