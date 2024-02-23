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
            ["minecraft:dirt", "createsifter:string_mesh"],
        )
        .waterlogged();
});
