ServerEvents.recipes((event) => {
    event.recipes
        .createMechanicalExtruderExtruding("minecraft:cobblestone", [
            Fluid.of("minecraft:water"),
            Fluid.of("minecraft:lava"),
        ])
        .requiredBonks(global.config.extruder_bonks)
        .id("create_mechanical_extruder:extruding/cobblestone");
    event.recipes
        .createMechanicalExtruderExtruding("minecraft:basalt", [
            "minecraft:blue_ice",
            Fluid.of("minecraft:lava"),
        ])
        .withCatalyst("minecraft:soul_sand")
        .requiredBonks(global.config.extruder_bonks)
        .id("create_mechanical_extruder:extruding/basalt");
});
