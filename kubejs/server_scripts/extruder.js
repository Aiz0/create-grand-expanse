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

    // Cobblestone
    extrude(
        "minecraft:cobblestone",
        "createcompression:compressed_cobblestone_4x",
        2,
    );
    extrude(
        "minecraft:cobblestone",
        "createcompression:compressed_cobblestone_6x",
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
    extrude("minecraft:andesite", "createcompression:compressed_andesite_4x");
    extrude(
        "createcompression:compressed_andesite_1x",
        "createcompression:compressed_andesite_5x",
    );
    extrude(
        "createcompression:compressed_andesite_2x",
        "createcompression:compressed_andesite_6x",
    );
    extrude(
        "createcompression:compressed_andesite_3x",
        "createcompression:compressed_andesite_7x",
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
