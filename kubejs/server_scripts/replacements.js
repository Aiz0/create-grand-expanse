ServerEvents.recipes((event) => {
    event
        .shaped(
            Item.of("sophisticatedbackpacks:backpack", 1),
            ["ABA", "CDC", "EBE"],
            {
                A: "minecraft:leather",
                B: "farmersdelight:canvas",
                C: "#forge:rope",
                D: "minecraft:barrel",
                E: "minecraft:bundle",
            },
        )
        .id("sophisticatedbackpacks:backpack");

    // Mechanical Saw now uses thermal saw blade
    event
        .shaped(Item.of("create:mechanical_saw", 1), ["A  ", "BC "], {
            A: "thermal:saw_blade",
            B: "create:andesite_casing",
            C: "create:shaft",
        })
        .id("create:crafting/kinetics/mechanical_saw");

    // Mechanical Drill now uses thermal drill head
    event
        .shaped(Item.of("create:mechanical_drill", 1), ["A", "B", "C"], {
            A: "thermal:drill_head",
            B: "create:andesite_casing",
            C: "create:shaft",
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
            },
        )
        .id("create:crafting/kinetics/empty_blaze_burner");
});
