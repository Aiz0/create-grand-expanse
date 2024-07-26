ServerEvents.blockLootTables(event => {
    event.addBlock(global.items.lunium_nova_ore, block_table => {
        block_table.addPool(pool => {
            pool.addItem("mmt:raw_lunium_nova")
        })
    })
})