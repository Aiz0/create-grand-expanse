ServerEvents.recipes((event) => {
    const furnaceOres = ["copper", "iron", "gold", "zinc", "tin", "nickel"];
    const nuggets_smelting = 3;
    const nuggets_blasting = 4;

    const smelt_to_nuggets = (id) => {
        event.smelting(
            `${nuggets_smelting}x #forge:nuggets/${id}`,
            `#forge:raw_materials/${id}`
        );
        event.blasting(
            `${nuggets_blasting}x #forge:nuggets/${id}`,
            `#forge:raw_materials/${id}`
        );
    };

    // remove all ingot making from furnaces.
    event.remove([
        { type: "minecraft:smelting", output: "#forge:ingots" },
        { type: "minecraft:blasting", output: "#forge:ingots" },
    ]);
    furnaceOres.forEach(smelt_to_nuggets);

    // Basic helper function for melting metals
    // Unless we want something complicated this should be fine.
    function melting({ input, fluidOutput, fluidAmount, processingTime }) {
        fluidAmount = typeof fluidAmount !== "undefined" ? fluidAmount : 90;
        processingTime =
            typeof processingTime !== "undefined" ? processingTime : 40;
        event.custom({
            type: "createmetallurgy:melting",
            ingredients: [{ tag: input }],
            processingTime: processingTime,
            results: [
                {
                    fluid: fluidOutput,
                    amount: fluidAmount,
                },
            ],
            heatRequirement: "heated",
        });
    }

    // Remove existing ingot smelting recipe
    // It uses superheated blazeburners and we don't want that
    event.remove({ type: "createmetallurgy:melting", input: "#forge:ingots" });

    // helper function to flatten arrays since .flat() isn't a thing??
    const flatten = function (arr) {
        var reducer = function (acc, val) {
            return acc.concat(val);
        };
        return arr.reduce(reducer, []);
    };

    // Define what types of items can be smelted.
    const meltables = flatten(
        global.meltable.map((item) =>
            [
                {
                    input: `forge:ingots/${item}`,
                },
                {
                    input: `forge:crushed_raw_materials/${item}`,
                },
                {
                    input: `forge:raw_materials/${item}`,
                },
                {
                    input: `forge:nuggets/${item}`,
                    fluidAmount: 10,
                    processingTime: 40 / 9,
                },
                {
                    input: `forge:storage_blocks/raw_${item}`,
                    fluidAmount: 900,
                    processingTime: 40 * 9,
                },
            ].map((obj) => {
                obj.fluidOutput = `createmetallurgy:molten_${item}`;
                return obj;
            })
        )
    );
    meltables.forEach(melting);
});
