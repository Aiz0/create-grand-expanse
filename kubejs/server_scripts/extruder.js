ServerEvents.recipes((event) => {
    event.recipes
        .createMechanicalExtruderExtruding("minecraft:basalt", [
            "minecraft:blue_ice",
            Fluid.of("minecraft:lava"),
        ])
        .withCatalyst("minecraft:soul_sand")
        .requiredBonks(global.config.extruder_bonks)
        .id("create_mechanical_extruder:extruding/basalt");

    // Cobblestone
    event.recipes
        .createMechanicalExtruderExtruding("minecraft:cobblestone", [
            Fluid.of("minecraft:water"),
            Fluid.of("minecraft:lava"),
        ])
        .requiredBonks(global.config.extruder_bonks)
        .id("create_mechanical_extruder:extruding/cobblestone");

    extrude(
        "minecraft:cobblestone",
        "createcompression:compressed_cobblestone_3x",
    );
    extrude(
        "createcompression:compressed_cobblestone_1x",
        "createcompression:compressed_cobblestone_5x",
    );

    // Andesite
    extrude(
        "minecraft:andesite",
        "createcompression:compressed_andesite_2x",
        100,
    );
    extrude(
        "minecraft:andesite",
        "createcompression:compressed_andesite_3x",
        10,
    );
    extrude(
        "createcompression:compressed_andesite_1x",
        "createcompression:compressed_andesite_5x",
        2,
    );

    function extrude(output, catalyst, bonks) {
        bonks = typeof bonks !== "undefined" ? bonks : 1;
        event.recipes
            .createMechanicalExtruderExtruding(output, [
                Fluid.of("minecraft:water"),
                Fluid.of("minecraft:lava"),
            ])
            .withCatalyst(catalyst)
            .requiredBonks(bonks);
    }
});
