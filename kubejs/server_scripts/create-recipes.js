const tierData = [
    //Tier 0
    {
        affix: "_tier_0",
        casing: "create:andesite_casing",
        material: "minecraft:planks",
        fluid: global.fluids.andesite_mixture,
        RPM: 64,
    },
    //Tier 1
    {
        affix: "_tier_1",
        casing: "create:copper_casing",
        material: "create:copper_sheet",
        fluid: "tconstruct:molten_copper",
        RPM: 128,
    },
    //Tier 2
    {
        affix: "_tier_2",
        casing: "create:brass_casing",
        material: "create:brass_sheet",
        fluid: "tconstruct:molten_brass",
        RPM: 256,
    },
    //Tier 3
    {
        affix: "_tier_3",
        casing: "create:steel_casing" /*TODO need steel casing (create)*/,
        material: "ad_astra:steel_plate" /*TODO need steel sheet instead*/,
        fluid: "tconstruct:molten_steel",
        RPM: 512,
    },
];

const kinetics = {
    shaft: "create:shaft",
    cogwheel: "create:cogwheel",
    large_cogwheel: "create:large_cogwheel",
    gearbox: "create:gearbox",
    vertical_gearbox: "create:vertical_gearbox",
    gearshift: "create:gearshift",
    encased_chain_drive: "create:encased_chain_drive",
    clutch: "create:clutch",
    adjustable_chain_gearshift: "create:adjustable_chain_gearshift",
};

ServerEvents.recipes((event) => {
    // Mixing Recipes.
    // rubber from latex via mixing gives 1 extra rubber compared to handcrafting
    event.recipes.create.mixing(
        "thermal:rubber",
        Fluid.of("thermal:latex", FluidAmounts.BOTTLE)
    );
    event.recipes.create
        .mixing("thermal:rosin", Fluid.of("thermal:resin", FluidAmounts.BOTTLE))
        .heated();

    event.recipes.create.mixing(
        Fluid.of(global.fluids.andesite_mixture, FluidAmounts.INGOT),
        ["minecraft:andesite", "create:zinc_nugget", "minecraft:clay_ball"]
    );

    event.recipes.create.mixing("ae2:fluix_crystal", [
        Fluid.of("thermal:redstone", FluidAmounts.INGOT * 3),
        Fluid.of(global.fluids.fluix_shimmer, FluidAmounts.INGOT * 4),
        "ae2:charged_certus_quartz_crystal",
    ]);

    event.recipes.create
        .compacting("createdeco:cast_iron_ingot", [
            "minecraft:iron_ingot",
            "#forge:dusts/coal",
        ])
        .heated()
        .id("minecraft:compacting/cast_iron_ingot");

    event.recipes.create.crushing("thermal:sulfur_dust", "thermal:sulfur");
    event.recipes.create.milling("thermal:sulfur_dust", "thermal:sulfur");

    event.recipes.create.mixing("minecraft:glowstone_dust", [
        "thermal:sulfur_dust",
        "minecraft:redstone",
    ]);

    // Sturdy hull
    event.recipes.create.compacting(global.items.sturdy_hull, [
        Item.of("create:sturdy_sheet", 4),
    ]);

    // early game obsidian dust recipe
    event.recipes.create.milling(
        ["create:powdered_obsidian"],
        "minecraft:obsidian"
    );
    // early game quartz
    event.recipes.create.milling(
        [Item.of("minecraft:quartz").withChance(0.1)],
        "minecraft:diorite"
    );

    // Replaces milling gravel for milling into sand.
    event.recipes.create
        .milling(
            [Item.of("minecraft:sand").withChance(0.5)],
            "minecraft:gravel"
        )
        .id("create:milling/gravel");

    // Mill ore to dust for chance for extra
    Ingredient.of("#forge:raw_materials").itemIds.forEach((item) => {
        const material = item.split("_").pop();
        {
            const output = AlmostUnified.getPreferredItemForTag(
                `forge:dusts/${material}`
            );
            if (output.isEmpty()) {
                return;
            }
            //TODO NO MAGIC number move to config or something jeeeeez
            event.recipes.create.milling(
                [output, output.withChance(0.2)],
                item
            );
        }
        {
            const output = AlmostUnified.getPreferredItemForTag(
                `forge:nuggets/${material}`
            );
            if (output.isEmpty()) {
                return;
            }
            event.recipes.create
                .crushing(
                    [
                        output.withCount(6).withChance(0.5),
                        Item.of("create:experience_nugget").withChance(0.1),
                    ],
                    Item.of(`persistent_ores:${material}_cluster`)
                )
                .id(`grand_expanse:${material}_cluster_crushing`);

            const impureModule = `persistent_ores:${material}_module_impure`;
            event.recipes.create
                .sequenced_assembly(
                    [impureModule],
                    "scannable:blank_module",
                    [
                        event.recipes.create.deploying(
                            "scannable:blank_module",
                            [
                                "scannable:blank_module",
                                "#forge:raw_materials/" + material,
                            ]
                        ),
                        event.recipes.create.filling("scannable:blank_module", [
                            "scannable:blank_module",
                            Fluid.of(
                                `tconstruct:molten_${material}`,
                                FluidAmounts.INGOT
                            ),
                        ]),
                    ],
                    "scannable:blank_module",
                    16
                )
                .id(`grand_expanse:${material}_impure_module_assembly`);
        }
    });

    //Tiered create stuff
    for (let tier = 1; tier < tierData.length; tier++) {
        let upperData = tierData[tier];
        let lowerData = tierData[tier - 1];

        cast(
            kinetics.shaft + upperData.affix,
            kinetics.shaft + lowerData.affix,
            upperData.fluid,
            FluidAmounts.INGOT / 2
        );
        cast(
            kinetics.cogwheel + upperData.affix,
            kinetics.cogwheel + lowerData.affix,
            upperData.fluid,
            FluidAmounts.INGOT
        );
        cast(
            kinetics.large_cogwheel + upperData.affix,
            kinetics.large_cogwheel + lowerData.affix,
            upperData.fluid,
            FluidAmounts.INGOT * 2
        );

        event.shaped(kinetics.gearbox + upperData.affix, ["WKW", "WCW"], {
            W: kinetics.cogwheel + upperData.affix,
            K: kinetics.gearbox + lowerData.affix,
            C: upperData.casing,
        });
        event.shaped(
            kinetics.encased_chain_drive + upperData.affix,
            [" C ", "MKM", " M "],
            {
                M: upperData.material,
                K: kinetics.encased_chain_drive + lowerData.affix,
                C: upperData.casing,
            }
        );
        event.shapeless(kinetics.clutch + upperData.affix, [
            kinetics.clutch + lowerData.affix,
            kinetics.shaft + upperData.affix,
            upperData.casing,
        ]);
        event.shapeless(kinetics.gearshift + upperData.affix, [
            kinetics.gearshift + lowerData.affix,
            kinetics.cogwheel + upperData.affix,
            upperData.casing,
        ]);
        event.shapeless(kinetics.vertical_gearbox + upperData.affix, [
            kinetics.gearbox + upperData.affix,
        ]);
        event.shapeless(kinetics.gearbox + upperData.affix, [
            kinetics.vertical_gearbox + upperData.affix,
        ]);
        event.shapeless(kinetics.adjustable_chain_gearshift + upperData.affix, [
            kinetics.encased_chain_drive + upperData.affix,
            "create:electron_tube",
        ]);
    }

    function cast(result, input, fluid, amount) {
        event.custom({
            type: "tconstruct:casting_table",
            cast: {
                item: input,
            },
            fluid: {
                tag: fluid,
                amount: amount,
            },
            result: result,
            cast_consumed: true,
            cooling_time: 120,
        });
    }

    // Rolling
    event.custom({
        type: "createaddition:rolling",
        input: {
            tag: "forge:ingots/bronze",
        },
        result: {
            item: "unify:bronze_rod",
            count: 2,
        },
    });

    event
        .custom({
            type: "createaddition:rolling",
            input: {
                item: "ae2:certus_quartz_crystal",
            },
            result: {
                item: "ae2:quartz_fiber",
            },
        })
        .id("ae2:network/parts/quartz_fiber_part");

    //Chapter 2 Sequenced Assemblies

    event.recipes.create
        .sequenced_assembly(["create:electron_tube"], "create:iron_sheet", [
            event.recipes.createDeploying(
                global.items.incomplete_electron_tube,
                [global.items.incomplete_electron_tube, "#forge:glass"]
            ),
            event.recipes.createDeploying(
                global.items.incomplete_electron_tube,
                [
                    global.items.incomplete_electron_tube,
                    "create:polished_rose_quartz",
                ]
            ),
            event.recipes.createFilling(global.items.incomplete_electron_tube, [
                global.items.incomplete_electron_tube,
                Fluid.of("tconstruct:molten_rose_gold", FluidAmounts.INGOT),
            ]),
        ])
        .transitionalItem(global.items.incomplete_electron_tube)
        .loops(1)
        .id("create:crafting/materials/electron_tube");

    event.recipes.create
        .sequenced_assembly(
            ["create:copper_casing"],
            "create:andesite_casing",
            [
                event.recipes.createDeploying("create:andesite_casing", [
                    "create:andesite_casing",
                    "#forge:plates/copper",
                ]),
                event.recipes.createDeploying("create:andesite_casing", [
                    "create:andesite_casing",
                    "thermal:cured_rubber",
                ]),
            ]
        )
        .transitionalItem("create:andesite_casing")
        .loops(3);

    const brass_casing_inter = "create:copper_casing";
    event.recipes.create
        .sequenced_assembly(["create:brass_casing"], brass_casing_inter, [
            event.recipes.create.filling(brass_casing_inter, [
                brass_casing_inter,
                Fluid.of("tconstruct:molten_brass", FluidAmounts.INGOT),
            ]),
            event.recipes.create.pressing(
                brass_casing_inter,
                brass_casing_inter
            ),
        ])
        .transitionalItem(brass_casing_inter)
        .loops(3);

    const train_casing_inter = "create:brass_casing";
    event.recipes.create
        .sequenced_assembly(["create:railway_casing"], train_casing_inter, [
            event.recipes.create.deploying(train_casing_inter, [
                train_casing_inter,
                "create:sturdy_sheet",
            ]),
            event.recipes.create.pressing(
                train_casing_inter,
                train_casing_inter
            ),
            event.recipes.create.deploying(train_casing_inter, [
                train_casing_inter,
                "create:iron_sheet",
            ]),
            event.recipes.create.pressing(
                train_casing_inter,
                train_casing_inter
            ),
        ])
        .transitionalItem(train_casing_inter)
        .loops(2);

    const precision_mechanism_inter = "create:incomplete_precision_mechanism";
    event.recipes.create
        .sequenced_assembly(
            [
                Item.of("create:precision_mechanism").withChance(0.8),
                Item.of("#forge:plates/constantan").withChance(0.09),
                Item.of("create:andesite_alloy").withChance(0.05),
                Item.of("create:cogwheel_tier_2").withChance(0.03),
                Item.of("create:shaft_tier_2").withChance(0.02),
                Item.of("minecraft:clock").withChance(0.01),
            ],
            "#forge:plates/constantan",
            [
                event.recipes.create.deploying(precision_mechanism_inter, [
                    precision_mechanism_inter,
                    "create:cogwheel_tier_2",
                ]),
                event.recipes.create.deploying(precision_mechanism_inter, [
                    precision_mechanism_inter,
                    "create:cogwheel_tier_2",
                ]),
                event.recipes.create.deploying(precision_mechanism_inter, [
                    precision_mechanism_inter,
                    "#forge:gears/invar",
                ]),
            ]
        )
        .transitionalItem(precision_mechanism_inter)
        .loops(5)
        .id("create:sequenced_assembly/precision_mechanism");

    //Chapter 3 Sequenced Assemblies

    event.recipes.create
        .sequenced_assembly(
            [Item.of("createaddition:capacitor")],
            "create:electron_tube",
            [
                event.recipes.create.deploying("create:electron_tube", [
                    "create:electron_tube",
                    "#forge:plates/nickel",
                ]),
                event.recipes.create.deploying("create:electron_tube", [
                    "create:electron_tube",
                    "#forge:wires/electrum",
                ]),
                event.recipes.create.deploying("create:electron_tube", [
                    "create:electron_tube",
                    "#forge:wires/electrum",
                ]),
                event.recipes.create.deploying("create:electron_tube", [
                    "create:electron_tube",
                    "minecraft:paper",
                ]),
                event.recipes.create.deploying("create:electron_tube", [
                    "create:electron_tube",
                    "createaddition:copper_spool",
                ]),
            ]
        )
        .transitionalItem("create:electron_tube")
        .loops(1)
        .id("createaddition:crafting/capacitor_1");

    //There's 2 for some reason, so I delete the other
    event.remove({ id: "createaddition:crafting/capacitor_2" });

    //Applied Energistics
    event.recipes.create
        .mixing(Fluid.of(global.fluids.molten_silicon, FluidAmounts.INGOT), [
            "ae2:certus_quartz_dust",
            "minecraft:sand",
        ])
        .heated();

    event.recipes.create
        .sequenced_assembly(
            [Item.of("ae2:printed_silicon")],
            "#forge:plates/silicon",
            [
                event.recipes.create.cutting(
                    "ae2:printed_silicon",
                    "ae2:printed_silicon"
                ),
                event.recipes.create
                    .deploying("ae2:printed_silicon", [
                        "ae2:printed_silicon",
                        "ae2:silicon_press",
                    ])
                    .keepHeldItem(),
                event.recipes.create.pressing(
                    "ae2:printed_silicon",
                    "ae2:printed_silicon"
                ),
            ]
        )
        .transitionalItem("mmt:silicon_plate")
        .loops(1)
        .id("ae2:inscriber/silicon_print");

    event.recipes.create
        .sequenced_assembly(
            [Item.of("ae2:printed_calculation_processor")],
            "ae2:certus_quartz_crystal",
            [
                event.recipes.create.cutting(
                    "ae2:printed_calculation_processor",
                    "ae2:printed_calculation_processor"
                ),
                event.recipes.create
                    .deploying("ae2:printed_calculation_processor", [
                        "ae2:printed_calculation_processor",
                        "ae2:calculation_processor_press",
                    ])
                    .keepHeldItem(),
                event.recipes.create.pressing(
                    "ae2:printed_calculation_processor",
                    "ae2:printed_calculation_processor"
                ),
            ]
        )
        .transitionalItem("ae2:certus_quartz_crystal")
        .loops(1)
        .id("ae2:inscriber/calculation_processor_print");

    event.recipes.create
        .sequenced_assembly(
            [Item.of("ae2:printed_logic_processor")],
            "#forge:plates/gold",
            [
                event.recipes.create.cutting(
                    "minecraft:gold_ingot",
                    "minecraft:gold_ingot"
                ),
                event.recipes.create
                    .deploying("minecraft:gold_ingot", [
                        "minecraft:gold_ingot",
                        "ae2:logic_processor_press",
                    ])
                    .keepHeldItem(),
                event.recipes.create.pressing(
                    "minecraft:gold_ingot",
                    "minecraft:gold_ingot"
                ),
            ]
        )
        .transitionalItem("minecraft:gold_ingot")
        .loops(1)
        .id("ae2:inscriber/logic_processor_print");

    event.recipes.create
        .sequenced_assembly(
            [Item.of("ae2:printed_engineering_processor")],
            "#forge:gems/diamond",
            [
                event.recipes.create.cutting(
                    "minecraft:diamond",
                    "minecraft:diamond"
                ),
                event.recipes.create
                    .deploying("minecraft:diamond", [
                        "minecraft:diamond",
                        "ae2:engineering_processor_press",
                    ])
                    .keepHeldItem(),
                event.recipes.create.pressing(
                    "minecraft:diamond",
                    "minecraft:diamond"
                ),
            ]
        )
        .transitionalItem("minecraft:diamond")
        .loops(1)
        .id("ae2:inscriber/engineering_processor_print");

    event.recipes.create
        .sequenced_assembly(
            [Item.of("ae2:calculation_processor")],
            "ae2:printed_silicon",
            [
                event.recipes.create.deploying(
                    "ae2:printed_calculation_processor",
                    [
                        "ae2:printed_calculation_processor",
                        "ae2:printed_calculation_processor",
                    ]
                ),
                event.recipes.create.deploying(
                    "ae2:printed_calculation_processor",
                    ["ae2:printed_calculation_processor", "minecraft:redstone"]
                ),
                event.recipes.create.pressing(
                    "ae2:printed_calculation_processor",
                    "ae2:printed_calculation_processor"
                ),
            ]
        )
        .transitionalItem("printed_calculation_processor")
        .loops(1)
        .id("ae2:inscriber/calculation_processor");

    event.recipes.create
        .sequenced_assembly(
            [Item.of("ae2:logic_processor")],
            "ae2:printed_silicon",
            [
                event.recipes.create.deploying("ae2:printed_logic_processor", [
                    "ae2:printed_logic_processor",
                    "ae2:printed_logic_processor",
                ]),
                event.recipes.create.deploying("ae2:printed_logic_processor", [
                    "ae2:printed_logic_processor",
                    "minecraft:redstone",
                ]),
                event.recipes.create.pressing(
                    "ae2:printed_logic_processor",
                    "ae2:printed_logic_processor"
                ),
            ]
        )
        .transitionalItem("printed_logic_processor")
        .loops(1)
        .id("ae2:inscriber/logic_processor");

    event.recipes.create
        .sequenced_assembly(
            [Item.of("ae2:engineering_processor")],
            "ae2:printed_silicon",
            [
                event.recipes.create.deploying(
                    "ae2:printed_engineering_processor",
                    [
                        "ae2:printed_engineering_processor",
                        "ae2:printed_engineering_processor",
                    ]
                ),
                event.recipes.create.deploying(
                    "ae2:printed_engineering_processor",
                    ["ae2:printed_engineering_processor", "minecraft:redstone"]
                ),
                event.recipes.create.pressing(
                    "ae2:printed_engineering_processor",
                    "ae2:printed_engineering_processor"
                ),
            ]
        )
        .transitionalItem("printed_engineering_processor")
        .loops(1)
        .id("ae2:inscriber/engineering_processor");

    event.recipes.create
        .sequenced_assembly(
            [Item.of("ae2:fluix_glass_cable", 4)],
            "ae2:quartz_fiber",
            [
                event.recipes.create.deploying("ae2:quartz_fiber", [
                    "ae2:quartz_fiber",
                    "ae2:quartz_glass",
                ]),
                event.recipes.create.filling("ae2:quartz_fiber", [
                    "ae2:quartz_fiber",
                    Fluid.of(global.fluids.fluix_shimmer, FluidAmounts.INGOT),
                ]),
                event.recipes.create.deploying("ae2:quartz_fiber", [
                    "ae2:quartz_fiber",
                    "ae2:fluix_crystal",
                ]),
            ]
        )
        .transitionalItem("ae2:quartz_fiber")
        .loops(1)
        .id("ae2:network/cables/glass_fluix");

    event.recipes.create
        .mechanical_crafting(
            "ae2:controller",
            [
                // prettier-ignore
                " FGF ",
                "FSQSF",
                "GELCG",
                "FSQSF",
                " FGF ",
            ],
            {
                F: "ae2:fluix_dust",
                G: "#forge:glass",
                Q: "ae2:certus_quartz_crystal",
                S: "ae2:smooth_sky_stone_block",
                E: "ae2:engineering_processor",
                C: "ae2:calculation_processor",
                L: "mmt:lunium_nova_ingot",
            }
        )
        .id("ae2:network/blocks/controller");

    //Biofuel
    event.replaceInput(
        { id: "createaddition:mixing/bioethanol" },
        "create:cinder_flour",
        "create:wheat_flour"
    );

    //Mechanical Crafting
    event.recipes.create.mechanical_crafting(
        "persistent_ores:persistent_drill_block",
        [
            // prettier-ignore
            "  S  ",
            "  S  ",
            " BLB ",
            " EAE ",
            "IPGPI",
            "I D I",
            "I   I",
        ],
        {
            S: "create:shaft_tier_2",
            B: "create:brass_casing",
            E: "create:electron_tube",
            A: "createaddition:modular_accumulator",
            P: "create:precision_mechanism",
            I: "#forge:plates/invar",
            D: "create:mechanical_drill",
            L: "mmt:lunium_nova_plate",
            G: "mmt:lunium_nova_gear",
        }
    );

    event.recipes.create.mechanical_crafting(
        global.items.low_density_structure,
        [
            // prettier-ignore
            "SRRS",
            "RI R",
            "R IR",
            "SRRS",
        ],
        {
            S: "#forge:plates/copper",
            R: "#forge:rods/brass",
            I: "#forge:ingots/invar",
        }
    );

    event.recipes.create
        .mechanical_crafting(
            "create_power_loader:andesite_chunk_loader",
            [
                // prettier-ignore
                "GGGGG",
                "GIIIG",
                "GILIG",
                "ANTNA",
            ],
            {
                G: "#forge:glass",
                L: "mmt:lunium_nova_ingot",
                A: "create:andesite_casing",
                T: "mmt:lunium_nova_gear",
                I: "minecraft:iron_ingot",
                N: "create:andesite_alloy",
            }
        )
        .id("create:conversion_0");

    //Brass tier stuff
    event.recipes.create
        .mechanical_crafting(
            Item.of("create:smart_chute"),
            [" S ", "SLS", "ECE"],
            {
                S: "create:brass_sheet",
                C: "create:electron_tube",
                L: "create:chute",
                E: "minecraft:redstone",
            }
        )
        .id("create:crafting/kinetics/smart_chute");
    event.recipes.create
        .mechanical_crafting(
            Item.of("create:brass_tunnel", 2),
            [" S ", "BCB", "RER"],
            {
                S: "create:brass_sheet",
                B: "create:brass_ingot",
                C: "create:electron_tube",
                R: "thermal:cured_rubber",
                E: "minecraft:redstone",
            }
        )
        .id("create:crafting/logistics/brass_tunnel");
    event.recipes.create
        .mechanical_crafting(
            Item.of("create:brass_funnel", 2),
            [" C ", "EBE", "SRS"],
            {
                S: "create:brass_sheet",
                B: "create:brass_ingot",
                C: "create:electron_tube",
                R: "thermal:cured_rubber",
                E: "minecraft:redstone",
            }
        )
        .id("create:crafting/logistics/brass_funnel");
    event.recipes.create
        .mechanical_crafting(
            "createsifter:brass_sifter",
            [
                // prettier-ignore
                "SSS",
                "BAB",
                "BGB",
                "SCS",
            ],
            {
                S: "create:brass_sheet",
                B: "create:brass_ingot",
                A: "createsifter:sifter",
                G: "create:cogwheel_tier_2",
                C: "create:brass_casing",
            }
        )
        .id("createsifter:brass_sifter");

    event.recipes.create
        .mechanical_crafting(
            "ad_astra:cryo_freezer",
            [
                // prettier-ignore
                " C ",
                " C ",
                "LRL",
                "AIT",
                "LRL",
            ],
            {
                A: "createaddition:modular_accumulator",
                T: "ad_astra:desh_tank",
                C: "#forge:storage_blocks/constantan",
                R: "#forge:rods/lunium_nova",
                I: "thermal:ice_charge",
                L: global.items.low_density_structure,
            }
        )
        .id("ad_astra:recipes/cryo_freezer");

    // cry fuel recipe for tier 2 rockets
    //
    event.recipes.create
        .mixing(
            Fluid.of(global.fluids.cryo_solution, FluidAmounts.NUGGET * 3),
            [
                Fluid.of("mekanism:oxygen", FluidAmounts.NUGGET * 3),
                Fluid.of("mekanism:hydrogen", FluidAmounts.NUGGET * 3),
                Item.of("thermal:blizz_powder"),
            ]
        )
        .heated();

    // then tesla coil it
    event.custom({
        type: "createaddition:charging",
        input: {
            item: global.items.cryo_crystal,
            count: 1,
        },
        result: {
            item: global.items.charged_cryo_crystal,
            count: 1,
        },
        energy: 1000,
    });

    event.custom({
        type: "ad_astra:cryo_fuel_conversion",
        input: {
            item: global.items.charged_cryo_crystal,
        },
        output: "ad_astra:cryo_fuel",
        conversion_ratio: 0.025,
    });
});
