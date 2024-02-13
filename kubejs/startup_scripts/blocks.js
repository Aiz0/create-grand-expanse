StartupEvents.registry("block", (event) => {
    global.config.compressed.forEach((obj) => {
        global.compressed[obj.block] = [];
        for (let tier = obj.amount; tier > 0; tier--) {
            compressed(obj.block, tier, obj.amount);
        }
    });

    function compressed(block, tier, amount) {
        if (amount == 0) return;
        const name = block.split(":").pop();
        const new_block = `${global.packName}:compressed_${name}_${tier}`;

        const colorstring = Math.round((180 / amount) * (amount - tier) + 20)
            .toString(16)
            .repeat(3);
        const color = parseInt(colorstring, 16);
        global.compressed[block].push(new_block);
        event
            .create(new_block)
            .textureAll("kubejs:block/" + name)
            .color(0, color);
    }
});
