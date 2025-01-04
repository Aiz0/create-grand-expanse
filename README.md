# Create: Grand Expanse

<h1 align="center">
	<br>
	<br>
	<img width="300" src="icon.png" alt="Chalk">
	<br>
	<br>
	<br>
</h1>

A Progression modpack centered around Create and Ad Astra.

> [!WARNING]
> This pack is in early development.

## Installation and Developement

This modpack uses [packwiz](https://packwiz.infra.link/) to manage mods from CurseForge and Modrinth. You need to [install packwiz](https://packwiz.infra.link/installation/) to add mods and to install the modpack.[^installnote]

### Installation Instructions

Instructions are based on the [packwiz installer tutorial](https://packwiz.infra.link/tutorials/installing/packwiz-installer/), Please check them if you have any issues.

1. Clone this repository.

2. [Install packwiz](https://packwiz.infra.link/installation/).

3. To install the modpack you need to to use a launcher that supports running prelaunch tasks.[^tasknote]

-   We recommend [Prism Launcher](https://prismlauncher.org/).

4. Create an instance matching the minecraft and modloader version the modpack uses.
    |Name       |Version|
    |-----------|-------|
    |Minecraft  |1.19.2 |
    |Forge      | 43.3.0|

5. Download [packwiz installer bootstrap](https://github.com/packwiz/packwiz-installer-bootstrap/releases) into the instance minecraft folder.

> [!NOTE]
> It should be named `minecraft` or `.minecraft`, if it's not there you can create it.

6. In Prism Launcher, go to Edit Instance -> Settings -> Custom commands, check the Custom Commands box and paste the following command into the pre-launch command field:

```
$INST_JAVA" -jar packwiz-installer-bootstrap.jar http://localhost:8080/pack.toml
```

> [!TIP]
> `packwiz-installer-bootstrap.jar` will query github for the latest version of packwiz installer
> If you see it failing often you can add `--bootstrap-no-update` as an option to `packwiz-installer-bootstrap.jar` to disable update checking.

7. In your local repository run create a `index.toml` and then run `packwiz serve` to host a local copy of `pack.toml` that packwiz installer can access. `pack.toml` will be updated every time it's queried.[^portnote]

8. Now every time you launch the instance it will get the version of the modpack matching your local repository. Any changes you make will be applied when you launch the game.

> [!TIP]
> If you are making changes that don't require minecraft to be restarted you can make a script that runs `packwiz-installer-bootstrap.jar` to update the modpack without restarting the game.

### Development info

To prevent merge conflicts we have enabled the [packwiz option](https://packwiz.infra.link/reference/additional-options/) `no-internal-hashes`.

> [!IMPORTANT]
> Hashes will still be generated whenever the hosted `pack.toml` is queried.
> Because of this please make sure to run `packwiz refresh` before adding files to commit.

[^installnote]: We haven't published this modpack anywhere yet so this is currently the only way to install it.
[^tasknote]: Pre launch tasks are not really required but it simplifys things.
[^portnote]: This should default to http://localhost:8080/pack.toml. The same url we entered in the pre-launch command field.
