global.packName = "grand_expanse";

// Define items here
global.items = { andesite_compound: null };
defineNames(global.items);

// Define fluids here
// Fluids beginning with molten will hava the lava tag.
global.fluids = {
    andesite_mixture: null,
    molten_tin: null,
    molten_nickel: null,
    molten_desh: null,
    molten_silver: null,
    molten_lead: null,
    molten_rose_gold: null,
};
// define names from keys
defineNames(global.fluids);

global.config = {
    furnace: {
        // Ores that can be smelted.
        // Anything not here can't be smelted in a furnace
        ores: ["iron", "copper", "gold", "zinc", "tin", "nickel"],
        smelting_nuggets: 3,
        blasting_nuggets: 4,
    },
    melting: {
        amount: FluidAmounts.INGOT,
        heatRequirement: "heated", // Default heat should be heated not blazing.
        time: 0.4, // time per millibucket
        minTime: 20, // shortest melting time.
        // materials that can be melted
        // Can also have optional heatRequirement
        // TODO ADD melting time to materials.
        materials: [
            { name: "iron", fluid: "createmetallurgy:molten_iron" },
            { name: "copper", fluid: "createmetallurgy:molten_copper" },
            { name: "gold", fluid: "createmetallurgy:molten_gold" },
            { name: "zinc", fluid: "createmetallurgy:molten_zinc" },
            { name: "tin", fluid: global.fluids.molten_tin },
            { name: "rose_gold", fluid: global.fluids.molten_rose_gold },
        ],
        // types of items that can be melted of above materials
        // nuggets defaults to 9
        items: [
            { tag: "forge:ingots/" },
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
};

function defineNames(object) {
    Object.keys(object).forEach((key) => {
        object[key] = `${global.packName}:${key}`;
    });
}
