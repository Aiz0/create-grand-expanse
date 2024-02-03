global.packName = "grandexpanse";

// Define items here
const items = ["andesite_compound"];
// creates global object with our items
global.items = items.reduce((obj, item) => {
    obj[item] = `${global.packName}:${item}`;
    return obj;
}, {});

global.meltable = ["iron", "copper", "gold", "zinc"];
