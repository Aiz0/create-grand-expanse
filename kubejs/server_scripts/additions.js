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
    SmeltAndBlast("create:andesite_alloy", global.items.andesite_compound);

    // Thermal saw blade
    event.shaped(Item.of("thermal:saw_blade", 1), [" A ", "AAA", " A "], {
        A: "create:iron_sheet",
    });

    // Thermal Drill
    event.shaped(Item.of("thermal:drill_head", 1), [" A ", "ABA", "BBB"], {
        A: "create:andesite_alloy",
        B: "create:iron_sheet",
    });

    function SmeltAndBlast(output, input) {
        event.smelting(output, input);
        event.blasting(output, input);
    }
});
