global.packName = "grand_expanse";

// Define items here
global.items = {
    andesite_compound: null,
    rocket_hull: null,
    incomplete_electron_tube: null,
    copper_pickaxe: null,
    copper_axe: null,
    copper_shovel: null,
    copper_sword: null,
    copper_hoe: null,
    tool_part_mold: null,
    armor_plate_mold: null,
    gear_mold: null,
    copper_tool_part: null,
    copper_armor_plate: null,
    iron_tool_part: null,
    iron_armor_plate: null,
    bronze_rod: null,
    copper_coil_block: null,
    electrolyzer: null,
    sturdy_hull: null,
    dense_tungsten_hull: null,
    fumo_base: null,
    rose_gold_ingot: null,
    high_density_tungsten: null,
    high_density_tungsten_sheet: null,
};
defineNames(global.items);

// Define fluids here
// Fluids beginning with molten will hava the lava tag.
global.fluids = {
    andesite_mixture: null,
    molten_cast_iron: null,
    molten_dense_tungsten: null,
};
// define names from keys
defineNames(global.fluids);

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
            {
                name: "high_density_tungsten",
                fluid: global.fluids.molten_dense_tungsten,
            },
        ],
        // types of items that can be melted of above materials
        // nuggets defaults to 9
        items: [
            { tag: "forge:ingots/" },
            { tag: "forge:plates/" },
            { tag: "forge:gears/" },
            { tag: "forge:tool_parts/" },
            { tag: "forge:armor_plates/" },
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

function defineNames(object) {
    Object.keys(object).forEach((key) => {
        object[key] = `${global.packName}:${key}`;
    });
}
