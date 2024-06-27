REIEvents.groupEntries((event) => {
    // Rechiseled and RechiseledCreate
    event.groupItems(
        "kubejs:rei_groups/rechiseled",
        "Rechiseled",
        Ingredient.of(/^rechiseled(create)?:/).itemIds.filter(
            (id) =>
                ![
                    "rechiseled:chisel",
                    "rechiseledcreate:mechanical_chisel",
                ].includes(id)
        )
    );

    // Create Deco Bricks
    event.groupItems(
        "kubejs:rei_groups/createdeco_bricks",
        "Create Deco Bricks",
        Ingredient.of(/^createdeco:/).itemIds.filter((id) =>
            id.includes("brick")
        )
    );

    const useNbt = [
        "potion",
        "enchanted_book",
        "splash_potion",
        "tipped_arrow",
        "lingering_potion",
    ];

    useNbt.forEach((id) => {
        const item = Item.of(id);
        const { namespace, path } = Utils.id(item.id);
        event.groupSameItem(
            `kubejs:rei_groups/${namespace}/${path}`,
            item.name,
            item
        );
    });

    event.groupItems("kubejs:rei_groups/spawn_eggs", "Spawn Eggs", [
        /spawn_egg/,
    ]);
});

REIEvents.hide("item", (event) => {
    event.hide(global.compressed_blocks_to_remove);

    event.hide(Ingredient.of(/^fumo:.*icon/).itemIds);
    event.hide("fumo:fumoitem");
});
