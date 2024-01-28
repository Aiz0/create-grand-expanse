ServerEvents.recipes((event) => {
    event.shaped(
        Item.of("sophisticatedbackpacks:backpack", 5),
        ["ABA", "CDC", "EBE"],
        {
            A: "minecraft:leather",
            B: "farmersdelight:canvas",
            C: "farmersdelight:rope",
            D: "minecraft:barrel",
            E: "minecraft:bundle",
        }
    ).id("sophisticatedbackpacks:backpack");
});