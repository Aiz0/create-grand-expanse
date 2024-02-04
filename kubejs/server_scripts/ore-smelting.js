ServerEvents.recipes((event) => {
    const furnaceOres = ["copper", "iron", "gold", "zinc", "tin", "nickel"];
    const nuggets_smelting = 3;
    const nuggets_blasting = 4;

    const smelt_to_nuggets = (id) => {
        event.smelting(
            `${nuggets_smelting}x #forge:nuggets/${id}`,
            `#forge:raw_materials/${id}`,
        );
        event.blasting(
            `${nuggets_blasting}x #forge:nuggets/${id}`,
            `#forge:raw_materials/${id}`,
        );
    };

    // remove all ingot making from furnaces.
    event.remove([
        { type: "minecraft:smelting", output: "#forge:ingots" },
        { type: "minecraft:blasting", output: "#forge:ingots" },
    ]);
    furnaceOres.forEach(smelt_to_nuggets);

    // Remove existing ingot smelting recipe
    // It uses superheated blazeburners and we don't want that
    event.remove({ type: "createmetallurgy:melting", input: "#forge:ingots" });

    global.config.melting.materials.forEach((material) => {
        global.config.melting.items.forEach((item) => {
            const tag = item.tag.concat(material.name);
            if (Item.of(`#${tag}`).empty) {
                return;
            }
            let fluidAmount = material.amount
                ? material.amount
                : global.config.melting.amount;
            let processingTime = material.time
                ? material.time
                : global.config.melting.time;
            const heatRequirement = material.heat
                ? material.heat
                : global.config.melting.heat;

            const multiplier =
                typeof item.nuggets !== "undefined" ? item.nuggets : 9; // amount of nuggets in a ingot
            fluidAmount *= multiplier;
            processingTime *= multiplier;

            event.custom({
                type: "createmetallurgy:melting",
                ingredients: [{ tag: tag }],
                processingTime: processingTime,
                results: [
                    {
                        fluid: material.fluid,
                        amount: fluidAmount,
                    },
                ],
                heatRequirement: heatRequirement,
            });
        });
    });
});
