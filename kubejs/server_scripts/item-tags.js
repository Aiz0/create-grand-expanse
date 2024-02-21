ServerEvents.tags("item", (event) => {
    // To Unify rope
    event.add("forge:rope", "farmersdelight:rope");
    event.add("forge:rope", "quark:rope");

    // rosin is a alternative to slimeballs
    // not a replacement for the block though.
    event.add("forge:slimeballs", "thermal:rosin");

    tool(global.items.copper_pickaxe, "copper", "pickaxes");
    tool(global.items.copper_axe, "copper", "axes");
    tool(global.items.copper_shovel, "copper", "shovels");
    tool(global.items.copper_sword, "copper", "swords");
    tool(global.items.copper_hoe, "copper", "hoes");

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

    function tool(item, material, tool) {
        event.add(`forge:tools/${tool}`, item);
        event.add("forge:tools", item);
        event.add(`forge:tools/${material}`, item);
    }
});
