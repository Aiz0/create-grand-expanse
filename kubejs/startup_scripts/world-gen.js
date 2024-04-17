WorldgenEvents.add((event) => {
    // Moon
    // event.addOre((ore) => {
    //     ore.id = global.packName + ":wolframite_ore_moon";
    //     //ore.biomes = "ad_astra:lunar_wastelands"; // should not be needed due to target
    //     ore.addTarget(
    //         "#ad_astra:moon_ore_replaceables",
    //         "createmetallurgy:wolframite_ore",
    //     );
    //     ore.count([10, 30]).squared().triangleHeight(-30, 85);
    // });
    event.addOre((ore) => {
        ore.id = global.packName + ":nickel_ore_moon";
        //ore.biomes = "ad_astra:lunar_wastelands"; // should not be needed due to target
        ore.addTarget("#ad_astra:moon_ore_replaceables", "thermal:nickel_ore");
        ore.count([25, 40]).squared().triangleHeight(0, 85);
    });
});
