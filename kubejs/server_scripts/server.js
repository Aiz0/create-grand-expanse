const stages = Object.freeze({
    recieved_starting_items: "recieved_starting_items",
    read_quest_book: "read_quest_book",
});
PlayerEvents.loggedIn((event) => {
    // Player is given starting items once.
    if (!event.player.stages.has(stages.recieved_starting_items)) {
        event.player.stages.add(stages.recieved_starting_items);

        // If we add more we more starting items this should be moved to config
        event.player.give("ftbquests:book");
    }
    if (!event.player.stages.has(stages.read_quest_book)) {
        event.player.tell(Text.red("read book :)"));
    }
});

ItemEvents.rightClicked((event) => {
    if (event.item.id == "ftbquests:book") {
        event.player.stages.add(stages.read_quest_book);
    }
});
