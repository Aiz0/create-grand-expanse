// Create Tags
// Can currently not be reloaded
Ponder.tags((event) => {
    event.createTag(
        `${global.packName}:custommachinery`,
        global.items.electrolyzer,
        "Custom Machinery",
        "bloblablewylewyl",
        [global.items.electrolyzer]
    );
});

// Create scenes
// Reload with /kubejs reload client_scripts
Ponder.registry((event) => {
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
            }
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
