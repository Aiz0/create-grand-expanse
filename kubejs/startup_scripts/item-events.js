ItemEvents.modification((event) => {
    const tools = ["pickaxe", "axe", "shovel", "sword", "hoe"];
    tools.forEach((tool) => {
        event.modify("minecraft:diamond_" + tool, (item) => {
            item.maxDamage = 1;
            item.tier = (tier) => {
                tier.speed = 6;
                tier.level = 2;
            };
        });
    });
    tools.forEach((tool) => {
        event.modify("minecraft:iron_" + tool, (item) => {
            item.maxDamage = 650;
            item.tier = (tier) => {
                tier.speed = 7;
            };
        });
    });
});
