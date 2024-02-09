ServerEvents.recipes((event) => {
    function SmeltAndBlast(output, input) {
        event.smelting(output, input);
        event.blasting(output, input);
    }

    event
        .shaped(
            Item.of("sophisticatedbackpacks:backpack", 1),
            ["ABA", "CDC", "EBE"],
            {
                A: "minecraft:leather",
                B: "farmersdelight:canvas",
                C: "farmersdelight:rope",
                D: "minecraft:barrel",
                E: "minecraft:bundle",
            },
        )
        .id("sophisticatedbackpacks:backpack");

    // Remove crafting of iron and gold tools
    // We want alternate recipes for iron tools later
    // gold should only be found as loot
    event.remove([
        { output: "#forge:tools/iron" },
        { output: "#forge:tools/gold" },
    ]);

    // Remove ad astra hammer recipes.
    // We don't want this sheet/plate recipe.
    event.remove([
        { id: "ad_astra:recipes/hammer" },
        { input: "ad_astra:hammer" },
    ]);

    // Remove original andesite recipe
    event.remove({
        output: "create:andesite_alloy",
        input: "minecraft:andesite",
    });

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

    // Mechanical Saw now uses thermal saw blade
    event
        .shaped(Item.of("create:mechanical_saw", 1), ["A  ", "BC "], {
            A: "thermal:saw_blade",
            B: "create:andesite_casing",
            C: "create:shaft",
        })
        .id("create:crafting/kinetics/mechanical_saw");
    // Thermal saw blade
    event.shaped(Item.of("thermal:saw_blade", 1), [" A ", "AAA", " A "], {
        A: "create:iron_sheet",
    });

    // Mechanical Drill now uses thermal drill head
    event
        .shaped(Item.of("create:mechanical_drill", 1), ["A", "B", "C"], {
            A: "thermal:drill_head",
            B: "create:andesite_casing",
            C: "create:shaft",
        })
        .id("create:crafting/kinetics/mechanical_drill");
    // Thermal Drill
    event.shaped(Item.of("thermal:drill_head", 1), [" A ", "ABA", "BBB"], {
        A: "create:andesite_alloy",
        B: "create:iron_sheet",
    });
});
