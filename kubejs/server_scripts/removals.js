ServerEvents.recipes((event) => {
    // Removal of recipes should be done here
    // If a replacement is easier do it instead in replacements.js
    // Remove all ingot making from furnaces.
    event.remove([
        // Minecraft
        { type: "minecraft:smelting", output: "#forge:ingots" },
        { type: "minecraft:blasting", output: "#forge:ingots" },
        // Remove iron and gold tools
        { output: "#forge:tools/iron" },
        { output: "#forge:tools/gold" },

        // Create
        {
            output: "create:andesite_alloy",
            input: "minecraft:andesite",
        },

        // Create Metallurgy
        // Remove existing metallurgy smelting recipe
        // It uses superheated blazeburners and we don't want that
        { type: "createmetallurgy:melting" },
        { type: "createmetallurgy:casting_in_basin" },
        { type: "createmetallurgy:casting_in_table" },

        // Create mechanical extruder
        { id: "create_mechanical_extruder:mechanical_extruder" },
        { id: "create_mechanical_extruder:extruding/stone" },

        // Ad Astra
        // Remove ad astra hammer recipes.
        // We don't want this sheet/plate recipe.
        { id: "ad_astra:recipes/hammer" },
        { input: "ad_astra:hammer" },
    ]);

    // get all blocks compressed blocks that shouldn't be removed
    const keep_regex = new RegExp(
        `^createcompression:compressed_(${global.config.compressed.join(
            "|",
        )})_\\dx`,
    );
    // Compressed Blocks

    const blocks_to_keep = Ingredient.of(keep_regex).itemIds;
    // The compressed blocks to remove are put into an array to be used later in client_scripts/rei.js
    global.compressed_blocks_to_remove = Ingredient.of(
        /^createcompression:/,
    ).itemIds.filter((id) => !blocks_to_keep.some((block) => id === block));
    // removes them
    global.compressed_blocks_to_remove.forEach((block) => {
        event.remove({ output: block });
    });
});
