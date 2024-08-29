LootJS.modifiers((event) => {
    event
        .addBlockLootModifier(global.items.lunium_nova_ore)
        .removeLoot(Ingredient.all)
        .pool((p) => {
            p.addLoot("mmt:raw_lunium_nova");
            p.applyOreBonus("minecraft:fortune");
        });
});
