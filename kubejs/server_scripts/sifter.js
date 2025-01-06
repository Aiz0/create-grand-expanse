ServerEvents.recipes((event) => {
    event.recipes
        .createsifterSifting(
            [
                Item.of("minecraft:tube_coral").withChance(0.05),
                Item.of("minecraft:brain_coral").withChance(0.05),
                Item.of("minecraft:bubble_coral").withChance(0.05),
                Item.of("minecraft:fire_coral").withChance(0.05),
                Item.of("minecraft:horn_coral").withChance(0.05),
            ],
            ["minecraft:dirt", "createsifter:string_mesh"]
        )
        .waterlogged();

    // sifting gravel to coal??
    event.recipes.createsifterSifting(
        [Item.of("minecraft:coal").withChance(0.1)],
        ["minecraft:gravel", "createsifter:andesite_mesh"]
    );
    // sifting sand to gunpowa
    event.recipes.createsifterSifting(
        [Item.of("minecraft:gunpowder").withChance(0.1)],
        ["minecraft:sand", "createsifter:andesite_mesh"]
    );
});
