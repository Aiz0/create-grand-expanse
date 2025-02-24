import { parse } from "toml";
import { readFile } from "node:fs";
import { strict as assert } from "node:assert";
const pack = "./pack.toml";
readFile(pack, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const hashExists = "hash" in parse(data)["index"];
    assert.strictEqual(
        hashExists,
        false,
        "Property index.hash exits in pack.toml"
    );
});
