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

    // Adds melting to the meltable materials
    global.config.melting.materials.forEach((material) => {
        castFluid(material.name, material.fluid);
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

    function castFluid(material, fluid) {
        castIngot(
            AlmostUnified.getPreferredItemForTag(`forge:ingots/${material}`),
            fluid,
        );
        castNugget(
            AlmostUnified.getPreferredItemForTag(`forge:nuggets/${material}`),
            fluid,
        );
        castPlate(
            AlmostUnified.getPreferredItemForTag(`forge:plates/${material}`),
            fluid,
        );
        castBasin(
            AlmostUnified.getPreferredItemForTag(
                `forge:storage_blocks/${material}`,
            ),
            fluid,
        );
    }

    function castIngot(item, fluid) {
        castMold("createmetallurgy:graphite_ingot_mold", item, fluid, 80);
    }
    function castNugget(item, fluid) {
        castMold("createmetallurgy:graphite_nugget_mold", item, fluid, 40);
    }
    function castPlate(item, fluid) {
        castMold("createmetallurgy:graphite_plate_mold", item, fluid, 80);
    }

    function castMold(mold, item, fluid, time) {
        event.custom({
            type: "createmetallurgy:casting_in_table",
            ingredients: [
                {
                    item: mold,
                },
                {
                    fluid: fluid,
                    amount: FluidAmounts.INGOT,
                },
            ],
            processingTime: time,
            results: [item],
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
            results: [item],
        });
    }
});
