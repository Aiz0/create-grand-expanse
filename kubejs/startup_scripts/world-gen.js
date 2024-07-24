WorldgenEvents.add((event) => {
    // Moon
    event.addOre((ore) => {
        ore.id = global.packName + ":nickel_ore_moon";
        ore.addTarget("#ad_astra:moon_ore_replaceables", "thermal:nickel_ore");
        ore.count([20, 45]).squared().triangleHeight(40, 85);
        ore.size = 6;
        ore.chance = 1.1;
    });
    event.addOre((ore) => {
        ore.id = global.packName + ":silver_ore_moon";
        ore.addTarget("#ad_astra:moon_ore_replaceables", "thermal:silver_ore");
        ore.count([10, 30]).squared().triangleHeight(20, 60);
        ore.size = 4;
        ore.chance = 1.2;
    });
    event.addOre((ore) => {
        ore.id = global.packName + ":lunium_nova_moon";
        ore.addTarget("#ad_astra:moon_ore_replaceables", global.items.lunium_nova_ore);
        ore.count([2, 10]).squared().triangleHeight(0, 50);
        ore.size = 3;
        ore.chance = 1.5;
    })
});
