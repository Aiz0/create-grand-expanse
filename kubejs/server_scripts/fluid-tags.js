ServerEvents.tags("fluid", (event) => {
    // For now just add lava tag to all molten fluids

    for (const [name, id] of Object.entries(global.fluids)) {
        if (!name.startsWith("molten")) {
            continue;
        }
        // insert ":flowing_" into the id
        let flowingFluid = id.split(":");
        flowingFluid.splice(1, 0, ":flowing_");
        flowingFluid = flowingFluid.join("");
        event.add("minecraft:lava", id);
        event.add("minecraft:lava", flowingFluid);
    }
    // Adds biofuel as a possible rocket fuel
    event.add("ad_astra:fuel", "createaddition:bioethanol");
});
