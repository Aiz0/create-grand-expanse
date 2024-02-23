// Create Tags
// Can currently not be reloaded
Ponder.tags((event) => {
    event.createTag(
        `${global.packName}:metallurgy`, // ponder tag
        "createmetallurgy:foundry_basin", // icon
        "Metallurgy", // Title
        "Items related to create metallurgy", // Description
        [
            // Items in Tag
            "createmetallurgy:foundry_basin",
            "createmetallurgy:casting_basin",
            "createmetallurgy:casting_table",
            "createmetallurgy:foundry_mixer",
        ],
    );
});

// Create scenes
// Reload with /kubejs reload client_scripts
Ponder.registry((event) => {
    event
        .create("createmetallurgy:foundry_basin")
        .scene("create_foundry", "how to make a foundry", (scene, util) => {
            // Create blocks
            scene.world.setBlock([2, 1, 2], "create:blaze_burner", false);
            scene.world.modifyTileNBT([2, 1, 2], (nbt) => {
                //TODO MAKE THE BLAZE BURNER BURNNNNN
            });
            scene.world.setBlock(
                [2, 2, 2],
                "createmetallurgy:foundry_basin",
                false,
            );
            scene.world.setBlock(
                [2, 3, 2],
                "createmetallurgy:foundry_top",
                false,
            );

            scene.world.setBlock([2, 1, 1], "create:basin", false);

            // Show  with a fade in
            scene.showBasePlate();
            fadeIn(scene, [2, 1, 2], Direction.DOWN, 10);
            fadeIn(scene, [2, 2, 2], Direction.DOWN, 10);
            fadeIn(scene, [2, 3, 2], Direction.DOWN, 10);

            scene.idle(20);
            fadeIn(scene, [2, 1, 1], Direction.EAST, 10);
        });
});

/**
 * Helper function for fading in a section.
 *
 * scene => the scene to fade the section in
 * section => the section to fade in
 * direction => fade direction
 * idleTicks => number of ticks to idle
 */
function fadeIn(scene, selection, direction, idleTicks) {
    scene.world.showSection(selection, direction);
    scene.idle(idleTicks);
}
/**
 * Helper function for fading in and out a section.
 *
 * scene => the scene to fade the section in
 * section => the section to fade in
 * movingOffset => the offset to move the section by (a value, not a position)
 * direction => fade direction
 * idleTicks => number of ticks to idle
 */
function fadeInOutSection(scene, selection, offset, direction, idleTicks) {
    let link = scene.world.showIndependentSection(selection, direction);
    scene.world.moveSection(link, offset, 0); // 0 to instantly move
    scene.idle(idleTicks);
    scene.world.hideIndependentSection(link, direction);
    scene.idle(idleTicks);
}
