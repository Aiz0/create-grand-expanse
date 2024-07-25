ServerEvents.recipes((event) => {
    // andesite compound recipe from create:astral
    event.shaped(
        Item.of(global.items.andesite_compound, 1),
        ["AAA", "BBB", "CCC"],
        {
            A: "minecraft:andesite",
            B: "create:zinc_nugget",
            C: "minecraft:clay_ball",
        }
    );

    // Mechanical Saw now uses thermal saw blade
    event
        .shaped(Item.of("create:mechanical_saw", 1), ["A  ", "BC "], {
            A: "thermal:saw_blade",
            B: "create:andesite_casing",
            C: "create:shaft_tier_0",
        })
        .id("create:crafting/kinetics/mechanical_saw");

    // Mechanical Drill now uses thermal drill head
    event
        .shaped(Item.of("create:mechanical_drill", 1), ["G", "D", "C"], {
            G: "minecraft:diamond",
            D: "thermal:drill_head",
            C: "create:andesite_casing",
        })
        .id("create:crafting/kinetics/mechanical_drill");

    // Empty Blaze Burner.
    // Magma blocks instead of netherrack because it's easier to find in the overworld.
    event
        .shaped(
            Item.of("create:empty_blaze_burner", 1),
            ["AAA", "ABA", "CCC"],
            {
                A: "#forge:rods/iron",
                B: "minecraft:magma_block",
                C: "create:iron_sheet",
            }
        )
        .id("create:crafting/kinetics/empty_blaze_burner");

    event
        .shaped(Item.of("create:fluid_tank", 1), ["ABA", "B B", "ABA"], {
            A: "#forge:plates/copper",
            B: "#forge:glass",
        })
        .id("create:crafting/kinetics/fluid_tank");

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
        }
    );

    // Fluid pipe needs rubber obviously
    event.replaceInput(
        { output: "create:fluid_pipe" },
        "#forge:ingots/copper",
        "thermal:cured_rubber"
    );

    // belts use rubber tooo
    event
        .shaped("create:belt_connector", ["KRK", "KRK"], {
            K: "minecraft:dried_kelp",
            R: "thermal:cured_rubber",
        })
        .id("create:crafting/kinetics/belt_connector");

    // Mechanical Extruder recipes
    // Press recipe surrounded by glass and andesite alloy
    event.shaped(
        "create_mechanical_extruder:mechanical_extruder",
        ["ABA", "CDC", "AEA"],
        {
            A: "create:andesite_alloy",
            B: "create:shaft_tier_0",
            C: "#forge:glass",
            D: "create:andesite_casing",
            E: "minecraft:iron_block",
        }
    );
    // Alt Recipe using press
    event.shaped(
        "create_mechanical_extruder:mechanical_extruder",
        ["A A", "BCB", "A A"],
        {
            A: "create:andesite_alloy",
            B: "#forge:glass",
            C: "create:mechanical_press",
        }
    );

    // Create sifter Meshes
    sifterMesh("createsifter:andesite_mesh", "createdeco:andesite_mesh_fence");
    sifterMesh("createsifter:zinc_mesh", "createdeco:zinc_mesh_fence");
    sifterMesh("createsifter:brass_mesh", "createdeco:brass_mesh_fence");

    function sifterMesh(mesh, input) {
        event
            .shaped(mesh, ["SMS", "MMM", "SMS"], {
                S: "minecraft:stick",
                M: input,
            })
            .id(mesh);
    }

    // tinkers construct
    event
        .shaped("tconstruct:seared_basin", ["A A", "A A", "AAA"], {
            A: "createdeco:cast_iron_ingot",
        })
        .id("tconstruct:smeltery/seared/basin");
    event
        .shaped("tconstruct:seared_table", ["AAA", "B B", "B B"], {
            A: "createdeco:cast_iron_sheet",
            B: "createdeco:cast_iron_ingot",
        })
        .id("tconstruct:smeltery/seared/table");

    // we don't want copper cans because tin can do better
    event.replaceInput(
        { output: "tconstruct:copper_can" },
        "minecraft:copper_ingot",
        "#forge:ingots/tin"
    );

    // Electrolyzer
    event.shaped(global.items.copper_coil_block, ["SSS", "SCS", "SSS"], {
        S: "createaddition:copper_spool",
        C: "create:copper_casing",
    });

    event.shaped(global.items.electrolyzer, ["ISI", "TCT", "IEI"], {
        I: "#forge:plates/cast_iron",
        S: "create:shaft_tier_0",
        T: "create:electron_tube",
        C: global.items.copper_coil_block,
        E: "thermal:copper_gear",
    });

    // Ad Astra Common

    event
        .shaped("ad_astra:rocket_fin", [" S ", "SSS", "S S"], {
            S: "create:sturdy_sheet",
        })
        .id("ad_astra:recipes/rocket_fin");

    event.shaped(global.items.rocket_hull, ["HSH", "HGH", "HSH"], {
        H: global.items.sturdy_hull,
        S: "create:sturdy_sheet",
        G: "#forge:glass",
    });

    event.replaceInput(
        [
            { output: "ad_astra:launch_pad" },
            { output: "ad_astra:rocket_nose_cone" },
        ],
        "ad_astra:steel_plate",
        "create:sturdy_sheet"
    );

    // Ad Astra Tier 1

    event
        .shaped("ad_astra:steel_engine", ["SPS", "SPS", "BVB"], {
            S: "create:sturdy_sheet",
            P: "create:fluid_pipe",
            B: "thermal:bronze_gear",
            V: "create:fluid_valve",
        })
        .id("ad_astra:recipes/steel_engine");

    event
        .shaped("ad_astra:steel_tank", ["SSG", "STP", "SSG"], {
            S: "create:sturdy_sheet",
            G: "thermal:bronze_gear",
            T: "create:fluid_tank",
            P: "create:mechanical_pump",
        })
        .id("ad_astra:recipes/steel_tank");

    event
        .shaped("ad_astra:tier_1_rocket", [" C ", "THT", "FEF"], {
            C: "ad_astra:rocket_nose_cone",
            T: "ad_astra:steel_tank",
            H: global.items.rocket_hull,
            F: "ad_astra:rocket_fin",
            E: "ad_astra:steel_engine",
        })
        .id("ad_astra:nasa_workbench/tier_1_rocket");

    // Ad Astra Tier 2

    event
        .shaped("ad_astra:desh_engine", ["SPS", "SPS", "BVB"], {
            S: global.items.low_density_structure,
            P: "create:fluid_pipe",
            B: "create:precision_mechanism",
            V: "create:smart_fluid_pipe",
        })
        .id("ad_astra:recipes/desh_engine");

    event
        .shaped("ad_astra:desh_tank", ["SSG", "STP", "SSG"], {
            S: "#forge:plates/brass",
            G: "#forge:gears/constantan",
            T: "create:fluid_tank",
            P: "create:mechanical_pump",
        })
        .id("ad_astra:recipes/desh_tank");

    event.recipes.create
        .mechanical_crafting(
            "ad_astra:tier_2_rocket",
            [
                // prettier-ignore
                "  C  ",
                " HRH ",
                " HRH ",
                " HAH ",
                "HTLTH",
                "FFEFF",
            ],
            {
                C: "ad_astra:rocket_nose_cone",
                H: global.items.low_density_structure,
                R: global.items.rocket_hull,
                A: "createaddition:modular_accumulator",
                T: "ad_astra:desh_tank",
                L: "thermal:fluid_cell_frame",
                F: "ad_astra:rocket_fin",
                E: "ad_astra:desh_engine",
            }
        )
        .id("ad_astra:nasa_workbench/tier_2_rocket");

    // Space Suit
    event
        .shaped("ad_astra:space_helmet", ["WRW", "RDR", "WRW"], {
            W: "minecraft:white_wool",
            R: "thermal:cured_rubber",
            D: "create:copper_diving_helmet",
        })
        .id("ad_astra:recipes/space_helmet");
    event
        .shaped("ad_astra:space_suit", ["WRW", "TCT", "WRW"], {
            W: "minecraft:white_wool",
            R: "thermal:cured_rubber",
            T: "ad_astra:oxygen_tank",
            C: "create:copper_backtank",
        })
        .id("ad_astra:recipes/space_suit");
    event
        .shaped("ad_astra:space_pants", ["WRW", "R R", "W W"], {
            W: "minecraft:white_wool",
            R: "thermal:cured_rubber",
        })
        .id("ad_astra:recipes/space_pants");
    event
        .shaped("ad_astra:space_boots", ["WRW", "RDR", "WRW"], {
            W: "minecraft:white_wool",
            R: "thermal:cured_rubber",
            D: "create:copper_diving_boots",
        })
        .id("ad_astra:recipes/space_boots");

    // Copper Backtank now uses oxygen tanks and oxygen gear
    event
        .shaped("create:copper_backtank", ["ABA", "CDC", "AEA"], {
            A: "#forge:plates/copper",
            B: "create:andesite_alloy",
            C: "ad_astra:oxygen_tank",
            D: "#forge:storage_blocks/copper",
            E: "ad_astra:oxygen_gear",
        })
        .id("create:crafting/appliances/copper_backtank");

    // Should be possible to craft early game.
    event.replaceInput(
        [
            { output: "ad_astra:oxygen_tank" },
            { output: "ad_astra:oxygen_gear" },
        ],
        "ad_astra:steel_plate",
        "#forge:plates/copper"
    );

    // oxygen loader
    event
        .shaped("ad_astra:oxygen_loader", ["IFI", "OTO", "IRI"], {
            I: "#forge:plates/cast_iron",
            F: "create:propeller",
            O: "ad_astra:oxygen_tank",
            T: "create:electron_tube",
            R: "minecraft:redstone_block",
        })
        .id("ad_astra:recipes/oxygen_loader");

    // Flopper recipe
    event
        .shaped("flopper:flopper", ["A A", "ABA", " A "], {
            A: "#forge:plates/copper",
            B: "create:copper_casing",
        })
        .id("flopper:recipes/flopper");
    // Tom's Storage
    event
        .shaped("toms_storage:ts.storage_terminal", ["SRS", "CGC", "SOS"], {
            S: "create:golden_sheet",
            R: "minecraft:redstone_block",
            C: "createaddition:copper_spool",
            G: "#forge:glass",
            O: "toms_storage:ts.open_crate",
        })
        .id("toms_storage:storage_terminal");

    event
        .shaped("toms_storage:ts.inventory_cable", [" R ", "TTT", " R "], {
            R: "thermal:cured_rubber",
            T: "thermal:tin_ingot",
        })
        .id("toms_storage:inventory_cable");

    event
        .shaped(
            "toms_storage:ts.inventory_cable_connector",
            ["RP ", "OTT", "RP "],
            {
                R: "thermal:cured_rubber",
                P: "thermal:tin_plate",
                O: "toms_storage:ts.open_crate",
                T: "thermal:tin_ingot",
            }
        )
        .id("toms_storage:inventory_cable_connector");

    event
        .shaped("toms_storage:ts.inventory_connector", ["TST", "SRS", "TST"], {
            T: "thermal:tin_ingot",
            S: "create:golden_sheet",
            R: "minecraft:redstone_block",
        })
        .id("toms_storage:inventory_connector");

    event
        .shaped("toms_storage:ts.crafting_terminal", ["PCP", "ETE", "PCP"], {
            P: "thermal:tin_plate",
            C: "createaddition:copper_spool",
            E: "create:electron_tube",
            T: "toms_storage:ts.storage_terminal",
        })
        .id("toms_storage:crafting_terminal");

    // Bronze hand
    event.replaceInput(
        { output: "create:brass_hand" },
        "create:brass_sheet",
        "#forge:plates/bronze"
    );
    // electron tube can only be crafted by deployer. that would be dependancy loop
    event.replaceInput(
        { output: "create:deployer" },
        "create:electron_tube",
        "create:shaft_tier_0"
    );
    // Fumo
    event.shaped(global.items.fumo_base, ["WWW", "WOW", "WWW"], {
        W: "#minecraft:wool",
        O: "minecraft:obsidian",
    });

    //Scanner
    event
        .shaped("scannable:scanner", [" BL", "BCS", " BR"], {
            B: "create:brass_sheet",
            L: "create:redstone_link",
            C: "createaddition:connector",
            S: "createaddition:copper_spool",
            R: "thermal:cured_rubber",
        })
        .id("scannable:scanner");
    event
        .shaped("scannable:blank_module", ["RBR", "RDR", " B "], {
            B: "create:brass_sheet",
            R: "thermal:cured_rubber",
            D: "minecraft:redstone",
        })
        .id("scannable:blank_module");
});
