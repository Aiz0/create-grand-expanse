ServerEvents.recipes((event) => {
    // All recipes using create should be done in here.

    // Mixing Recipes.
    // Will be replaced with helper function later.
    event.recipes.create.mixing(
        Fluid.of(global.fluids.molten_rose_gold, FluidAmounts.NUGGET),
        [
            {
                fluid: "createmetallurgy:molten_gold",
                amount: FluidAmounts.NUGGET,
            },
            {
                fluid: "createmetallurgy:molten_copper",
                amount: FluidAmounts.NUGGET,
            },
        ],
    );
    event.recipes.create
        .mixing(
            Fluid.of(global.fluids.molten_bronze, FluidAmounts.NUGGET * 1.5),
            [
                {
                    fluid: global.fluids.molten_tin,
                    amount: FluidAmounts.NUGGET,
                },
                {
                    fluid: "createmetallurgy:molten_copper",
                    amount: FluidAmounts.NUGGET * 2,
                },
            ],
        )
        .heated();

    // rubber from latex via mixing gives 1 extra rubber compared to handcrafting
    event.recipes.create.mixing(
        "thermal:rubber",
        Fluid.of("thermal:latex", FluidAmounts.BOTTLE),
    );
    event.recipes.create
        .mixing("thermal:rosin", Fluid.of("thermal:resin", FluidAmounts.BOTTLE))
        .heated();

    event.recipes.create.mixing(
        Fluid.of(global.fluids.andesite_mixture, FluidAmounts.INGOT),
        ["minecraft:andesite", "create:zinc_nugget", "minecraft:clay_ball"],
    );

    event.recipes.create
        .compacting("createdeco:cast_iron_ingot", [
            "minecraft:iron_ingot",
            "createmetallurgy:graphite",
        ])
        .heated()
        .id("minecraft:compacting/cast_iron_ingot");

    // Sturdy hull
    event.recipes.create.compacting(global.items.sturdy_hull, [
        Item.of("create:sturdy_sheet", 4),
    ]);

    // early game obsidian dust recipe
    event.recipes.create.milling(
        ["create:powdered_obsidian"],
        "minecraft:obsidian",
    );
    // early game quartz
    event.recipes.create.milling(
        [Item.of("minecraft:quartz").withChance(0.1)],
        "minecraft:diorite",
    );
    // Mill ore to dust for chance for extra
    Ingredient.of("#forge:raw_materials").itemIds.forEach((item) => {
        const material = item.split("_").pop();
        const output = AlmostUnified.getPreferredItemForTag(
            `forge:dusts/${material}`,
        );
        if (output.isEmpty()) {
            return;
        }
        //TODO NO MAGIC number move to config or something jeeeeez
        event.recipes.create.milling([output, output.withChance(0.2)], item);
    });

    //Tier 1 create stuff
    upgradeTier0("create:shaft_tier_0", FluidAmounts.INGOT / 2);
    upgradeTier0("create:cogwheel_tier_0", FluidAmounts.INGOT);
    upgradeTier0("create:large_cogwheel_tier_0", FluidAmounts.INGOT * 2);
    function upgradeTier0(input, amount) {
        const output = input.substring(0, input.length - 1) + "1";
        event.recipes.create.filling(output, [
            Fluid.of("createmetallurgy:molten_copper", amount),
            input,
        ]);
    }

    // Rolling
    event.custom({
        type: "createaddition:rolling",
        input: {
            tag: "forge:ingots/bronze",
        },
        result: {
            item: global.items.bronze_rod,
            count: 2,
        },
    });

    //Chapter 2 Sequenced Assemblies

    event.recipes.create
        .sequenced_assembly(["create:electron_tube"], "create:iron_sheet", [
            event.recipes.createDeploying(
                global.items.incomplete_electron_tube,
                [global.items.incomplete_electron_tube, "#forge:glass"],
            ),
            event.recipes.createDeploying(
                global.items.incomplete_electron_tube,
                [
                    global.items.incomplete_electron_tube,
                    "create:polished_rose_quartz",
                ],
            ),
            event.recipes.createFilling(global.items.incomplete_electron_tube, [
                global.items.incomplete_electron_tube,
                Fluid.of(global.fluids.molten_rose_gold, FluidAmounts.INGOT),
            ]),
        ])
        .transitionalItem(global.items.incomplete_electron_tube)
        .id("create:crafting/materials/electron_tube");
});
