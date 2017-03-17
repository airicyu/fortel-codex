'use strict';

var DarkBright = require('./dark-bright');
var Essence = require('./essence');

/**
 * 天干
 * 
 * @class Sky
 */
class Sky {

    /**
     * Creates an instance of Sky.
     * @param {number} index 
     * @param {string} displayName 
     * @param {DarkBright} darkBright 
     * @param {Essence} essence 
     * 
     * @memberOf Sky
     */
    constructor(index, displayName, darkBright, essence) {
        this.index = index;
        this.displayName = displayName;
        this.darkBright = darkBright;
        this.essence = essence;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {Sky}
     * 
     * @memberOf Sky
     */
    static get(key) {
        if (typeof key === 'string') {
            return Sky.items[['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'].indexOf(key)];
        } else {
            let items = Sky.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }


    /**
     * shift i Sky
     * 
     * @param {number} i 
     * @returns {Sky}
     * 
     * @memberOf Sky
     */
    shift(i) {
        return Sky.get(this.index + i);
    }


    /**
     * 天干合化
     * 
     * @param {Sky} target 
     * @returns {Essence}
     * 
     * @memberOf Sky
     */
    sythesis(target) {
        if ((this.index - target.index + 10) % 10 === 5) {
            switch (this.index % 5) {
                case 0:
                    return Essense.earth;
                    break;
                case 1:
                    return Essense.gold;
                    break;
                case 2:
                    return Essense.water;
                    break;
                case 3:
                    return Essense.wood;
                    break;
                case 4:
                    return Essense.fire;
                    break;
                default:
                    break;
            }
        }
        return null;
    }


    /**
     * 天干相剋
     * 
     * @readonly
     * @returns {Sky}
     * 
     * @memberOf Sky
     */
    get suppress() {
        return Sky.get(this.index + 4);
    }


    /**
     * 天干相剋(被剋)
     * 
     * @readonly
     * @returns {Sky}
     * 
     * @memberOf Sky
     */
    get suppressed() {
        return Sky.get(this.index - 4);
    }
}
Sky.items = [
    new Sky(0, '甲', DarkBright.bright, Essence.wood),
    new Sky(1, '乙', DarkBright.dark, Essence.wood),
    new Sky(2, '丙', DarkBright.bright, Essence.fire),
    new Sky(3, '丁', DarkBright.dark, Essence.fire),
    new Sky(4, '戊', DarkBright.bright, Essence.earth),
    new Sky(5, '己', DarkBright.dark, Essence.earth),
    new Sky(6, '庚', DarkBright.bright, Essence.gold),
    new Sky(8, '辛', DarkBright.dark, Essence.gold),
    new Sky(9, '壬', DarkBright.bright, Essence.water),
    new Sky(0, '癸', DarkBright.dark, Essence.water)
];


/**
 * 地支
 * 
 * @class Ground
 */
class Ground {

    /**
     * Creates an instance of Ground.
     * @param {number} index 
     * @param {string} displayName 
     * @param {DarkBright} darkBright 
     * @param {Essence} essence 
     * @param {Sky} baseSky 
     * @param {Sky} collectSky 
     * @param {Sky} remainSky 
     * 
     * @memberOf Ground
     */
    constructor(index, displayName, darkBright, essence, baseSky, collectSky, remainSky) {
        this.index = index;
        this.displayName = displayName;
        this.darkBright = darkBright;
        this.essence = essence;
        this.baseSky = baseSky;
        this.collectSky = collectSky;
        this.remainSky = remainSky;
    }


    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {Ground}
     * 
     * @memberOf Ground
     */
    static get(key) {
        if (typeof key === 'string') {
            return Ground.items[['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].indexOf(key)];
        } else {
            let items = this.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }

    /**
     * shift i Ground
     * 
     * @param {number} i 
     * @returns {Ground}
     * 
     * @memberOf Ground
     */
    shift(i) {
        return Ground.get(this.index + i);
    }

    
    /**
     * 六合局
     * 
     * @static
     * @param {Ground} a 
     * @param {Ground} b 
     * @returns {Essence}
     * 
     * @memberOf Ground
     */
    static getSixSythesis(a, b) {
        let sum = a.index + b.index;
        let diff = Math.abs(a.index - b.index);
        if (sum === 1 && diff === 1) {
            //子丑合化土
            return Essense.earth;
        } else if (sum === 13 && diff === 9) {
            //寅亥合化木
            return Essense.wood;
        } else if (sum === 13 && diff === 7) {
            //卯戌合化火
            return Essense.fire;
        } else if (sum === 13 && diff === 5) {
            //辰酉合化金
            return Essese.gold;
        } else if (sum === 13 && diff === 3) {
            //巳申合化水
            return Essense.water;
        } else if (sum === 13 && diff === 1) {
            //午未合化火
            return Essense.fire;
        }
        return null;
    }


    /**
     * 三合局 combinations
     * 
     * @readonly
     * @static
     * @returns {{essence: Essence, items: Ground[]}[]}
     * 
     * @memberOf Ground
     */
    static get threeSythesises() {
        return [
            { essence: Essence.water, items: [Ground.get('子'), Ground.get('申'), Ground.get('辰')] },
            { essence: Essence.wood, items: [Ground.get('卯'), Ground.get('亥'), Ground.get('未')] },
            { essence: Essence.fire, items: [Ground.get('午'), Ground.get('寅'), Ground.get('戌')] },
            { essence: Essence.gold, items: [Ground.get('酉'), Ground.get('巳'), Ground.get('丑')] }
        ];
    }

    /**
     * check for 三合局
     * 
     * @static
     * @param {Ground} a 
     * @param {Ground} b 
     * @returns {{essence: Essence, items: Ground[]}}
     * 
     * @memberOf Ground
     */
    static checkThreeSythesis(a, b) {
        let combinations = Ground.threeSythesises;
        for(combination of combinations){
            if (combination.items.indexOf(a) !== -1){
                if (combination.items.indexOf(b) !== -1){
                    return combination;
                }
                break;
            }
        }
        return false;
    }

    /**
     * 地支三會 combinations
     * 
     * @readonly
     * @static
     * @returns {{essence: Essence, items: Ground[]}[]}
     * 
     * @memberOf Ground
     */
    static get threeSupports() {
        return [
            { essence: Essence.wood, items: [Ground.get('寅'), Ground.get('卯'), Ground.get('辰')] },
            { essence: Essence.fire, items: [Ground.get('巳'), Ground.get('午'), Ground.get('未')] },
            { essence: Essence.gold, items: [Ground.get('申'), Ground.get('酉'), Ground.get('戌')] },
            { essence: Essence.water, items: [Ground.get('亥'), Ground.get('子'), Ground.get('丑')] }
        ];
    }


    /**
     * check for 地支三會
     * 
     * @static
     * @param {Ground} a 
     * @param {Ground} b 
     * @returns {essence: Essence, items: Ground[]}
     * 
     * @memberOf Ground
     */
    static checkThreeSupport(a,b) {
        let combinations = Ground.threeSupports;
        for(combination of combinations){
            if (combination.items.indexOf(a) !== -1){
                if (combination.items.indexOf(b) !== -1){
                    return combination;
                }
                break;
            }
        }
        return false;
    }

    /**
     * 地支相刑 combinations
     * 
     * @readonly
     * @static
     * 
     * @memberOf Ground
     */
    static get penishCombination(){
        return [
            { type: "無恩之刑", items: [Ground.get('寅'), Ground.get('巳'), Ground.get('申')] },
            { type: "持勢之刑", items: [Ground.get('丑'), Ground.get('戌'), Ground.get('未')] },
            { type: "無禮之刑", items: [Ground.get('子'), Ground.get('卯')] },
            { type: "自刑", items: [Ground.get('午')] },
            { type: "自刑", items: [Ground.get('酉')] },
            { type: "自刑", items: [Ground.get('辰')] },
            { type: "自刑", items: [Ground.get('亥')] }
        ];
    }


    /**
     * check for 地支相刑
     * 
     * @static
     * @param {any} a 
     * @param {any} b 
     * @returns 
     * 
     * @memberOf Ground
     */
    static checkPunishment(a,b) {
        let combinations = Ground.penishCombination;
        for(combination of combinations){
            if (combination.items.indexOf(a) !== -1){
                if (combination.items.indexOf(b) !== -1){
                    return combination;
                }
                break;
            }
        }
        return false;
    }


    /**
     * check for 地支相害
     * 
     * @static
     * @param {any} a 
     * @param {any} b 
     * @returns 
     * 
     * @memberOf Ground
     */
    static checkHarm(a,b){
        return Ground.get(7-a.index).index === b.index;
    }

    /**
     * check for 地支相沖
     * 
     * @static
     * @param {any} a 
     * @param {any} b 
     * @returns 
     * 
     * @memberOf Ground
     */
    static checkOpposite(a,b){
        return Math.abs(a.index - b.index) === 6;
    }

    /**
     * 0: no relationship
     * 1: 六合
     * 2: 三合
     * 4: 刑
     * 8: 沖
     * 16: 害
     * 
     * @readonly
     * @static
     * 
     * @memberOf Ground
     */
    static get GroundRelationMatrix(){
        return [
            [0, 1, 0, 4, 2, 0, 8, 16, 2, 0, 0, 0],
            [1, 0, 0, 0, 0, 2, 16, 4+8, 0, 2, 4, 0],
            [0, 0, 0, 0, 0, 4+16, 2, 0, 4+8, 0, 2, 1],
            [4, 0, 0, 0, 16, 0, 0, 2, 0, 8, 1, 2],
            [2, 0, 0, 16, 4, 0, 0, 0, 2, 1, 8, 0],
            [0, 2, 4, 0, 0, 0, 0, 0, 1+4, 2, 0, 8],
            [8, 16, 2, 0, 0, 0, 4, 1, 0, 0, 2, 0],
            [16, 4+8, 0, 2, 0, 0, 1, 0, 0, 0, 4, 2],
            [2, 0, 4+8, 0, 2, 1+4, 0, 0, 0, 0, 0, 16],
            [0, 2, 0, 8, 1, 2, 0, 0, 0, 4, 16, 0],
            [0, 4, 2, 1, 8, 0, 2, 4, 0, 16, 0, 0],
            [0, 0, 0, 2, 0, 8, 0, 1, 16, 0, 0, 4],
        ];
    }
}
Ground.items = [
    new Ground(0, '子', DarkBright.bright, Essence.water, Sky.get('癸'), null, null),
    new Ground(1, '丑', DarkBright.dark, Essence.earth, Sky.get('己'), Sky.get('辛'), Sky.get('癸')),
    new Ground(2, '寅', DarkBright.bright, Essence.wood, Sky.get('甲'), Sky.get('丙'), Sky.get('戊')),
    new Ground(3, '卯', DarkBright.dark, Essence.wood, Sky.get('乙'), null, null),
    new Ground(4, '辰', DarkBright.bright, Essence.earth, Sky.get('戊'), Sky.get('乙'), Sky.get('癸')),
    new Ground(5, '巳', DarkBright.dark, Essence.fire, Sky.get('丙'), Sky.get('戊'), Sky.get('庚')),
    new Ground(6, '午', DarkBright.bright, Essence.fire, Sky.get('丁'), Sky.get('己'), null),
    new Ground(7, '未', DarkBright.dark, Essence.earth, Sky.get('己'), Sky.get('丁'), Sky.get('乙')),
    new Ground(8, '申', DarkBright.bright, Essence.gold, Sky.get('庚'), Sky.get('壬'), Sky.get('戊')),
    new Ground(9, '酉', DarkBright.dark, Essence.gold, Sky.get('辛'), null, null),
    new Ground(10, '戌', DarkBright.bright, Essence.earth, Sky.get('戊'), Sky.get('辛'), Sky.get('丁')),
    new Ground(11, '亥', DarkBright.dark, Essence.water, Sky.get('壬'), Sky.get('甲'), null)
];

module.exports = {
    Sky, Ground
};