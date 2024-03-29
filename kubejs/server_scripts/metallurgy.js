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

    // Cast Iron to make all types of molds/casts.
    for (const [name, obj] of Object.entries(global.config.casting.table)) {
        castMold(
            Item.of(obj.mold),
            Ingredient.of(`#${obj.resultTag}`),
            global.fluids.molten_cast_iron,
            FluidAmounts.INGOT,
            80,
        );
    }

    // Adds melting and casting to the meltable materials
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

    // Alloying
    // early game alloys can be mixed as well
    mixAndAlloy(
        global.fluids.molten_rose_gold,
        "createmetallurgy:molten_gold",
        "createmetallurgy:molten_copper",
        40,
    );
    mixAndAlloy(
        global.fluids.molten_bronze,
        global.fluids.molten_tin,
        "createmetallurgy:molten_copper",
        40,
    );

    //alloy mixer only
    alloy(
        "createmetallurgy:molten_brass",
        ["createmetallurgy:molten_copper", "createmetallurgy:molten_zinc"],
        40,
        "heated",
    );
    alloy(
        global.fluids.molten_invar,
        [global.fluids.molten_nickel, "createmetallurgy:molten_iron"],
        40,
        "heated",
    );
    alloy(
        global.fluids.molten_constantan,
        [global.fluids.molten_nickel, "createmetallurgy:molten_copper"],
        40,
        "heated",
    );
    alloy(
        global.fluids.molten_electrum,
        [global.fluids.molten_silver, "createmetallurgy:molten_gold"],
        40,
        "heated",
    );
    alloy(
        global.fluids.molten_dense_tungsten,
        [
            "createmetallurgy:molten_tungsten",
            global.fluids.molten_nickel,
            "createmetallurgy:molten_iron",
        ],
        60,
        "heated",
    );

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
        for (const [name, obj] of Object.entries(global.config.casting.table)) {
            castMold(
                AlmostUnified.getPreferredItemForTag(
                    `${obj.resultTag}/${material}`,
                ),
                { item: obj.mold },
                fluid,
                obj.amount,
                obj.time,
            );
        }
        castBasin(
            AlmostUnified.getPreferredItemForTag(
                `forge:storage_blocks/${material}`,
            ),
            fluid,
        );
    }

    function castMold(item, mold, fluid, fluidAmount, time) {
        if (Item.of(item).isEmpty()) {
            return;
        }
        event.custom({
            type: "createmetallurgy:casting_in_table",
            ingredients: [
                mold,
                {
                    fluid: fluid,
                    amount: fluidAmount,
                },
            ],
            processingTime: time,
            results: [item],
        });
    }
    function castBasin(item, fluid) {
        if (Item.of(item).isEmpty()) {
            return;
        }
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

    function alloy(output, fluids, processingTime, heatRequirement) {
        const fluidIngredients = fluids.reduce((result, fluid) => {
            result.push({ fluid: fluid, amount: FluidAmounts.NUGGET });
            return result;
        }, []);

        event.custom({
            type: "createmetallurgy:alloying",
            ingredients: fluidIngredients,
            processingTime: processingTime,
            results: [
                {
                    fluid: output,
                    amount: FluidAmounts.NUGGET * fluidIngredients.length,
                },
            ],
            heatRequirement: heatRequirement,
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
