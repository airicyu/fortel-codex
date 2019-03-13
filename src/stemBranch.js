'use strict';

const MoonSun = require('./moonSun');
const Element = require('./element');

/**
 * 天干
 * 
 * @class Stem
 */
class Stem {

    /**
     * Creates an instance of Stem.
     * @param {number} index 
     * @param {string} displayName 
     * @param {MoonSun} moonSun 
     * @param {Element} element 
     * 
     * @memberOf Stem
     */
    constructor(index, displayName, moonSun, element) {
        this.index = index;
        this.displayName = displayName;
        this.moonSun = moonSun;
        this.element = element;
    }

    getIndex() {
        return this.index;
    }

    getDisplayName() {
        return this.displayName;
    }

    getMoonSun() {
        return this.moonSun;
    }

    getElement() {
        return this.element;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {Stem}
     * 
     * @memberOf Stem
     */
    static get(key) {
        if (typeof key === 'string') {
            return Stem.items[['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'].indexOf(key)];
        } else {
            let items = Stem.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }


    /**
     * shift i Stem
     * 
     * @param {number} i 
     * @returns {Stem}
     * 
     * @memberOf Stem
     */
    shift(i) {
        return Stem.get(this.index + i);
    }


    /**
     * 天干合化
     * 
     * @param {Stem} target 
     * @returns {Element}
     * 
     * @memberOf Stem
     */
    getSythesisResult(target) {
        if (target instanceof Stem) {
            if ((this.index - target.index + 10) % 10 === 5) {
                switch (this.index % 5) {
                    case 0:
                        return Element.Earth;
                    case 1:
                        return Element.Gold;
                    case 2:
                        return Element.Water;
                    case 3:
                        return Element.Wood;
                    case 4:
                        return Element.Fire;
                }
            }
        }
        return null;
    }


    /**
     * 天干相剋
     * 
     * @readonly
     * @returns {Stem}
     * 
     * @memberOf Stem
     */
    getSuppress() {
        return Stem.get(this.index + 4);
    }


    /**
     * 天干相剋(被剋)
     * 
     * @readonly
     * @returns {Stem}
     * 
     * @memberOf Stem
     */
    getSuppressedBy() {
        return Stem.get(this.index - 4);
    }
}
Stem.items = [
    new Stem(0, '甲', MoonSun.Sun, Element.Wood),
    new Stem(1, '乙', MoonSun.Moon, Element.Wood),
    new Stem(2, '丙', MoonSun.Sun, Element.Fire),
    new Stem(3, '丁', MoonSun.Moon, Element.Fire),
    new Stem(4, '戊', MoonSun.Sun, Element.Earth),
    new Stem(5, '己', MoonSun.Moon, Element.Earth),
    new Stem(6, '庚', MoonSun.Sun, Element.Gold),
    new Stem(7, '辛', MoonSun.Moon, Element.Gold),
    new Stem(8, '壬', MoonSun.Sun, Element.Water),
    new Stem(9, '癸', MoonSun.Moon, Element.Water)
];

Object.freeze(Stem);
Object.freeze(Stem.items);
for (let stem of Stem.items) {
    Object.freeze(stem);
}

/**
 * 地支
 * 
 * @class Branch
 */
class Branch {

    /**
     * Creates an instance of Branch.
     * @param {number} index 
     * @param {string} displayName 
     * @param {MoonSun} moonSun 
     * @param {Element} element 
     * @param {Stem} baseStem 
     * @param {Stem} collectStem 
     * @param {Stem} remainStem 
     * 
     * @memberOf Branch
     */
    constructor(index, displayName, moonSun, element, baseStem, collectStem, remainStem) {
        this.index = index;
        this.displayName = displayName;
        this.moonSun = moonSun;
        this.element = element;
        this.baseStem = baseStem;
        this.collectStem = collectStem;
        this.remainStem = remainStem;
    }

    getIndex() {
        return this.index;
    }

    getDisplayName() {
        return this.displayName;
    }

    getMoonSun() {
        return this.moonSun;
    }

    getElement() {
        return this.element;
    }

    getBaseStem() {
        return this.baseStem;
    }

    getCollectStem() {
        return this.collectStem;
    }

    getRemainStem() {
        return this.remainStem;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {Branch}
     * 
     * @memberOf Branch
     */
    static get(key) {
        if (typeof key === 'string') {
            return Branch.items[['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].indexOf(key)];
        } else {
            let items = this.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }

    /**
     * shift i Branch
     * 
     * @param {number} i 
     * @returns {Branch}
     * 
     * @memberOf Branch
     */
    shift(i) {
        return Branch.get(this.index + i);
    }

    static checkCombinations(items) {
        /* check for 地支相沖 */
        let opposite = [];
        for (let i = 0; i < Branch.items.length / 2; i++) {
            if (items.indexOf(Branch.get(i)) >= 0 && items.indexOf(Branch.get(i + 6)) >= 0) {
                opposite.push({
                    a: Branch.get(i),
                    b: Branch.get(i + 6)
                })
            }
        }

        /* check 六合局 */
        let sixSythesis = [];
        for (let i = 0; i < items.length; i++) {
            for (let j = i; j < items.length; j++) {
                if (i !== j) {
                    let element = Branch.checkSixSythesis(items[i], items[j]);
                    if (element != null) {
                        sixSythesis.push({
                            a: items[i],
                            b: items[j],
                            element: element
                        });
                    }
                }
            }
        }

        /* check 三合局 */
        let threeSythesis = [];
        for (let combination of Branch.threeSythesises) {
            let count = 0;
            let countItems = []
            if (items.indexOf(combination.items[0]) === -1) {
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
        for (let combination of Branch.threeSupports) {
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
        for (let combination of Branch.penishCombination) {
            let count = 0;
            if (combination.items.length > 1) {
                for (let i = 0; i < combination.items.length; i++) {
                    if (items.indexOf(combination.items[i]) >= 0) {
                        count++;
                    }
                }
                if (count === combination.items.length) {
                    punishment.push(combination);
                }
            } else {
                let target = combination.items[0];
                let countItems = items.filter(item => {
                    return item.index === target.index;
                });
                let count = countItems.length;
                if (items.indexOf(target) >= 0 && items.indexOf(target, items.indexOf(target) + 1) >= 0) {
                    punishment.push(combination);
                }
            }
        }

        /* check for 地支相害 */
        let harm = [];
        for (let i = -2; i < Branch.items.length / 2 - 2; i++) {
            if (items.indexOf(Branch.get(i)) >= 0 && items.indexOf(Branch.get(7 - i)) >= 0) {
                harm.push({
                    a: Branch.get(i),
                    b: Branch.get(7 - i)
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
     * @param {Branch} a 
     * @param {Branch} b 
     * @returns {Element}
     * 
     * @memberOf Branch
     */
    static checkSixSythesis(a, b) {
        if (a instanceof Branch && b instanceof Branch) {
            let sum = a.index + b.index;
            let diff = Math.abs(a.index - b.index);
            if (sum === 1 && diff === 1) {
                //子丑合化土
                return Element.Earth;
            } else if (sum === 13 && diff === 9) {
                //寅亥合化木
                return Element.Wood;
            } else if (sum === 13 && diff === 7) {
                //卯戌合化火
                return Element.Fire;
            } else if (sum === 13 && diff === 5) {
                //辰酉合化金
                return Element.Gold;
            } else if (sum === 13 && diff === 3) {
                //巳申合化水
                return Element.Water;
            } else if (sum === 13 && diff === 1) {
                //午未合化火
                return Element.Fire;
            }
        }
        return null;
    }


    /**
     * 三合局 combinations
     * 
     * @readonly
     * @static
     * @returns {{element: Element, items: Branch[]}[]}
     * 
     * @memberOf Branch
     */
    static get threeSythesises() {
        return [{
            element: Element.Water,
            items: [Branch.get('子'), Branch.get('申'), Branch.get('辰')]
        },
        {
            element: Element.Wood,
            items: [Branch.get('卯'), Branch.get('亥'), Branch.get('未')]
        },
        {
            element: Element.Fire,
            items: [Branch.get('午'), Branch.get('寅'), Branch.get('戌')]
        },
        {
            element: Element.Gold,
            items: [Branch.get('酉'), Branch.get('巳'), Branch.get('丑')]
        }
        ];
    }

    /**
     * check for 三合局
     * 
     * @static
     * @param {Branch} a 
     * @param {Branch} b 
     * @returns {{element: Element, items: Branch[]}}
     * 
     * @memberOf Branch
     */
    static checkThreeSythesis(a, b) {
        if (a instanceof Branch && b instanceof Branch) {
            let combinations = Branch.threeSythesises;
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
     * @returns {{element: Element, items: Branch[]}[]}
     * 
     * @memberOf Branch
     */
    static get threeSupports() {
        return [{
            element: Element.Wood,
            items: [Branch.get('寅'), Branch.get('卯'), Branch.get('辰')]
        },
        {
            element: Element.Fire,
            items: [Branch.get('巳'), Branch.get('午'), Branch.get('未')]
        },
        {
            element: Element.Gold,
            items: [Branch.get('申'), Branch.get('酉'), Branch.get('戌')]
        },
        {
            element: Element.Water,
            items: [Branch.get('亥'), Branch.get('子'), Branch.get('丑')]
        }
        ];
    }


    /**
     * check for 地支三會
     * 
     * @static
     * @param {Branch} a 
     * @param {Branch} b 
     * @returns {element: Element, items: Branch[]}
     * 
     * @memberOf Branch
     */
    static checkThreeSupport(a, b) {
        if (a instanceof Branch && b instanceof Branch) {
            let combinations = Branch.threeSupports;
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
     * @memberOf Branch
     */
    static get penishCombination() {
        return [{
            type: "無恩之刑",
            items: [Branch.get('寅'), Branch.get('巳'), Branch.get('申')]
        },
        {
            type: "持勢之刑",
            items: [Branch.get('丑'), Branch.get('戌'), Branch.get('未')]
        },
        {
            type: "無禮之刑",
            items: [Branch.get('子'), Branch.get('卯')]
        },
        {
            type: "自刑",
            items: [Branch.get('午')]
        },
        {
            type: "自刑",
            items: [Branch.get('酉')]
        },
        {
            type: "自刑",
            items: [Branch.get('辰')]
        },
        {
            type: "自刑",
            items: [Branch.get('亥')]
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
     * @memberOf Branch
     */
    static checkPunishment(a, b) {
        if (a instanceof Branch && b instanceof Branch) {
            let combinations = Branch.penishCombination;
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
     * @memberOf Branch
     */
    static checkHarm(a, b) {
        if (a instanceof Branch && b instanceof Branch) {
            return Branch.get(7 - a.index).index === b.index;
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
     * @memberOf Branch
     */
    static checkOpposite(a, b) {
        if (a instanceof Branch && b instanceof Branch) {
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
     * @memberOf Branch
     */
    /*
    static get BranchRelationMatrix() {
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
Branch.items = [
    new Branch(0, '子', MoonSun.Sun, Element.Water, Stem.get('癸'), null, null),
    new Branch(1, '丑', MoonSun.Moon, Element.Earth, Stem.get('己'), Stem.get('辛'), Stem.get('癸')),
    new Branch(2, '寅', MoonSun.Sun, Element.Wood, Stem.get('甲'), Stem.get('丙'), Stem.get('戊')),
    new Branch(3, '卯', MoonSun.Moon, Element.Wood, Stem.get('乙'), null, null),
    new Branch(4, '辰', MoonSun.Sun, Element.Earth, Stem.get('戊'), Stem.get('乙'), Stem.get('癸')),
    new Branch(5, '巳', MoonSun.Moon, Element.Fire, Stem.get('丙'), Stem.get('戊'), Stem.get('庚')),
    new Branch(6, '午', MoonSun.Sun, Element.Fire, Stem.get('丁'), Stem.get('己'), null),
    new Branch(7, '未', MoonSun.Moon, Element.Earth, Stem.get('己'), Stem.get('丁'), Stem.get('乙')),
    new Branch(8, '申', MoonSun.Sun, Element.Gold, Stem.get('庚'), Stem.get('壬'), Stem.get('戊')),
    new Branch(9, '酉', MoonSun.Moon, Element.Gold, Stem.get('辛'), null, null),
    new Branch(10, '戌', MoonSun.Sun, Element.Earth, Stem.get('戊'), Stem.get('辛'), Stem.get('丁')),
    new Branch(11, '亥', MoonSun.Moon, Element.Water, Stem.get('壬'), Stem.get('甲'), null)
];

Object.freeze(Branch);
Object.freeze(Branch.items);
for (let branch of Branch.items) {
    Object.freeze(branch);
}

/**
 * 時辰
 * 
 * @class HourBranch
 */
class HourBranch {

    /**
     * Creates an instance of HourBranch.
     * @param {number} index 
     * @param {string} displayName 
     * @param {Branch} ground
     * @param {int} startHour
     * @param {int} endHour
     * 
     * @memberOf HourBranch
     */
    constructor(index, displayName, ground, startHour, endHour) {
        this.index = index;
        this.displayName = displayName;
        this.ground = ground;
        this.startHour = startHour;
        this.endHour = endHour;
    }

    getIndex() {
        return this.index;
    }

    getDisplayName() {
        return this.displayName;
    }

    getGround() {
        return this.ground;
    }

    getStartHour() {
        return this.startHour;
    }

    getEndHour() {
        return this.endHour;
    }

    /**
     * get by index or name
     * 
     * @static
     * @param {number|string} key 
     * @returns {HourBranch}
     * 
     * @memberOf HourBranch
     */
    static get(key) {
        if (typeof key === 'string') {
            return HourBranch.items[['早子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '晚子'].indexOf(key)];
        } else {
            let items = this.items;
            return items[((key % items.length) + items.length) % items.length]
        }
    }
}
HourBranch.items = [
    new HourBranch(0, '早子', Branch.get(0), 0, 1),
    new HourBranch(1, '丑', Branch.get(1), 1, 3),
    new HourBranch(2, '寅', Branch.get(2), 3, 5),
    new HourBranch(3, '卯', Branch.get(3), 5, 7),
    new HourBranch(4, '辰', Branch.get(4), 7, 9),
    new HourBranch(5, '巳', Branch.get(5), 9, 11),
    new HourBranch(6, '午', Branch.get(6), 11, 13),
    new HourBranch(7, '未', Branch.get(7), 13, 15),
    new HourBranch(8, '申', Branch.get(8), 15, 17),
    new HourBranch(9, '酉', Branch.get(9), 17, 19),
    new HourBranch(10, '戌', Branch.get(10), 19, 21),
    new HourBranch(11, '亥', Branch.get(11), 21, 23),
    new HourBranch(12, '晚子', Branch.get(0), 23, 24),
];

Object.freeze(HourBranch);
Object.freeze(HourBranch.items);
for (let hourBranch of HourBranch.items) {
    Object.freeze(hourBranch);
}

module.exports = {
    Stem,
    Branch,
    HourBranch
};