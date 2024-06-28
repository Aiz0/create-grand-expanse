global.packName = "grand_expanse";

// Define items here
global.items = {
    andesite_compound: null,
    rocket_hull: null,
    incomplete_electron_tube: null,
    bronze_rod: null,
    copper_coil_block: null,
    electrolyzer: null,
    sturdy_hull: null,
    fumo_base: null,
    low_density_structure: null,
    smoldering_core: null,
};
defineNames(global.items);

// Define fluids here
// Fluids beginning with molten will hava the lava tag.
global.fluids = {
    andesite_mixture: null,
    molten_cast_iron: null,
    fluix_shimmer: null,
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

function defineNames(object) {
    Object.keys(object).forEach((key) => {
        object[key] = `${global.packName}:${key}`;
    });
}
