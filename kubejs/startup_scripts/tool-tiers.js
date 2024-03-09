ItemEvents.toolTierRegistry((event) => {
    event.add("copper", (tier) => {
        tier.uses = 200;
        tier.speed = 5;
        tier.attackDamageBonus = 1.5;
        tier.level = 1;
        tier.enchantmentValue = 9;
        tier.repairIngredient = "#forge:ingots/copper";
    });
});
