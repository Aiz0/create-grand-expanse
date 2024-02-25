StartupEvents.registry("item", (event) => {
    // Create items here
    event.create(global.items.andesite_compound);

    // created in same order as tools are ordered in rei
    event.create(global.items.copper_sword, "sword").tier("copper");
    event.create(global.items.copper_shovel, "shovel").tier("copper");
    event.create(global.items.copper_pickaxe, "pickaxe").tier("copper");
    event.create(global.items.copper_axe, "axe").tier("copper");
    event.create(global.items.copper_hoe, "hoe").tier("copper");

    event.create(global.items.tool_part_mold);
    event.create(global.items.armor_plate_mold);
    event.create(global.items.iron_tool_part);
    event.create(global.items.iron_armor_plate);
});
