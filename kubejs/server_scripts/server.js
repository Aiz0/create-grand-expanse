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

    // Remove crafting of iron and gold tools
    // We want alternate recipes for iron tools later
    // gold should only be found as loot
    event.remove([
        { output: "#forge:tools/iron" },
        { output: "#forge:tools/gold" },
    ]);

    // Remove ad astra hammer.
    event.remove([
        { id: "ad_astra:recipes/hammer" },
        { input: "ad_astra:hammer" },
    ]);
});
