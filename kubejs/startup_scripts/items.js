// Define items here
const items = ["andesite_compound"];

StartupEvents.registry("item", (event) => {
    // creats global object with our items
    global.items = items.reduce((obj, item) => {
        obj[item] = `${global.packName}:${item}`;
        return obj;
    }, {});

    // Create them here
    event.create(global.items.andesite_compound);
});
