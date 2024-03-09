ServerEvents.recipes((event) => {
    // New Smelting recipes to the smeltable ores
    global.config.furnace.ores.forEach(smeltToNuggets);

    SmeltAndBlast("create:andesite_alloy", global.items.andesite_compound);

    function SmeltAndBlast(output, input) {
        event.smelting(output, input);
        event.blasting(output, input);
    }

    // Helper Functions
    function smeltToNuggets(material) {
        const nugget = AlmostUnified.getPreferredItemForTag(
            `forge:nuggets/${material}`,
        ).getId();
        // Normal Smelting
        event
            .smelting(
                `${global.config.furnace.smelting_nuggets}x ${nugget}`,
                `#forge:raw_materials/${material}`,
            )
            .xp(0.5);
        event.smelting(
            `${global.config.furnace.smelting_nuggets}x ${nugget}`,
            `#forge:dusts/${material}`,
        );
        // Blasting. A bit Faster, A bit Better.
        event
            .blasting(
                `${global.config.furnace.blasting_nuggets}x ${nugget}`,
                `#forge:raw_materials/${material}`,
            )
            .xp(0.5);
        event.blasting(
            `${global.config.furnace.blasting_nuggets}x ${nugget}`,
            `#forge:dusts/${material}`,
        );
    }
});
