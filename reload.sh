#!/bin/sh
cd $MINECRAFT_INSTANCE
java -jar packwiz-installer-bootstrap.jar --bootstrap-no-update -g http://localhost:$npm_package_config_port/pack.toml
