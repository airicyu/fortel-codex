'use strict';

const DarkBright = require('./dark-bright');
const Essence = require('./essence');
const SkyGround = require('./sky-ground');


//@todo
class Animal {

}

module.exports = {
    DarkBright,
    Essence,
    Sky: SkyGround.Sky,
    Ground: SkyGround.Ground
}