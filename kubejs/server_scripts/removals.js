ServerEvents.recipes((event) => {
    // Removal of recipes should be done here
    // If a replacement is easier do it instead in replacements.js
    // Remove all ingot making from furnaces.
    event.remove([
        // Minecraft
        { type: "minecraft:smelting", output: "#forge:ingots" },
        { type: "minecraft:blasting", output: "#forge:ingots" },

        // Remove vanilla tools
        { output: "#forge:tools/pickaxes" },
        { output: "#forge:tools/axes" },
        { output: "#forge:tools/shovels" },
        { output: "#forge:tools/swords" },
        { output: "#forge:tools/hoes" },
        // Remove normal armors but keep leather and diving suit
        {
            output: "#forge:armors",
            not: { input: "#forge:leather" },
            not: { input: "#forge:ingots/copper" },
        },

        // Create
        {
            output: "create:andesite_alloy",
            input: "minecraft:andesite",
        },
        { id: "createaddition:crafting/modular_accumulator_gold" },
        { id: "create:mixing/brass_ingot" },
        // using sequence for these.
        { output: "create:copper_casing" },
        { output: "create:brass_casing" },
        { output: "create:railway_casing" },

        // Create mechanical extruder
        { id: "create_mechanical_extruder:mechanical_extruder" },
        { id: "create_mechanical_extruder:extruding/stone" },

        // Create Sifter
        // removes all except sifting for coral
        { type: "createsifter:sifting" },
        // Ad Astra
        // Remove ad astra hammer recipes.
        // We don't want this sheet/plate recipe.
        { id: "ad_astra:recipes/hammer" },
        { input: "ad_astra:hammer" },
        { id: "ad_astra:conversion/oxygen_from_water" },
        { type: "ad_astra:cryo_fuel_conversion" },

        //AE2 Fluix
        { id: "create:compat/ae2/mixing/fluix_crystal" },
        { id: "ae2:charger/charged_certus_quartz_crystal" },
        { id: "ae2:transform/fluix_crystal" },
        { id: "ae2:transform/fluix_crystals" },
        { id: "ae2:inscriber/fluix_dust" },
        { id: "ae2:blasting/silicon_from_certus_quartz_dust" },

        // Thermal
        {
            output: "#forge:gears",
            not: {
                type: "tconstruct:casting_table",
            },
        },
        { output: "#forge:ingots", input: "minecraft:fire_charge" },
    ]);

    Ingredient.of(/^fumo:/).itemIds.forEach((item) => {
        event.remove({ output: item });
    });

    // get all blocks compressed blocks that shouldn't be removed
    const keep_regex = new RegExp(
        `^createcompression:compressed_(${global.config.compressed.join(
            "|"
        )})_\\dx`
    );
    // Compressed Blocks

    const blocks_to_keep = Ingredient.of(keep_regex).itemIds;
    // The compressed blocks to remove are put into an array to be used later in client_scripts/rei.js
    global.compressed_blocks_to_remove = Ingredient.of(
        /^createcompression:/
    ).itemIds.filter((id) => !blocks_to_keep.some((block) => id === block));
    // removes them
    global.compressed_blocks_to_remove.forEach((block) => {
        event.remove({ output: block });
    });
});
