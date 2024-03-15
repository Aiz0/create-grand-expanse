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
            "electrolyzer",
            (scene, util) => {
                scene.showBasePlate();

                // Animate in the 3x3 cube of copper casings and copper coil blocks
                for (let z = 5; z >= 3; z--) {
                    for (let y = 1; y <= 3; y++) {
                        for (let x = 2; x <= 4; x++) {
                            // Skip shaft for now
                            if (x == 3 && y == 2) {
                                continue;
                            }
                            scene.world.showSection([x, y, z], Facing.DOWN);
                            scene.idle(2);
                        }
                    }
                }
                scene.idle(10);
                // Fade in Tanks and electrolyzer
                fadeIn(scene, [4, 1, 2, 4, 3, 2], Facing.DOWN, 5);
                fadeIn(scene, [2, 1, 2, 2, 3, 2], Facing.DOWN, 10);
                // Electrolyzer
                fadeIn(scene, [3, 2, 2], Facing.DOWN, 20);

                // Hide top part to show where shafts should go
                const coil_top = [4, 3, 3, 2, 3, 5];
                scene.world.hideSection(coil_top, Facing.UP);
                scene.idle(20);
                // Show Gears for electrolyzer part
                fadeIn(scene, [3, 2, 7, 4, 1, 7], Facing.DOWN, 4);
                // Animate in shafts
                for (let z = 6; z >= 3; z--) {
                    fadeIn(scene, [3, 2, z], Facing.DOWN, 4);
                }
                // Re show top part again
                fadeIn(scene, coil_top, Facing.DOWN, 4);

                // Show water pipes
                // gears
                fadeIn(scene, [5, 2, 7, 6, 1, 7], Facing.DOWN, 4);
                // Animate in shafts
                for (let z = 6; z >= 3; z--) {
                    fadeIn(scene, [6, 1, z], Facing.DOWN, 4);
                }
                // final gear
                scene.world.showSection([6, 2, 3], Facing.DOWN);

                // Pipes
                scene.world.showSection([7, 1, 2, 6, 5, 2], Facing.DOWN);
                scene.world.showSection([5, 6, 2, 3, 4, 2], Facing.DOWN);
                scene.world.showSection([3, 3, 2], Facing.DOWN);
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
