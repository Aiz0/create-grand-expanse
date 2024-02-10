ServerEvents.recipes((event) => {
    // Removals
    // Remove all ingot making from furnaces.
    event.remove([
        { type: "minecraft:smelting", output: "#forge:ingots" },
        { type: "minecraft:blasting", output: "#forge:ingots" },
    ]);

    // Remove existing ingot smelting recipe
    // It uses superheated blazeburners and we don't want that
    event.remove({ type: "createmetallurgy:melting" });

    // Adds smelting recipes to the smeltable ores
    global.config.furnace.ores.forEach(smelt_to_nuggets);

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
                material.heatRequirement
            );
        });
    });

    // Helper Functions
    function smelt_to_nuggets(material) {
        // Normal Smelting
        event.smelting(
            `${global.config.furnace.smelting_nuggets}x #forge:nuggets/${material}`,
            `#forge:raw_materials/${material}`
        );
        // Blasting. A bit Faster
        event.blasting(
            `${global.config.furnace.blasting_nuggets}x #forge:nuggets/${material}`,
            `#forge:raw_materials/${material}`
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
            fluidAmount * global.config.melting.time
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
});
