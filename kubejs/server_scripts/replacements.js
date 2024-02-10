ServerEvents.recipes((event) => {
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
            }
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
});
