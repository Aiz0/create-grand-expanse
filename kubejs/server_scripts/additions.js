ServerEvents.recipes((event) => {
    // andesite compound recipe from create:astral
    event.shaped(
        Item.of(global.items.andesite_compound, 1),
        ["AAA", "BBB", "CCC"],
        {
            A: "minecraft:andesite",
            B: "create:zinc_nugget",
            C: "minecraft:clay_ball",
        },
    );
    SmeltAndBlast("create:andesite_alloy", global.items.andesite_compound);

    // Thermal saw blade
    // crafting item
    event.shaped(Item.of("thermal:saw_blade", 1), [" A ", "AAA", " A "], {
        A: "create:iron_sheet",
    });

    // Thermal Drill
    // crafting item
    event.shaped(Item.of("thermal:drill_head", 1), [" A ", "ABA", "BBB"], {
        A: "create:andesite_alloy",
        B: "create:iron_sheet",
    });
    // Thermal arboreal extractor
    // Early game to get access to tree fluids.
    event.shaped(
        Item.of("thermal:device_tree_extractor", 1),
        ["ABA", "BCB", "ADA"],
        {
            A: "create:andesite_alloy",
            B: "#minecraft:planks",
            C: "create:fluid_tank",
            D: "thermal:drill_head",
        },
    );

    // Mechanical Extruder recipes
    // Press recipe surrounded by glass and andesite alloy
    event.shaped(
        "create_mechanical_extruder:mechanical_extruder",
        ["ABA", "CDC", "AEA"],
        {
            A: "create:andesite_alloy",
            B: "create:shaft",
            C: "#forge:glass",
            D: "create:andesite_casing",
            E: "minecraft:iron_block",
        },
    );
    // Alt Recipe using press
    event.shaped(
        "create_mechanical_extruder:mechanical_extruder",
        ["A A", "BCB", "A A"],
        {
            A: "create:andesite_alloy",
            B: "#forge:glass",
            C: "create:mechanical_press",
        },
    );

    // Copper tools
    event.shaped(global.items.copper_pickaxe, ["AAA", " B ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });
    event.shaped(global.items.copper_axe, ["AA ", "AB ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });
    event.shaped(global.items.copper_shovel, [" A ", " B ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });
    event.shaped(global.items.copper_sword, [" A ", " A ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });
    event.shaped(global.items.copper_hoe, ["AA ", " B ", " B "], {
        A: "#forge:ingots/copper",
        B: "minecraft:stick",
    });

    // metallurgy
    event
        .shaped("createmetallurgy:casting_basin", ["A A", "A A", "AAA"], {
            A: "createdeco:cast_iron_ingot",
        })
        .id("createmetallurgy:casting_basin");
    event
        .shaped("createmetallurgy:casting_table", ["AAA", "B B", "B B"], {
            A: "createdeco:cast_iron_sheet",
            B: "createdeco:cast_iron_ingot",
        })
        .id("createmetallurgy:casting_table");

    event.replaceInput(
        [
            {
                output: "createmetallurgy:foundry_top",
            },
            {
                output: "createmetallurgy:foundry_basin",
            },
            {
                output: "createmetallurgy:glassed_alloyer_top",
            },
        ],
        "create:andesite_alloy",
        "createdeco:cast_iron_ingot",
    );

    // Electrolyzer
    event.shaped(global.items.copper_coil_block, ["SSS", "SCS", "SSS"], {
        S: "createaddition:copper_spool",
        C: "create:copper_casing",
    });

    event.shaped(
        Item.of(
            "custommachinery:custom_machine_item",
            '{machine:"grand_expanse:electrolyzer"}',
        ),
        ["IGI", "ICI", "IEI"],
        {
            I: "createaddition:iron_rod",
            G: "create:gearbox_tier_0",
            C: global.items.copper_coil_block,
            E: "thermal:iron_gear",
        },
    );

    function SmeltAndBlast(output, input) {
        event.smelting(output, input);
        event.blasting(output, input);
    }
});
