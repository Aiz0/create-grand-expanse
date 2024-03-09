ServerEvents.recipes((event) => {
    const inter = global.items.fumo_base;

    // Reimu
    // She floats through life
    event.recipes.create
        .sequenced_assembly(["fumo:new_reimu_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:golden_apple",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("minecraft:water", FluidAmounts.BUCKET),
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of(global.fluids.molten_rose_gold, FluidAmounts.BUCKET),
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of(
                    "create:potion",
                    FluidAmounts.BOTTLE,
                    '{Potion:"minecraft:slow_falling"}',
                ),
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "quark:bottled_cloud",
            ]),
        ])
        .transitionalItem(inter)
        .loops(10);

    // Patchouli
    // she reads all the books.
    event.recipes.create
        .sequenced_assembly(["fumo:patchouli_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:writable_book",
            ]),
            event.recipes.create.deploying(inter, [inter, "ftbquests:book"]),
            event.recipes.create.deploying(inter, [inter, "ad_astra:astrodux"]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of(
                    "create_enchantment_industry:ink",
                    FluidAmounts.BUCKET,
                ),
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of(
                    "create_enchantment_industry:hyper_experience",
                    FluidAmounts.BOTTLE,
                ),
            ]),
        ])
        .transitionalItem(inter)
        .loops(2);

    // Tewi
    // bnuy
    event.recipes.create
        .sequenced_assembly(["fumo:tewi_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:golden_carrot",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:rabbit_hide",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of(
                    "create:potion",
                    FluidAmounts.BOTTLE,
                    '{Potion:"minecraft:leaping"}',
                ),
            ]),
        ])
        .transitionalItem(inter)
        .loops(32);

    // Nazrin
    // mouse that likes food
    event.recipes.create
        .sequenced_assembly(["fumo:nazrin_item"], inter, [
            event.recipes.create.deploying(inter, [inter, "ad_astra:cheese"]),
            event.recipes.create.deploying(inter, [inter, "minecraft:cake"]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("minecraft:milk", FluidAmounts.BUCKET),
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "createaddition:chocolate_cake",
            ]),

            event.recipes.create.deploying(inter, [inter, "ad_astra:cheese"]),
            event.recipes.create.deploying(inter, [
                inter,
                "createaddition:honey_cake",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:emerald_block",
            ]),
        ])
        .transitionalItem(inter)
        .loops(1);

    // Nitori
    // kappa with engineering degree
    // uses mechanical arms becaus lore.
    event.recipes.create
        .sequenced_assembly(["fumo:nitori_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:lily_pad",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "create:mechanical_arm",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("minecraft:water", FluidAmounts.BUCKET),
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "create:extendo_grip",
            ]),
            event.recipes.create.deploying(inter, [inter, "minecraft:kelp"]),
        ])
        .transitionalItem(inter)
        .loops(4);

    // Marisa
    // she fast and has light and heat
    event.recipes.create
        .sequenced_assembly(["fumo:marisa_hat_item"], inter, [
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("thermal:glowstone", FluidAmounts.BUCKET),
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:diamond_block",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("minecraft:lava", FluidAmounts.BUCKET),
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of(
                    "create:potion",
                    FluidAmounts.BOTTLE,
                    '{Potion:"minecraft:swiftness"}',
                ),
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("create_enchantment_industry:hyper_experience", 100),
            ]),
        ])
        .transitionalItem(inter)
        .loops(4);

    // Eiki

    event.recipes.create
        .sequenced_assembly(["fumo:eiki_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:netherite_ingot",
            ]),
            event.recipes.create.deploying(inter, [inter, "#quark:corundum"]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("createmetallurgy:molten_gold", FluidAmounts.BUCKET),
            ]),
        ])
        .transitionalItem(inter)
        .loops(10);

    // Cirno
    // ice
    event.recipes.create
        .sequenced_assembly(["fumo:cirno_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:blue_ice",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "torchmaster:frozen_pearl",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("minecraft:water", FluidAmounts.BUCKET),
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "thermal:ice_charge",
            ]),
        ])
        .transitionalItem(inter)
        .loops(9);

    // Chen
    // orange cat
    event.recipes.create
        .sequenced_assembly(["fumo:chen_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:orange_dye",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of(
                    "create:potion",
                    FluidAmounts.BOTTLE,
                    '{Potion:"minecraft:swiftness"}',
                ),
            ]),
            event.recipes.create.deploying(inter, [inter, "minecraft:cod"]),
            event.recipes.create.deploying(inter, [inter, "minecraft:salmon"]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:tropical_fish",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("createmetallurgy:molten_gold", FluidAmounts.BUCKET),
            ]),
        ])
        .transitionalItem(inter)
        .loops(8);

    // Koishi
    event.recipes.create
        .sequenced_assembly(["fumo:koishi_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:amethyst_shard",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of(
                    "create:potion",
                    FluidAmounts.BOTTLE,
                    '{Potion:"minecraft:invisibility"}',
                ),
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:glow_ink_sac",
            ]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("thermal:ender", FluidAmounts.BUCKET),
            ]),
        ])
        .transitionalItem(inter)
        .loops(6);

    // Flandre
    // crystal vampire that blows stuff up?
    event.recipes.create
        .sequenced_assembly(["fumo:flandre_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "quark:blue_corundum_cluster",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "quark:indigo_corundum_cluster",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "quark:violet_corundum_cluster",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "quark:orange_corundum_cluster",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "quark:yellow_corundum_cluster",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "quark:green_corundum_cluster",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:fire_charge",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:blaze_powder",
            ]),
        ])
        .transitionalItem(inter)
        .loops(64);

    // Meiling
    // china maybe?
    event.recipes.create
        .sequenced_assembly(["fumo:meiling_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "quark:ancient_fruit",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:green_wool",
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "thermal:bamboo_block",
            ]),
            event.recipes.create.deploying(inter, [inter, "minecraft:shield"]),
            event.recipes.create.deploying(inter, [inter, "minecraft:bell"]),
        ])
        .transitionalItem(inter)
        .loops(12);

    // Youmu
    // half phantom dual wielding gardener
    event.recipes.create
        .sequenced_assembly(["fumo:youmu_item"], inter, [
            event.recipes.create.deploying(inter, [inter, "quark:soul_bead"]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:soul_lantern",
            ]),
            event.recipes.create.deploying(inter, [inter, "ae2:fluix_sword"]),
            event.recipes.create.deploying(inter, [
                inter,
                "farmersdelight:rice_bale",
            ]),
            event.recipes.create.deploying(inter, [inter, "ae2:fluix_hoe"]),
            event.recipes.create.deploying(inter, [
                inter,
                "create:refined_radiance",
            ]),
        ])
        .transitionalItem(inter)
        .loops(2);

    event.recipes.create
        .sequenced_assembly(["fumo:yuyuko_item"], inter, [
            event.recipes.create.deploying(inter, [
                inter,
                "create:refined_radiance",
            ]),
            event.recipes.create.deploying(inter, [inter, "quark:soul_bead"]),
            event.recipes.create.filling(inter, [
                inter,
                Fluid.of("thermal:ender", FluidAmounts.BUCKET),
            ]),
            event.recipes.create.deploying(inter, [
                inter,
                "minecraft:soul_lantern",
            ]),
        ])
        .transitionalItem(inter)
        .loops(10);
});
