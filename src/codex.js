'use strict';

DarkBright = require('./dark-bright');
Essence = require('./essence');
SkyGround = require('./sky-ground');


//@todo
class Animal {

}

module.exports = {
    DarkBright,
    Essence,
    Sky: SkyGround.Sky,
    Ground: SkyGround.Ground
}