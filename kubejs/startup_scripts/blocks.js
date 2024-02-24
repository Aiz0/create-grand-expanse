StartupEvents.registry("block", (event) => {
    event.create(global.items.copper_coil_block).requiresTool(true);
});
