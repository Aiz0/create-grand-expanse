ServerEvents.tags("item", (event) => {
    const crushed_raw_materials = event
        .get("create:crushed_raw_materials")
        .getObjectIds();

    crushed_raw_materials.forEach((material) => {
        const metal = Item.of(material).getId().split("_").pop();
        event.add("forge:crushed_raw_materials", material);
        event.add(`forge:crushed_raw_materials/${metal}`, material);
    });
});
