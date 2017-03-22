'use strict';

const DarkBright = require('./dark-bright');
const Essence = require('./essence');

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
        if (target instanceof Sky){
            if ((this.index - target.index + 10) % 10 === 5) {
                switch (this.index % 5) {
                    case 0:
                        return Essence.earth;
                    case 1:
                        return Essence.gold;
                    case 2:
                        return Essence.water;
                    case 3:
                        return Essence.wood;
                    case 4:
                        return Essence.fire;
                }
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
    new Sky(7, '辛', DarkBright.dark, Essence.gold),
    new Sky(8, '壬', DarkBright.bright, Essence.water),
    new Sky(9, '癸', DarkBright.dark, Essence.water)
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
     * @param {string} direction
     * 
     * @memberOf Ground
     */
    constructor(index, displayName, darkBright, essence, baseSky, collectSky, remainSky, direction) {
        this.index = index;
        this.displayName = displayName;
        this.darkBright = darkBright;
        this.essence = essence;
        this.baseSky = baseSky;
        this.collectSky = collectSky;
        this.remainSky = remainSky;
        this.direction = direction;
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

    static checkCombinations(items) {
        /* check for 地支相沖 */
        let opposite = [];
        for (let i = 0; i < Ground.items.length / 2; i++) {
            if (items.indexOf(Ground.get(i)) >= 0 && items.indexOf(Ground.get(i + 6)) >= 0) {
                opposite.push({
                    a: Ground.get(i),
                    b: Ground.get(i + 6)
                })
            }
        }

        /* check 六合局 */
        let sixSythesis = [];
        for (let i = 0; i < items.length; i++) {
            for (let j = i; j < items.length; j++) {
                if (i !== j) {
                    let essence = Ground.checkSixSythesis(items[i], items[j]);
                    if (essence != null) {
                        sixSythesis.push({
                            a: items[i],
                            b: items[j],
                            essence: essence
                        });
                    }
                }
            }
        }

        /* check 三合局 */
        let threeSythesis = [];
        for (let combination of Ground.threeSythesises) {
            let count = 0;
            let countItems = []
            if (items.indexOf(combination.items[0]) === -1){
                continue;
            }
            for (let i = 0; i < 3; i++) {
                if (items.indexOf(combination.items[i]) >= 0) {
                    count++;
                    countItems.push(combination.items[i]);
                }
            }
            if (count > 1) {
                threeSythesis.push({
                    count: count,
                    items: countItems,
                    combination: combination
                });
            }
        }

        /* check 地支三會 */
        let threeSupports = [];
        for (let combination of Ground.threeSupports) {
            let count = 0;
            let countItems = []
            for (let i = 0; i < 3; i++) {
                if (items.indexOf(combination.items[i]) >= 0) {
                    count++;
                    countItems.push(combination.items[i]);
                }
            }
            if (count > 1) {
                threeSupports.push({
                    count: count,
                    items: countItems,
                    combination: combination
                });
            }
        }

        /* check 地支相刑 */
        let punishment = [];
        for (let combination of Ground.penishCombination) {
            let count = 0;
            if (combination.items.length > 1) {
                for (let i = 0; i < combination.items.length; i++) {
                    if (items.indexOf(combination.items[i]) >= 0) {
                        count++;
                    }
                }
                if (count === combination.items.length){
                    punishment.push(combination);
                }
            } else {
                let target = combination.items[0];
                let countItems = items.filter(item=>{return item.index === target.index;});
                let count = countItems.length;
                if (items.indexOf(target)>=0 && items.indexOf(target, items.indexOf(target)+1)>=0){
                    punishment.push(combination);
                }
            }
        }

        /* check for 地支相害 */
        let harm = [];
        for (let i = -2; i < Ground.items.length / 2 - 2; i++) {
            if (items.indexOf(Ground.get(i)) >= 0 && items.indexOf(Ground.get(7 - i)) >= 0) {
                harm.push({
                    a: Ground.get(i),
                    b: Ground.get(7 - i)
                })
            }
        }

        return {
            opposite,
            sixSythesis,
            threeSythesis,
            threeSupports,
            punishment,
            harm
        }
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
    static checkSixSythesis(a, b) {
        if (a instanceof Ground && b instanceof Ground) {
            let sum = a.index + b.index;
            let diff = Math.abs(a.index - b.index);
            if (sum === 1 && diff === 1) {
                //子丑合化土
                return Essence.earth;
            } else if (sum === 13 && diff === 9) {
                //寅亥合化木
                return Essence.wood;
            } else if (sum === 13 && diff === 7) {
                //卯戌合化火
                return Essence.fire;
            } else if (sum === 13 && diff === 5) {
                //辰酉合化金
                return Essence.gold;
            } else if (sum === 13 && diff === 3) {
                //巳申合化水
                return Essence.water;
            } else if (sum === 13 && diff === 1) {
                //午未合化火
                return Essence.fire;
            }
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
        return [{
                essence: Essence.water,
                items: [Ground.get('子'), Ground.get('申'), Ground.get('辰')]
            },
            {
                essence: Essence.wood,
                items: [Ground.get('卯'), Ground.get('亥'), Ground.get('未')]
            },
            {
                essence: Essence.fire,
                items: [Ground.get('午'), Ground.get('寅'), Ground.get('戌')]
            },
            {
                essence: Essence.gold,
                items: [Ground.get('酉'), Ground.get('巳'), Ground.get('丑')]
            }
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
        if (a instanceof Ground && b instanceof Ground) {
            let combinations = Ground.threeSythesises;
            for (let combination of combinations) {
                if (combination.items.indexOf(a) !== -1) {
                    if (combination.items.indexOf(b) !== -1) {
                        return combination;
                    }
                    break;
                }
            }
        }
        return null;
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
        return [{
                essence: Essence.wood,
                items: [Ground.get('寅'), Ground.get('卯'), Ground.get('辰')]
            },
            {
                essence: Essence.fire,
                items: [Ground.get('巳'), Ground.get('午'), Ground.get('未')]
            },
            {
                essence: Essence.gold,
                items: [Ground.get('申'), Ground.get('酉'), Ground.get('戌')]
            },
            {
                essence: Essence.water,
                items: [Ground.get('亥'), Ground.get('子'), Ground.get('丑')]
            }
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
    static checkThreeSupport(a, b) {
        if (a instanceof Ground && b instanceof Ground) {
            let combinations = Ground.threeSupports;
            for (let combination of combinations) {
                if (combination.items.indexOf(a) !== -1) {
                    if (combination.items.indexOf(b) !== -1) {
                        return combination;
                    }
                    break;
                }
            }
        }
        return null;
    }

    /**
     * 地支相刑 combinations
     * 
     * @readonly
     * @static
     * 
     * @memberOf Ground
     */
    static get penishCombination() {
        return [{
                type: "無恩之刑",
                items: [Ground.get('寅'), Ground.get('巳'), Ground.get('申')]
            },
            {
                type: "持勢之刑",
                items: [Ground.get('丑'), Ground.get('戌'), Ground.get('未')]
            },
            {
                type: "無禮之刑",
                items: [Ground.get('子'), Ground.get('卯')]
            },
            {
                type: "自刑",
                items: [Ground.get('午')]
            },
            {
                type: "自刑",
                items: [Ground.get('酉')]
            },
            {
                type: "自刑",
                items: [Ground.get('辰')]
            },
            {
                type: "自刑",
                items: [Ground.get('亥')]
            }
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
    static checkPunishment(a, b) {
        if (a instanceof Ground && b instanceof Ground) {
            let combinations = Ground.penishCombination;
            for (let combination of combinations) {
                if (combination.items.indexOf(a) !== -1) {
                    if (combination.items.indexOf(b) !== -1) {
                        return combination;
                    }
                    break;
                }
            }
        }
        return null;
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
    static checkHarm(a, b) {
        if (a instanceof Ground && b instanceof Ground) {
            return Ground.get(7 - a.index).index === b.index;
        }
        return null;
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
    static checkOpposite(a, b) {
        if (a instanceof Ground && b instanceof Ground) {
            return Math.abs(a.index - b.index) === 6;
        }
        return null;
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
    /*
    static get GroundRelationMatrix() {
        return [
            [0, 1, 0, 4, 2, 0, 8, 16, 2, 0, 0, 0],
            [1, 0, 0, 0, 0, 2, 16, 4 + 8, 0, 2, 4, 0],
            [0, 0, 0, 0, 0, 4 + 16, 2, 0, 4 + 8, 0, 2, 1],
            [4, 0, 0, 0, 16, 0, 0, 2, 0, 8, 1, 2],
            [2, 0, 0, 16, 4, 0, 0, 0, 2, 1, 8, 0],
            [0, 2, 4, 0, 0, 0, 0, 0, 1 + 4, 2, 0, 8],
            [8, 16, 2, 0, 0, 0, 4, 1, 0, 0, 2, 0],
            [16, 4 + 8, 0, 2, 0, 0, 1, 0, 0, 0, 4, 2],
            [2, 0, 4 + 8, 0, 2, 1 + 4, 0, 0, 0, 0, 0, 16],
            [0, 2, 0, 8, 1, 2, 0, 0, 0, 4, 16, 0],
            [0, 4, 2, 1, 8, 0, 2, 4, 0, 16, 0, 0],
            [0, 0, 0, 2, 0, 8, 0, 1, 16, 0, 0, 4],
        ];
    }
    */
}
Ground.items = [
    new Ground(0, '子', DarkBright.bright, Essence.water, Sky.get('癸'), null, null, '北'),
    new Ground(1, '丑', DarkBright.dark, Essence.earth, Sky.get('己'), Sky.get('辛'), Sky.get('癸'), '東北偏北'),
    new Ground(2, '寅', DarkBright.bright, Essence.wood, Sky.get('甲'), Sky.get('丙'), Sky.get('戊'), '東北'),
    new Ground(3, '卯', DarkBright.dark, Essence.wood, Sky.get('乙'), null, null, '東'),
    new Ground(4, '辰', DarkBright.bright, Essence.earth, Sky.get('戊'), Sky.get('乙'), Sky.get('癸'), '東南偏東'),
    new Ground(5, '巳', DarkBright.dark, Essence.fire, Sky.get('丙'), Sky.get('戊'), Sky.get('庚'), '東南'),
    new Ground(6, '午', DarkBright.bright, Essence.fire, Sky.get('丁'), Sky.get('己'), null, '南'),
    new Ground(7, '未', DarkBright.dark, Essence.earth, Sky.get('己'), Sky.get('丁'), Sky.get('乙'), '西南偏南'),
    new Ground(8, '申', DarkBright.bright, Essence.gold, Sky.get('庚'), Sky.get('壬'), Sky.get('戊'), '西南'),
    new Ground(9, '酉', DarkBright.dark, Essence.gold, Sky.get('辛'), null, null, '西'),
    new Ground(10, '戌', DarkBright.bright, Essence.earth, Sky.get('戊'), Sky.get('辛'), Sky.get('丁'), '西北偏西'),
    new Ground(11, '亥', DarkBright.dark, Essence.water, Sky.get('壬'), Sky.get('甲'), null, '西北')
];


/**
 * 時辰
 * 
 * @class Ground
 */
class GroundHour {

    /**
     * Creates an instance of GroundHour.
     * @param {number} index 
     * @param {string} displayName 
     * @param {Ground} ground
     * @param {int} startHour
     * @param {int} endHour
     * 
     * @memberOf GroundHour
     */
    constructor(index, displayName, ground, startHour, endHour) {
        this.index = index;
        this.displayName = displayName;
        this.ground = ground;
        this.startHour = startHour;
        this.endHour = endHour;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {GroundHour}
     * 
     * @memberOf GroundHour
     */
    static get(key) {
        if (typeof key === 'string') {
            return GroundHour.items[['早子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '晚子'].indexOf(key)];
        } else {
            let items = this.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }
}
GroundHour.items = [
    new GroundHour(0, '早子', Ground.get(0), 0, 1),
    new GroundHour(1, '丑', Ground.get(1), 1, 3),
    new GroundHour(2, '寅', Ground.get(2), 3, 5),
    new GroundHour(3, '卯', Ground.get(3), 5, 7),
    new GroundHour(4, '辰', Ground.get(4), 7, 9),
    new GroundHour(5, '巳', Ground.get(5), 9, 11),
    new GroundHour(6, '午', Ground.get(6), 11, 13),
    new GroundHour(7, '未', Ground.get(7), 13, 15),
    new GroundHour(8, '申', Ground.get(8), 15, 17),
    new GroundHour(9, '酉', Ground.get(9), 17, 19),
    new GroundHour(10, '戌', Ground.get(10), 19, 21),
    new GroundHour(11, '亥', Ground.get(11), 21, 23),
    new GroundHour(12, '晚子', Ground.get(0), 23, 24),
];

/**
 * 十二生肖
 * 
 * @class Zodiac
 */
class Zodiac {

    /**
     * Creates an instance of Zodiac.
     * @param {number} index 
     * @param {string} displayName 
     * @param {Ground} ground
     * 
     * @memberOf Zodiac
     */
    constructor(index, displayName, ground) {
        this.index = index;
        this.displayName = displayName;
        this.ground = ground;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {Zodiac}
     * 
     * @memberOf Zodiac
     */
    static get(key) {
        if (typeof key === 'string') {
            return Zodiac.items[['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'].indexOf(key)];
        } else {
            let items = this.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }
}
Zodiac.items = [
    new Zodiac(0, '鼠', Ground.get(0)),
    new Zodiac(1, '牛', Ground.get(1)),
    new Zodiac(2, '虎', Ground.get(2)),
    new Zodiac(3, '兔', Ground.get(3)),
    new Zodiac(4, '龍', Ground.get(4)),
    new Zodiac(5, '蛇', Ground.get(5)),
    new Zodiac(6, '馬', Ground.get(6)),
    new Zodiac(7, '羊', Ground.get(7)),
    new Zodiac(8, '猴', Ground.get(8)),
    new Zodiac(9, '雞', Ground.get(9)),
    new Zodiac(10, '狗', Ground.get(10)),
    new Zodiac(11, '豬', Ground.get(11))
];


module.exports = {
    Sky,
    Ground,
    GroundHour,
    Zodiac
};