/**
 * @import {defineNames, packname} from "config.d.ts"
 */

/**
 * @type packname
 */
global.packName = "grand_expanse";

// Define items here
global.items = defineNames([
    "andesite_compound",
    "rocket_hull",
    "incomplete_electron_tube",
    "copper_coil_block",
    "electrolyzer",
    "sturdy_hull",
    "fumo_base",
    "low_density_structure",
    "smoldering_core",
    "lunium_nova_ore",
    "compressed_cryo_solution",
    "cryo_crystal",
    "charged_cryo_crystal",
]);

// Define fluids here
// Fluids beginning with molten will hava the lava tag.
global.fluids = defineNames([
    "andesite_mixture",
    "molten_cast_iron",
    "fluix_shimmer",
    "molten_lunium_nova",
    "molten_silicon",
    "cryo_solution",
]);

global.config = {
    // Default amount of bonks to get generate a block
    extruder_bonks: 3, // I like 3 because it starts of slower than the drill but becomes much faster when at high speeds
    furnace: {
        // Ores that can be smelted.
        // Anything not here can't be smelted in a furnace
        ores: ["iron", "copper", "gold", "zinc", "tin"],
        smelting_nuggets: 4,
        blasting_nuggets: 6,
    },
    melting: {
        materials: [
            { name: "andesite_alloy", fluid: global.fluids.andesite_mixture },
            { name: "cast_iron", fluid: global.fluids.molten_cast_iron },
        ],
        // types of items that can be melted of above materials
        // nuggets defaults to 9
        items: [
            { tag: "forge:ingots/" },
            { tag: "forge:plates/" },
            { tag: "forge:gears/" },
            { tag: "forge:raw_materials/" },
            { tag: "forge:crushed_raw_materials/" },
            { tag: "forge:dusts/" },
            { tag: "forge:dirty_dusts/" },
            { tag: "forge:nuggets/", fluidAmount: FluidAmounts.NUGGET },
            { tag: "forge:tools/", fluidAmount: FluidAmounts.NUGGET },
            {
                tag: "forge:storage_blocks/raw_",
                fluidAmount: FluidAmounts.METAL_BLOCK,
            },
            {
                tag: "forge:storage_blocks/",
                fluidAmount: FluidAmounts.METAL_BLOCK,
            },
        ],
    },
    // compressed blocks to keep from create compression
    compressed: ["cobblestone", "andesite"],
};

global.casts = {
    ingot: "ingot",
    nugget: "nugget",
    gem: "gem",
    rod: "rod",
    plate: "plate",
    gear: "gear",
    coin: "coin",
    wire: "wire",
};

function defineNames(arr) {
    const result = {};
    arr.forEach((item) => {
        result[item] = `${packname}:${item}`;
    });
    return result;
}
