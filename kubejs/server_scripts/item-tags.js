ServerEvents.tags("item", (event) => {
    // To Unify rope
    event.add("forge:rope", "farmersdelight:rope");
    event.add("forge:rope", "quark:rope");

    // Fix Wolframite/Tungsten Tags
    //TODO clean this up...
    event.add("forge:dusts/tungsten", "createmetallurgy:wolframite_dust");
    event.add(
        "forge:dirty_dusts/tungsten",
        "createmetallurgy:dirty_wolframite_dust",
    );
    event.add("forge:dirty_dusts", "createmetallurgy:dirty_wolframite_dust");
    event.add(
        "forge:raw_materials/tungsten",
        "createmetallurgy:raw_wolframite",
    );
    event.add(
        "forge:crushed_raw_materials/tungsten",
        "createmetallurgy:crushed_raw_wolframite",
    );
    event.add(
        "forge:crushed_raw_materials/tungsten",
        "createmetallurgy:crushed_raw_wolframite",
    );

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
    //TODO same tag for metallurgy
    event
        .get("mekanism:dirty_dusts")
        .getObjectIds()
        .forEach((item) => forgeCategory(item, "dirty_dusts"));

    // Metallurgy dirty dusts
    Ingredient.of(/^createmetallurgy:dirty/).itemIds.forEach((item) => {
        const material = item.split("_").slice(-2).reverse().pop();
        if (material === "wolframite") {
            material = "tungsten";
        }
        forgeCategory(item, "dirty_dusts", material);
    });
    // Get all metallurgy dusts that are non dirty and fix their tags
    Ingredient.of(/^createmetallurgy:[^_]+_dust/).itemIds.forEach((item) => {
        console.log(item);
        const material = item.split("_")[0].split(":").pop();
        if (material === "wolframite") {
            material = "tungsten";
        }
        console.log(material);
        forgeCategory(item, "dusts", material);
    });

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
