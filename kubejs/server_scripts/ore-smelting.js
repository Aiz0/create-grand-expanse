ServerEvents.recipes((event) => {
    const furnaceOres = ["copper", "iron", "gold", "zinc", "tin", "nickel"];
    const nuggets_smelting = 3;
    const nuggets_blasting = 4;

    const smelt_to_nuggets = (id) => {
        event.smelting(
            `${nuggets_smelting}x #forge:nuggets/${id}`,
            `#forge:raw_materials/${id}`
        );
        event.blasting(
            `${nuggets_blasting}x #forge:nuggets/${id}`,
            `#forge:raw_materials/${id}`
        );
    };

    // remove all ingot making from furnaces.
    event.remove([
        { type: "minecraft:smelting", output: "#forge:ingots" },
        { type: "minecraft:blasting", output: "#forge:ingots" },
    ]);
    furnaceOres.forEach(smelt_to_nuggets);
});
