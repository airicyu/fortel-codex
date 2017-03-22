'use strict';

const DarkBright = require('./dark-bright');
const Essence = require('./essence');
const SkyGround = require('./sky-ground');


//@todo
class SolarTerm {

}

module.exports = {
    DarkBright,
    Essence,
    Sky: SkyGround.Sky,
    Ground: SkyGround.Ground,
    GroundHour: SkyGround.GroundHour,
    Zodiac: SkyGround.Zodiac
}