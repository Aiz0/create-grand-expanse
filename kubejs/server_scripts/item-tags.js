ServerEvents.tags("item", (event) => {
    // To Unify rope
    event.add("forge:rope", "farmersdelight:rope");
    event.add("forge:rope", "quark:rope");

    // Fix andesite
    event.add("forge:ingots/andesite_alloy", "create:andesite_alloy");
    // Fix cast iron
    event.add("forge:ingots", "createdeco:cast_iron_ingot");
    event.add("forge:nuggets", "createdeco:cast_iron_nugget");
    event.add("forge:plates", "createdeco:cast_iron_sheet");

    // rosin is a alternative to slimeballs
    // not a replacement for the block though.
    event.add("forge:slimeballs", "thermal:rosin");

    tool(global.items.copper_pickaxe, "copper", "pickaxes");
    tool(global.items.copper_axe, "copper", "axes");
    tool(global.items.copper_shovel, "copper", "shovels");
    tool(global.items.copper_sword, "copper", "swords");
    tool(global.items.copper_hoe, "copper", "hoes");

    forgeCategory(global.items.copper_tool_part, "tool_parts", "copper");
    forgeCategory(global.items.copper_armor_plate, "armor_plates", "copper");
    forgeCategory(global.items.iron_tool_part, "tool_parts", "iron");
    forgeCategory(global.items.iron_armor_plate, "armor_plates", "iron");

    forgeCategory(global.items.bronze_rod, "rods", "bronze");
    forgeCategory(global.items.rose_gold_ingot, "ingots", "rose_gold");
    forgeCategory(
        global.items.high_density_tungsten,
        "ingots",
        "high_density_tungsten",
    );

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

    function forgeCategory(item, category, material) {
        material =
            typeof material !== "undefined"
                ? material
                : Item.of(item).getId().split("_").pop();
        event.add(`forge:${category}`, item);
        event.add(`forge:${category}/${material}`, item);
    }

    function tool(item, material, tool) {
        event.add(`forge:tools/${tool}`, item);
        event.add("forge:tools", item);
        event.add(`forge:tools/${material}`, item);
    }
});
