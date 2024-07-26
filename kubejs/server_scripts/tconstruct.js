ServerEvents.recipes((event) => {

    //More Materials
    addMMT("lunium_nova", 120, 60, 1200, 1)
    
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
    melt("minecraft:redstone", "thermal:redstone", FluidAmounts.INGOT, 25, 750);
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

    cast(
        global.fluids.cryo_solution,
        FluidAmounts.INGOT,
        global.items.cryo_crystal,
        "mmt:lunium_nova_dust",
        200,
        true,
        false
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
            type: "tconstruct:casting_" + (basin ? "basin" : "table"),
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

    function pour(fluid, amount, output, cooling_ticks, basin) {
        event.custom({
            type: "tconstruct:casting_" + (basin ? "basin" : "table"),
            cast_consumed: false,
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
    
    function addMMT(material_name, ingot_melt_ticks, ingot_cool_ticks, temperature, crushing_nuggets) {
        const nugget_melt_ticks = ingot_melt_ticks / 9;
        const block_melt_ticks = ingot_melt_ticks * 9;
        const nugget_cool_ticks = ingot_cool_ticks / 9;
        const block_cool_ticks = ingot_cool_ticks * 9;
        const liquid = "grand_expanse:molten_" + material_name;
        
        const raw = "mmt:raw_" + material_name;
        melt(raw, liquid, FluidAmounts.INGOT, ingot_melt_ticks, temperature);
        
        const dust = "mmt:" + material_name + "_dust";
        melt(dust, liquid, FluidAmounts.INGOT, ingot_melt_ticks, temperature);

        const rawBlock = "mmt:raw_" + material_name + "_block";
        melt(rawBlock, liquid, FluidAmounts.METAL_BLOCK, block_melt_ticks, temperature);
        
        const nugget = "mmt:" + material_name + "_nugget";
        melt(nugget, liquid, FluidAmounts.INGOT, nugget_melt_ticks, temperature);
        cast_type(liquid, FluidAmounts.INGOT, nugget, "nugget", nugget_cool_ticks);
        
        const ingot = "mmt:" + material_name + "_ingot";
        melt(ingot, liquid, FluidAmounts.INGOT, ingot_melt_ticks, temperature);
        cast_type(liquid, FluidAmounts.INGOT, ingot, "ingot", ingot_cool_ticks);      
        
        const plate = "mmt:" + material_name + "_plate";
        melt(plate, liquid, FluidAmounts.INGOT, ingot_melt_ticks, temperature);
        cast_type(liquid, FluidAmounts.INGOT, plate, "plate", ingot_cool_ticks);

        const block = "mmt:" + material_name + "_block";
        melt(block, liquid, FluidAmounts.METAL_BLOCK, block_melt_ticks, temperature);
        pour(liquid, FluidAmounts.METAL_BLOCK, block, block_cool_ticks, true);
        
        const gear = "mmt:" + material_name + "_gear";
        melt(gear, liquid, FluidAmounts.INGOT * 4, ingot_melt_ticks * 4, temperature);
        cast_type(liquid, FluidAmounts.INGOT * 4, gear, "gear", ingot_cool_ticks * 4);
                
        const rod = "mmt:" + material_name + "_rod";
        melt(rod, liquid, FluidAmounts.INGOT / 2, ingot_melt_ticks / 2, temperature);
        cast_type(liquid, FluidAmounts.INGOT / 2, rod, "rod", ingot_cool_ticks / 2);

        const wire = "mmt:" + material_name + "_wire";
        melt(wire, liquid, FluidAmounts.INGOT / 2, ingot_melt_ticks / 2, temperature);
        cast_type(liquid, FluidAmounts.INGOT / 2, wire, "wire", ingot_cool_ticks / 2);
        
        event.recipes.create.crushing(dust, ingot);
        event.recipes.create.crushing([dust, Item.of(nugget, crushing_nuggets)], raw);
    }
});
