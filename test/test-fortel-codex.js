'use strict';

const should = require('chai').should;
const expect = require('chai').expect;
const supertest = require('supertest');
const fortelCodex = require('./../index');
const DarkBright = fortelCodex.DarkBright;
const Essence = fortelCodex.Essence;
const Sky = fortelCodex.Sky;
const Ground = fortelCodex.Ground;
const GroundHour = fortelCodex.GroundHour;
const Zodiac = fortelCodex.Zodiac;

describe('fortel-codex test', function () {

    before(function (done) {
        done();
    });

    it("test 陰陽", function (done) {
        try {
            expect(DarkBright.items).to.not.null;
            expect(DarkBright.items.length).to.equal(2);

            expect(DarkBright.dark).to.equal(DarkBright.items[0]);
            expect(DarkBright.dark).to.equal(DarkBright.get(0));
            expect(DarkBright.dark).to.equal(DarkBright.get('陰'));
            expect(DarkBright.dark.displayName).to.equal('陰');
            expect(DarkBright.get('陰')).to.equal(DarkBright.dark);

            expect(DarkBright.bright).to.equal(DarkBright.items[1]);
            expect(DarkBright.bright).to.equal(DarkBright.get(1));
            expect(DarkBright.bright).to.equal(DarkBright.get('陽'));
            expect(DarkBright.get('陽')).to.equal(DarkBright.bright);
            
            expect(DarkBright.get('-')).to.be.null;

            expect(DarkBright.bright.displayName).to.equal('陽');

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 五行", function (done) {
        try {
            expect(Essence.items).to.not.null;
            expect(Essence.items.length).to.equal(5);
            expect(Essence.gold).to.equal(Essence.items[0]);
            expect(Essence.wood).to.equal(Essence.items[1]);
            expect(Essence.earth).to.equal(Essence.items[2]);
            expect(Essence.water).to.equal(Essence.items[3]);
            expect(Essence.fire).to.equal(Essence.items[4]);

            expect(Essence.gold).to.equal(Essence.get(0));
            expect(Essence.wood).to.equal(Essence.get(1));
            expect(Essence.earth).to.equal(Essence.get(2));
            expect(Essence.water).to.equal(Essence.get(3));
            expect(Essence.fire).to.equal(Essence.get(4));

            expect(Essence.gold).to.equal(Essence.get('金'));
            expect(Essence.wood).to.equal(Essence.get('木'));
            expect(Essence.earth).to.equal(Essence.get('土'));
            expect(Essence.water).to.equal(Essence.get('水'));
            expect(Essence.fire).to.equal(Essence.get('火'));

            expect(Essence.gold.displayName).to.equal('金');
            expect(Essence.wood.displayName).to.equal('木');
            expect(Essence.earth.displayName).to.equal('土');
            expect(Essence.water.displayName).to.equal('水');
            expect(Essence.fire.displayName).to.equal('火');

            expect(Essence.gold.to({})).to.eql(null);

            expect(Essence.gold.to(Essence.gold)).to.eql({
                relation: '同',
                isPositive: false,
                isNegative: false
            });
            expect(Essence.gold.to(Essence.wood)).to.eql({
                relation: '剋',
                isPositive: false,
                isNegative: true
            });
            expect(Essence.gold.to(Essence.earth)).to.eql({
                relation: '被生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.gold.to(Essence.water)).to.eql({
                relation: '生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.gold.to(Essence.fire)).to.eql({
                relation: '被剋',
                isPositive: false,
                isNegative: true
            });

            expect(Essence.wood.to(Essence.wood)).to.eql({
                relation: '同',
                isPositive: false,
                isNegative: false
            });
            expect(Essence.wood.to(Essence.earth)).to.eql({
                relation: '剋',
                isPositive: false,
                isNegative: true
            });
            expect(Essence.wood.to(Essence.water)).to.eql({
                relation: '被生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.wood.to(Essence.fire)).to.eql({
                relation: '生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.wood.to(Essence.gold)).to.eql({
                relation: '被剋',
                isPositive: false,
                isNegative: true
            });

            expect(Essence.earth.to(Essence.earth)).to.eql({
                relation: '同',
                isPositive: false,
                isNegative: false
            });
            expect(Essence.earth.to(Essence.water)).to.eql({
                relation: '剋',
                isPositive: false,
                isNegative: true
            });
            expect(Essence.earth.to(Essence.fire)).to.eql({
                relation: '被生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.earth.to(Essence.gold)).to.eql({
                relation: '生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.earth.to(Essence.wood)).to.eql({
                relation: '被剋',
                isPositive: false,
                isNegative: true
            });

            expect(Essence.water.to(Essence.water)).to.eql({
                relation: '同',
                isPositive: false,
                isNegative: false
            });
            expect(Essence.water.to(Essence.fire)).to.eql({
                relation: '剋',
                isPositive: false,
                isNegative: true
            });
            expect(Essence.water.to(Essence.gold)).to.eql({
                relation: '被生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.water.to(Essence.wood)).to.eql({
                relation: '生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.water.to(Essence.earth)).to.eql({
                relation: '被剋',
                isPositive: false,
                isNegative: true
            });

            expect(Essence.fire.to(Essence.fire)).to.eql({
                relation: '同',
                isPositive: false,
                isNegative: false
            });
            expect(Essence.fire.to(Essence.gold)).to.eql({
                relation: '剋',
                isPositive: false,
                isNegative: true
            });
            expect(Essence.fire.to(Essence.wood)).to.eql({
                relation: '被生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.fire.to(Essence.earth)).to.eql({
                relation: '生',
                isPositive: true,
                isNegative: false
            });
            expect(Essence.fire.to(Essence.water)).to.eql({
                relation: '被剋',
                isPositive: false,
                isNegative: true
            });

            expect(Essence.gold.feed).to.equal(Essence.water);
            expect(Essence.gold.feeded).to.equal(Essence.earth);
            expect(Essence.gold.suppress).to.equal(Essence.wood);
            expect(Essence.gold.suppressed).to.equal(Essence.fire);

            expect(Essence.wood.feed).to.equal(Essence.fire);
            expect(Essence.wood.feeded).to.equal(Essence.water);
            expect(Essence.wood.suppress).to.equal(Essence.earth);
            expect(Essence.wood.suppressed).to.equal(Essence.gold);

            expect(Essence.earth.feed).to.equal(Essence.gold);
            expect(Essence.earth.feeded).to.equal(Essence.fire);
            expect(Essence.earth.suppress).to.equal(Essence.water);
            expect(Essence.earth.suppressed).to.equal(Essence.wood);

            expect(Essence.water.feed).to.equal(Essence.wood);
            expect(Essence.water.feeded).to.equal(Essence.gold);
            expect(Essence.water.suppress).to.equal(Essence.fire);
            expect(Essence.water.suppressed).to.equal(Essence.earth);

            expect(Essence.fire.feed).to.equal(Essence.earth);
            expect(Essence.fire.feeded).to.equal(Essence.wood);
            expect(Essence.fire.suppress).to.equal(Essence.gold);
            expect(Essence.fire.suppressed).to.equal(Essence.water);

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 天干", function (done) {
        try {
            expect(Sky.items).to.not.null;

            /* test Sky.get(key) */
            const SKY_NAMES = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
            const SKYS = SKY_NAMES.map(sky => Sky.get(sky));

            for (var i = 0; i < SKYS.length; i++) {
                expect(Sky.get(i) instanceof Sky).to.equal(true);
                expect(Sky.get(i)).to.equal(SKYS[i]);
                expect(Sky.get(SKY_NAMES[i])).to.equal(SKYS[i]);
                for (var j = -20; j < 20; j++) {
                    expect(Sky.get(i).shift(j)).to.equal(Sky.get(i + j));
                }
            }
            expect(Sky.get(-101)).to.equal(SKYS[9]);
            expect(Sky.get(101)).to.equal(SKYS[1]);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 天干化合", function (done) {
        try {
            /* test 天干化合 */
            expect(Sky.get('甲').sythesis({})).to.be.null;
            expect(Sky.get('甲').sythesis(Sky.get('乙'))).to.be.null;
            expect(Sky.get('甲').sythesis(Sky.get('己'))).to.equal(Essence.earth);
            expect(Sky.get('乙').sythesis(Sky.get('庚'))).to.equal(Essence.gold);
            expect(Sky.get('丙').sythesis(Sky.get('辛'))).to.equal(Essence.water);
            expect(Sky.get('丁').sythesis(Sky.get('壬'))).to.equal(Essence.wood);
            expect(Sky.get('戊').sythesis(Sky.get('癸'))).to.equal(Essence.fire);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 天干相剋", function (done) {
        try {
            /* test 天干相剋 */
            expect(Sky.get('庚').suppress).to.equal(Sky.get('甲'));
            expect(Sky.get('辛').suppress).to.equal(Sky.get('乙'));
            expect(Sky.get('甲').suppress).to.equal(Sky.get('戊'));
            expect(Sky.get('乙').suppress).to.equal(Sky.get('己'));
            expect(Sky.get('戊').suppress).to.equal(Sky.get('壬'));
            expect(Sky.get('己').suppress).to.equal(Sky.get('癸'));
            expect(Sky.get('壬').suppress).to.equal(Sky.get('丙'));
            expect(Sky.get('癸').suppress).to.equal(Sky.get('丁'));
            expect(Sky.get('丙').suppress).to.equal(Sky.get('庚'));
            expect(Sky.get('丁').suppress).to.equal(Sky.get('辛'));

            expect(Sky.get('甲').suppressed).to.equal(Sky.get('庚'));
            expect(Sky.get('乙').suppressed).to.equal(Sky.get('辛'));
            expect(Sky.get('戊').suppressed).to.equal(Sky.get('甲'));
            expect(Sky.get('己').suppressed).to.equal(Sky.get('乙'));
            expect(Sky.get('壬').suppressed).to.equal(Sky.get('戊'));
            expect(Sky.get('癸').suppressed).to.equal(Sky.get('己'));
            expect(Sky.get('丙').suppressed).to.equal(Sky.get('壬'));
            expect(Sky.get('丁').suppressed).to.equal(Sky.get('癸'));
            expect(Sky.get('庚').suppressed).to.equal(Sky.get('丙'));
            expect(Sky.get('辛').suppressed).to.equal(Sky.get('丁'));
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });
            

    it("test 地支", function (done) {
        try {
            expect(Ground.items).to.not.null;

            /* test Ground.get(key) */
            const GROUND_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
            const GROUNDS = GROUND_NAMES.map(ground => Ground.get(ground));

            for (var i = 0; i < GROUNDS.length; i++) {
                expect(Ground.get(i) instanceof Ground).to.equal(true);
                expect(Ground.get(i)).to.equal(GROUNDS[i]);
                expect(Ground.get(GROUND_NAMES[i])).to.equal(GROUNDS[i]);
                for (var j = -20; j < 20; j++) {
                    expect(Ground.get(i).shift(j)).to.equal(Ground.get(i + j));
                }
            }
            expect(Ground.get(-121)).to.equal(GROUNDS[11]);
            expect(Ground.get(121)).to.equal(GROUNDS[1]);

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支六合局", function (done) {
        try {
            /* test 六合局 */
            let combinations = Ground.checkCombinations([Ground.get('子'), Ground.get('丑'), Ground.get('午'), Ground.get('卯'), Ground.get('戌')]);
            expect(combinations.sixSythesis.length).to.equal(2);
            expect(combinations.sixSythesis[0].a).to.equal(Ground.get('子'));
            expect(combinations.sixSythesis[0].b).to.equal(Ground.get('丑'));
            expect(combinations.sixSythesis[0].essence).to.equal(Essence.earth);
            expect(combinations.sixSythesis[1].a).to.equal(Ground.get('卯'));
            expect(combinations.sixSythesis[1].b).to.equal(Ground.get('戌'));
            expect(combinations.sixSythesis[1].essence).to.equal(Essence.fire);
            
            expect(Ground.checkSixSythesis(Ground.get('申'), {})).to.be.null;
            expect(Ground.checkSixSythesis(Ground.get('申'), Ground.get('未'))).to.be.null;
            expect(Ground.checkSixSythesis(Ground.get('子'), Ground.get('丑'))).to.equal(Essence.earth);
            expect(Ground.checkSixSythesis(Ground.get('寅'), Ground.get('亥'))).to.equal(Essence.wood);
            expect(Ground.checkSixSythesis(Ground.get('卯'), Ground.get('戌'))).to.equal(Essence.fire);
            expect(Ground.checkSixSythesis(Ground.get('辰'), Ground.get('酉'))).to.equal(Essence.gold);
            expect(Ground.checkSixSythesis(Ground.get('申'), Ground.get('巳'))).to.equal(Essence.water);
            expect(Ground.checkSixSythesis(Ground.get('午'), Ground.get('未'))).to.equal(Essence.fire);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支三合局", function (done) {
        try {
            let combinations = null;

            expect(Ground.checkThreeSythesis(Ground.get('寅'), Ground.get('戌')).essence).to.equal(Essence.fire);
            expect(Ground.checkThreeSythesis(Ground.get('寅'), Ground.get('酉'))).to.be.null;
            expect(Ground.checkThreeSythesis(Ground.get('寅'), {})).to.be.null;

            /* test 三合局 */
            combinations = Ground.checkCombinations([Ground.get('申'), Ground.get('子'), Ground.get('辰')]);
            expect(combinations.threeSythesis.length).to.equal(1);
            expect(combinations.threeSythesis[0].count).to.equal(3);
            expect(combinations.threeSythesis[0].combination.essence).to.equal(Essence.water);
            
            /* test 半三合局 */
            combinations = Ground.checkCombinations([Ground.get('辰'), Ground.get('子'), Ground.get('亥')]);
            expect(combinations.threeSythesis.length).to.equal(1);
            expect(combinations.threeSythesis[0].count).to.equal(2);
            expect(combinations.threeSythesis[0].combination.essence).to.equal(Essence.water);
            
            /* test 沒有"子"不算三合水局 */
            combinations = Ground.checkCombinations([Ground.get('辰'), Ground.get('申'), Ground.get('亥')]);
            expect(combinations.threeSythesis.length).to.equal(0);

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支三會局", function (done) {
        try {
            /* test 三會局 */
            let combinations = Ground.checkCombinations([Ground.get('巳'), Ground.get('午'), Ground.get('未')]);
            expect(combinations.threeSupports.length).to.equal(1);
            expect(combinations.threeSupports[0].count).to.equal(3);
            expect(combinations.threeSupports[0].combination.essence).to.equal(Essence.fire);

            expect(Ground.checkThreeSupport(Ground.get('申'), Ground.get('酉')).essence).to.equal(Essence.gold);
            expect(Ground.checkThreeSupport(Ground.get('申'), Ground.get('卯'))).to.be.null;
            expect(Ground.checkThreeSupport(Ground.get('申'), {})).to.be.null;

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支相沖", function (done) {
        try {
            /* test 相沖 */
            let combinations = Ground.checkCombinations([Ground.get('子'), Ground.get('卯'), Ground.get('酉')]);
            expect(combinations.opposite.length).to.equal(1);
            expect(combinations.opposite[0].a).to.equal(Ground.get('卯'));
            expect(combinations.opposite[0].b).to.equal(Ground.get('酉'));

            expect(Ground.checkOpposite(Ground.get('子'), {})).to.be.null;
            expect(Ground.checkOpposite(Ground.get('子'), Ground.get('午'))).to.equal(true);
            expect(Ground.checkOpposite(Ground.get('子'), Ground.get('亥'))).to.equal(false);
            
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支相刑", function (done) {
        try {
            /* test 相刑 */
            let combinations = null;

            expect(Ground.checkPunishment(Ground.get('寅'), {})).to.be.null;

            expect(Ground.checkPunishment(Ground.get('寅'), Ground.get('巳')).type).to.equal("無恩之刑");
            expect(Ground.checkPunishment(Ground.get('午'), Ground.get('寅'))).to.be.null;

            combinations = Ground.checkCombinations([Ground.get('午'), Ground.get('卯')]);
            expect(combinations.punishment.length).to.equal(0);

            combinations = Ground.checkCombinations([Ground.get('寅'), Ground.get('巳'), Ground.get('申')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("無恩之刑");

            combinations = Ground.checkCombinations([Ground.get('丑'), Ground.get('戌'), Ground.get('未')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("持勢之刑");

            combinations = Ground.checkCombinations([Ground.get('子'), Ground.get('卯'), Ground.get('戌')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("無禮之刑");

            combinations = Ground.checkCombinations([Ground.get('午'), Ground.get('卯'), Ground.get('午')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("自刑");
            
            combinations = Ground.checkCombinations([Ground.get('午'), Ground.get('酉'), Ground.get('酉')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("自刑");

            combinations = Ground.checkCombinations([Ground.get('辰'), Ground.get('辰')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("自刑");
            
            combinations = Ground.checkCombinations([Ground.get('子'), Ground.get('亥'), Ground.get('亥')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("自刑");
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支相害", function (done) {
        try {
            /* test 相害 */
            expect(Ground.checkHarm(Ground.get('子'), {})).to.be.null
            expect(Ground.checkHarm(Ground.get('子'), Ground.get('未'))).to.equal(true);
            expect(Ground.checkHarm(Ground.get('子'), Ground.get('丑'))).to.equal(false);

            let combinations = Ground.checkCombinations([Ground.get('申'), Ground.get('巳'), Ground.get('亥')]);
            expect(combinations.harm.length).to.equal(1);
            expect(combinations.harm[0].a).to.equal(Ground.get('亥'));
            expect(combinations.harm[0].b).to.equal(Ground.get('申'));
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 時辰", function (done) {
        try {
            expect(Sky.items).to.not.null;

            /* test Sky.get(key) */
            const GROUND_HOUR_NAMES = ['早子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '晚子'];
            const GROUND_HOURS = GROUND_HOUR_NAMES.map(groundHour => GroundHour.get(groundHour));

            for (var i = 0; i < GROUND_HOURS.length; i++) {
                expect(GroundHour.get(i) instanceof GroundHour).to.equal(true);
                expect(GroundHour.get(i)).to.equal(GROUND_HOURS[i]);
                expect(GroundHour.get(GROUND_HOUR_NAMES[i])).to.equal(GROUND_HOURS[i]);
            }
            expect(GroundHour.get(-131)).to.equal(GROUND_HOURS[12]);
            expect(GroundHour.get(131)).to.equal(GROUND_HOURS[1]);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 十二生肖", function (done) {
        try {
            expect(Zodiac.items).to.not.null;

            /* test Sky.get(key) */
            const ZODIAC_NAMES = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
            const ZODIACS = ZODIAC_NAMES.map(zodiac => Zodiac.get(zodiac));

            for (var i = 0; i < ZODIACS.length; i++) {
                expect(Zodiac.get(i) instanceof Zodiac).to.equal(true);
                expect(Zodiac.get(i)).to.equal(ZODIACS[i]);
                expect(Zodiac.get(ZODIAC_NAMES[i])).to.equal(ZODIACS[i]);
            }
            expect(Zodiac.get(-121)).to.equal(ZODIACS[11]);
            expect(Zodiac.get(121)).to.equal(ZODIACS[1]);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });
});