StartupEvents.registry("item", (event) => {
    // Create items here
    event.create(global.items.andesite_compound);

    event.create(global.items.copper_pickaxe, "pickaxe").tier("copper");
    event.create(global.items.copper_axe, "axe").tier("copper");
    event.create(global.items.copper_shovel, "shovel").tier("copper");
    event.create(global.items.copper_sword, "sword").tier("copper");
    event.create(global.items.copper_hoe, "hoe").tier("copper");
});
