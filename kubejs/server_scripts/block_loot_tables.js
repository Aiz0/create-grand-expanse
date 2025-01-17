LootJS.modifiers((event) => {
    event
        .addBlockLootModifier(global.items.lunium_nova_ore)
        .removeLoot(Ingredient.all)
        .addAlternativesLoot(
            LootEntry.of(global.items.lunium_nova_ore).when((c) =>
                c.matchMainHand(
                    ItemFilter.hasEnchantment("minecraft:silk_touch")
                )
            ),
            LootEntry.of("mmt:raw_lunium_nova").applyOreBonus(
                "minecraft:fortune"
            )
        );

    event
        .addLootTableModifier(
            /^minecraft:chests\/.*|terralith:underground\/chest/
        )
        .removeLoot(ItemFilter.WEAPON);
});
