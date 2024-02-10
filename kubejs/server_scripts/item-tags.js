ServerEvents.tags("item", (event) => {
    // Create crushed raw materials
    event
        .get("create:crushed_raw_materials")
        .getObjectIds()
        .forEach((item) => forgeCategory(item, "crushed_raw_materials"));

    // Mekanism dirty dusts
    event
        .get("mekanism:dirty_dusts")
        .getObjectIds()
        .forEach((item) => forgeCategory(item, "dirty_dusts"));

    function forgeCategory(item, category) {
        const material = Item.of(item).getId().split("_").pop();
        event.add(`forge:${category}`, item);
        event.add(`forge:${category}/${material}`, item);
    }
});
