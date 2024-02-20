ItemEvents.toolTierRegistry((event) => {
    event.add("copper", (tier) => {
        tier.uses = 200;
        tier.speed = 5.0;
        tier.attackDamageBonus = 2.0;
        tier.level = 2;
        tier.enchantmentValue = 9;
        tier.repairIngredient = "#forge:ingots/copper";
    });
});
