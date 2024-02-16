ServerEvents.recipes((event) => {
    event.custom({
        type: "createmetallurgy:melting",
        ingredients: [
            { fluid: "thermal:sap", amount: FluidAmounts.NUGGET * 2 },
        ],
        processingTime: 120,
        results: [{ fluid: "thermal:syrup", amount: FluidAmounts.NUGGET }],
        heatRequirement: "heated",
    });

    // Custom Casting
    castIngot("create:andesite_alloy", global.fluids.andesite_mixture);
    castBasin("create:andesite_alloy_block", global.fluids.andesite_mixture);

    // Adds smelting recipes to the smeltable ores
    global.config.furnace.ores.forEach(smeltToNuggets);

    // Adds melting to the meltable materials
    global.config.melting.materials.forEach((material) => {
        global.config.melting.items.forEach((item) => {
            const tag = item.tag.concat(material.name);
            if (Item.of(`#${tag}`).empty) {
                return;
            }
            melting(
                tag,
                material.fluid,
                item.fluidAmount,
                material.heatRequirement,
            );
        });
    });

    // Helper Functions
    function smeltToNuggets(material) {
        // Normal Smelting
        event.smelting(
            `${global.config.furnace.smelting_nuggets}x #forge:nuggets/${material}`,
            `#forge:raw_materials/${material}`,
        );
        // Blasting. A bit Faster, A bit Better.
        event.blasting(
            `${global.config.furnace.blasting_nuggets}x #forge:nuggets/${material}`,
            `#forge:raw_materials/${material}`,
        );
    }

    function melting(inputTag, fluid, fluidAmount, heatRequirement) {
        // Resolve optional parameters
        fluidAmount =
            typeof fluidAmount !== "undefined"
                ? fluidAmount
                : global.config.melting.amount;
        heatRequirement =
            typeof heatRequirement !== "undefined"
                ? heatRequirement
                : global.config.melting.heatRequirement;
        // Get processing Time from FluidAmount
        const processingTime = Math.max(
            global.config.melting.minTime,
            fluidAmount * global.config.melting.time,
        );
        event.custom({
            type: "createmetallurgy:melting",
            // Might change later
            ingredients: [{ tag: inputTag }],
            processingTime: processingTime,
            results: [
                {
                    fluid: fluid,
                    amount: fluidAmount,
                },
            ],
            heatRequirement: heatRequirement,
        });
    }

    function castIngot(item, fluid) {
        event.custom({
            type: "createmetallurgy:casting_in_table",
            ingredients: [
                {
                    item: "createmetallurgy:graphite_ingot_mold",
                },
                {
                    fluid: fluid,
                    amount: FluidAmounts.INGOT,
                },
            ],
            processingTime: 80,
            results: [
                {
                    item: item,
                    amount: 1,
                },
            ],
        });
    }
    function castBasin(item, fluid) {
        event.custom({
            type: "createmetallurgy:casting_in_basin",
            ingredients: [
                {
                    fluid: fluid,
                    amount: FluidAmounts.METAL_BLOCK,
                },
            ],
            processingTime: 150,
            results: [
                {
                    item: item,
                    amount: 1,
                },
            ],
        });
    }
});
