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
            "createmetallurgy:foundry_basin", // explain basic melting
            "createmetallurgy:foundry_top", // explain right click actions
            "createmetallurgy:casting_basin", // basic casting
            "createmetallurgy:casting_table", // molds
            "createmetallurgy:foundry_mixer",
        ],
    );
    event.createTag(
        `${global.packName}:custommachinery`,
        global.items.electrolyzer,
        "Custom Machinery",
        "bloblablewylewyl",
        [global.items.electrolyzer],
    );
});

// Create scenes
// Reload with /kubejs reload client_scripts
Ponder.registry((event) => {
    event
        .create("createmetallurgy:foundry_basin")
        .scene(
            "create_foundry",
            "how to make a foundry",
            "foundry_example",
            (scene, util) => {
                // Show  with a fade in
                scene.showBasePlate();
                scene.idle(10);
                scene.text(
                    100,
                    "The foundry basin functions like the normal basin, but can only hold one item type at a time.",
                    [2, 1.5, 2],
                );
                fadeInOutSection(
                    scene,
                    [2, 1, 4],
                    [0, 0, -2],
                    Direction.EAST,
                    100,
                );
                scene.idle(20);

                fadeIn(scene, [2, 1, 2], Direction.DOWN, 10);
                fadeIn(scene, [2, 2, 2], Direction.DOWN, 10);
                fadeIn(scene, [2, 3, 2], Direction.DOWN, 10);

                scene.text(
                    100,
                    "When placed between a blaze burner and a foundry top, Items inside will be melted.",
                    [2, 2.5, 2],
                );
                scene.idle(100);
                fadeIn(scene, [0, 1, 1, 1, 2, 2], Direction.DOWN, 10);
                scene.text(
                    50,
                    "Items need to be inserted from the side when a foundry top is used.",
                    [1, 2.5, 2],
                );
            },
        );

    event
        .create(global.items.electrolyzer)
        .scene(
            "kinetic_electrolyzer",
            "How to make a kinectic electrolyzer",
            (scene, util) => {
                scene.showBasePlate();
                scene
                    .text(100, "WIP", [2, 2.5, 2.5])
                    .colored(PonderPalette.RED);
            },
        );
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
}
