global.packName = "grandexpanse";

// Define items here
const items = ["andesite_compound"];
// creates global object with our items
global.items = items.reduce((obj, item) => {
    obj[item] = `${global.packName}:${item}`;
    return obj;
}, {});

// Define fluids here
// Fluids beginning with molten will hava the lava tag.
const fluids = [
    "andesite_mixture",
    "molten_tin",
    "molten_nickel",
    "molten_desh",
    "molten_silver",
    "molten_lead",
    "molten_rose_gold",
];
// creates global object with our items
global.fluids = fluids.reduce((obj, fluid) => {
    obj[fluid] = `${global.packName}:${fluid}`;
    return obj;
}, {});

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
