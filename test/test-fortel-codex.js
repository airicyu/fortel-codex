'use strict';

const expect = require('chai').expect;
const fortelCodex = require('./../main');
const MoonSun = fortelCodex.MoonSun;
const Element = fortelCodex.Element;
const Stem = fortelCodex.Stem;
const Branch = fortelCodex.Branch;
const HourBranch = fortelCodex.HourBranch;
const Relationship = fortelCodex.Relationship;
const Zodiac = fortelCodex.Zodiac;

describe('fortel-codex test', function () {

    before(function (done) {
        done();
    });

    it("test 陰陽", function (done) {
        try {
            expect(MoonSun.items).to.not.null;
            expect(MoonSun.items.length).to.equal(2);

            expect(MoonSun.Moon).to.equal(MoonSun.items[0]);
            expect(MoonSun.Moon).to.equal(MoonSun.get(0));
            expect(MoonSun.Moon).to.equal(MoonSun.get('陰'));
            expect(MoonSun.Moon.getDisplayName()).to.equal('陰');
            expect(MoonSun.get('陰')).to.equal(MoonSun.Moon);

            expect(MoonSun.Sun).to.equal(MoonSun.items[1]);
            expect(MoonSun.Sun).to.equal(MoonSun.get(1));
            expect(MoonSun.Sun).to.equal(MoonSun.get('陽'));
            expect(MoonSun.get('陽')).to.equal(MoonSun.Sun);

            expect(MoonSun.get('-')).to.be.null;

            expect(MoonSun.Sun.getDisplayName()).to.equal('陽');

            expect(MoonSun.Sun.getOpposite()).to.equal(MoonSun.Moon);
            expect(MoonSun.Moon.getOpposite()).to.equal(MoonSun.Sun);

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 五行", function (done) {
        try {
            expect(Element.items).to.not.null;
            expect(Element.items.length).to.equal(5);
            expect(Element.Gold).to.equal(Element.items[0]);
            expect(Element.Wood).to.equal(Element.items[1]);
            expect(Element.Earth).to.equal(Element.items[2]);
            expect(Element.Water).to.equal(Element.items[3]);
            expect(Element.Fire).to.equal(Element.items[4]);

            expect(Element.Gold).to.equal(Element.get(0));
            expect(Element.Wood).to.equal(Element.get(1));
            expect(Element.Earth).to.equal(Element.get(2));
            expect(Element.Water).to.equal(Element.get(3));
            expect(Element.Fire).to.equal(Element.get(4));

            expect(Element.Gold).to.equal(Element.get('金'));
            expect(Element.Wood).to.equal(Element.get('木'));
            expect(Element.Earth).to.equal(Element.get('土'));
            expect(Element.Water).to.equal(Element.get('水'));
            expect(Element.Fire).to.equal(Element.get('火'));

            expect(Element.Gold.getDisplayName()).to.equal('金');
            expect(Element.Wood.getDisplayName()).to.equal('木');
            expect(Element.Earth.getDisplayName()).to.equal('土');
            expect(Element.Water.getDisplayName()).to.equal('水');
            expect(Element.Fire.getDisplayName()).to.equal('火');

            expect(Element.Gold.to({})).to.eql(null);

            expect(Element.Gold.to(Element.Gold)).to.eql(Relationship.Same);
            expect(Element.Gold.to(Element.Wood)).to.eql(Relationship.Suppress);
            expect(Element.Gold.to(Element.Earth)).to.eql(Relationship.EnhancedBy);
            expect(Element.Gold.to(Element.Water)).to.eql(Relationship.Enhance);
            expect(Element.Gold.to(Element.Fire)).to.eql(Relationship.SuppressedBy);

            expect(Element.Wood.to(Element.Wood)).to.eql(Relationship.Same);
            expect(Element.Wood.to(Element.Earth)).to.eql(Relationship.Suppress);
            expect(Element.Wood.to(Element.Water)).to.eql(Relationship.EnhancedBy);
            expect(Element.Wood.to(Element.Fire)).to.eql(Relationship.Enhance);
            expect(Element.Wood.to(Element.Gold)).to.eql(Relationship.SuppressedBy);

            expect(Element.Earth.to(Element.Earth)).to.eql(Relationship.Same);
            expect(Element.Earth.to(Element.Water)).to.eql(Relationship.Suppress);
            expect(Element.Earth.to(Element.Fire)).to.eql(Relationship.EnhancedBy);
            expect(Element.Earth.to(Element.Gold)).to.eql(Relationship.Enhance);
            expect(Element.Earth.to(Element.Wood)).to.eql(Relationship.SuppressedBy);

            expect(Element.Water.to(Element.Water)).to.eql(Relationship.Same);
            expect(Element.Water.to(Element.Fire)).to.eql(Relationship.Suppress);
            expect(Element.Water.to(Element.Gold)).to.eql(Relationship.EnhancedBy);
            expect(Element.Water.to(Element.Wood)).to.eql(Relationship.Enhance);
            expect(Element.Water.to(Element.Earth)).to.eql(Relationship.SuppressedBy);

            expect(Element.Fire.to(Element.Fire)).to.eql(Relationship.Same);
            expect(Element.Fire.to(Element.Gold)).to.eql(Relationship.Suppress);
            expect(Element.Fire.to(Element.Wood)).to.eql(Relationship.EnhancedBy);
            expect(Element.Fire.to(Element.Earth)).to.eql(Relationship.Enhance);
            expect(Element.Fire.to(Element.Water)).to.eql(Relationship.SuppressedBy);

            expect(Element.Gold.getEnhance()).to.equal(Element.Water);
            expect(Element.Gold.getEnhancedBy()).to.equal(Element.Earth);
            expect(Element.Gold.getSuppress()).to.equal(Element.Wood);
            expect(Element.Gold.getSuppressedBy()).to.equal(Element.Fire);

            expect(Element.Wood.getEnhance()).to.equal(Element.Fire);
            expect(Element.Wood.getEnhancedBy()).to.equal(Element.Water);
            expect(Element.Wood.getSuppress()).to.equal(Element.Earth);
            expect(Element.Wood.getSuppressedBy()).to.equal(Element.Gold);

            expect(Element.Earth.getEnhance()).to.equal(Element.Gold);
            expect(Element.Earth.getEnhancedBy()).to.equal(Element.Fire);
            expect(Element.Earth.getSuppress()).to.equal(Element.Water);
            expect(Element.Earth.getSuppressedBy()).to.equal(Element.Wood);

            expect(Element.Water.getEnhance()).to.equal(Element.Wood);
            expect(Element.Water.getEnhancedBy()).to.equal(Element.Gold);
            expect(Element.Water.getSuppress()).to.equal(Element.Fire);
            expect(Element.Water.getSuppressedBy()).to.equal(Element.Earth);

            expect(Element.Fire.getEnhance()).to.equal(Element.Earth);
            expect(Element.Fire.getEnhancedBy()).to.equal(Element.Wood);
            expect(Element.Fire.getSuppress()).to.equal(Element.Gold);
            expect(Element.Fire.getSuppressedBy()).to.equal(Element.Water);

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 天干", function (done) {
        try {
            expect(Stem.items).to.not.null;

            /* test Stem.get(key) */
            const STEM_NAMES = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
            const STEMS = STEM_NAMES.map(stem => Stem.get(stem));
            const STEM_ELEMENTS = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];

            for (var i = 0; i < STEMS.length; i++) {
                expect(Stem.get(i) instanceof Stem).to.equal(true);
                expect(Stem.get(i)).to.equal(STEMS[i]);
                expect(Stem.get(STEM_NAMES[i])).to.equal(STEMS[i]);
                expect(Stem.get(i).getIndex()).to.equal(i);
                expect(Stem.get(i).getDisplayName()).to.equal(STEM_NAMES[i]);
                expect(Stem.get(i).getMoonSun()).to.equal(i % 2 == 0 ? MoonSun.Sun : MoonSun.Moon);
                expect(Stem.get(i).getElement()).to.equal(Element.get(STEM_ELEMENTS[i]));
                for (var j = -20; j < 20; j++) {
                    expect(Stem.get(i).shift(j)).to.equal(Stem.get(i + j));
                }
            }
            expect(Stem.get(-101)).to.equal(STEMS[9]);
            expect(Stem.get(101)).to.equal(STEMS[1]);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 天干化合", function (done) {
        try {
            /* test 天干化合 */
            expect(Stem.get('甲').getSythesisResult({})).to.be.null;
            expect(Stem.get('甲').getSythesisResult(Stem.get('乙'))).to.be.null;
            expect(Stem.get('甲').getSythesisResult(Stem.get('己'))).to.equal(Element.Earth);
            expect(Stem.get('乙').getSythesisResult(Stem.get('庚'))).to.equal(Element.Gold);
            expect(Stem.get('丙').getSythesisResult(Stem.get('辛'))).to.equal(Element.Water);
            expect(Stem.get('丁').getSythesisResult(Stem.get('壬'))).to.equal(Element.Wood);
            expect(Stem.get('戊').getSythesisResult(Stem.get('癸'))).to.equal(Element.Fire);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 天干相剋", function (done) {
        try {
            /* test 天干相剋 */
            expect(Stem.get('庚').getSuppress()).to.equal(Stem.get('甲'));
            expect(Stem.get('辛').getSuppress()).to.equal(Stem.get('乙'));
            expect(Stem.get('甲').getSuppress()).to.equal(Stem.get('戊'));
            expect(Stem.get('乙').getSuppress()).to.equal(Stem.get('己'));
            expect(Stem.get('戊').getSuppress()).to.equal(Stem.get('壬'));
            expect(Stem.get('己').getSuppress()).to.equal(Stem.get('癸'));
            expect(Stem.get('壬').getSuppress()).to.equal(Stem.get('丙'));
            expect(Stem.get('癸').getSuppress()).to.equal(Stem.get('丁'));
            expect(Stem.get('丙').getSuppress()).to.equal(Stem.get('庚'));
            expect(Stem.get('丁').getSuppress()).to.equal(Stem.get('辛'));

            expect(Stem.get('甲').getSuppressedBy()).to.equal(Stem.get('庚'));
            expect(Stem.get('乙').getSuppressedBy()).to.equal(Stem.get('辛'));
            expect(Stem.get('戊').getSuppressedBy()).to.equal(Stem.get('甲'));
            expect(Stem.get('己').getSuppressedBy()).to.equal(Stem.get('乙'));
            expect(Stem.get('壬').getSuppressedBy()).to.equal(Stem.get('戊'));
            expect(Stem.get('癸').getSuppressedBy()).to.equal(Stem.get('己'));
            expect(Stem.get('丙').getSuppressedBy()).to.equal(Stem.get('壬'));
            expect(Stem.get('丁').getSuppressedBy()).to.equal(Stem.get('癸'));
            expect(Stem.get('庚').getSuppressedBy()).to.equal(Stem.get('丙'));
            expect(Stem.get('辛').getSuppressedBy()).to.equal(Stem.get('丁'));
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });


    it("test 地支", function (done) {
        try {
            expect(Branch.items).to.not.null;

            /* test Branch.get(key) */
            const BRANCH_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
            const BRANCHS = BRANCH_NAMES.map(branch => Branch.get(branch));
            const BRANCH_ELEMENTS = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];
            const BRANCH_BASE_STEMS = ['癸', '己', '甲', '乙', '戊', '丙', '丁', '己', '庚', '辛', '戊', '壬'];
            const BRANCH_COLLECT_STEMS = [null, '辛', '丙', null, '乙', '戊', '己', '丁', '壬', null, '辛', '甲'];
            const BRANCH_REMAIN_STEMS = [null, '癸', '戊', null, '癸', '庚', null, '乙', '戊', null, '丁', null];

            for (var i = 0; i < BRANCHS.length; i++) {
                expect(Branch.get(i) instanceof Branch).to.equal(true);
                expect(Branch.get(i)).to.equal(BRANCHS[i]);
                expect(Branch.get(BRANCH_NAMES[i])).to.equal(BRANCHS[i]);
                expect(Branch.get(i).getIndex()).to.equal(i);
                expect(Branch.get(i).getDisplayName()).to.equal(BRANCH_NAMES[i]);
                expect(Branch.get(i).getMoonSun()).to.equal(i % 2 == 0 ? MoonSun.Sun : MoonSun.Moon);
                expect(Branch.get(i).getElement()).to.equal(Element.get(BRANCH_ELEMENTS[i]));
                expect(Branch.get(i).getBaseStem()).to.equal(Stem.get(BRANCH_BASE_STEMS[i]));
                expect(Branch.get(i).getCollectStem()).to.equal(BRANCH_COLLECT_STEMS[i] && Stem.get(BRANCH_COLLECT_STEMS[i] || null));
                expect(Branch.get(i).getRemainStem()).to.equal(BRANCH_REMAIN_STEMS[i] && Stem.get(BRANCH_REMAIN_STEMS[i] || null));

                for (var j = -20; j < 20; j++) {
                    expect(Branch.get(i).shift(j)).to.equal(Branch.get(i + j));
                }
            }
            expect(Branch.get(-121)).to.equal(BRANCHS[11]);
            expect(Branch.get(121)).to.equal(BRANCHS[1]);

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支六合局", function (done) {
        try {
            /* test 六合局 */
            let combinations = Branch.checkCombinations([Branch.get('子'), Branch.get('丑'), Branch.get('午'), Branch.get('卯'), Branch.get('戌')]);
            expect(combinations.sixSythesis.length).to.equal(2);
            expect(combinations.sixSythesis[0].a).to.equal(Branch.get('子'));
            expect(combinations.sixSythesis[0].b).to.equal(Branch.get('丑'));
            expect(combinations.sixSythesis[0].element).to.equal(Element.Earth);
            expect(combinations.sixSythesis[1].a).to.equal(Branch.get('卯'));
            expect(combinations.sixSythesis[1].b).to.equal(Branch.get('戌'));
            expect(combinations.sixSythesis[1].element).to.equal(Element.Fire);

            expect(Branch.checkSixSythesis(Branch.get('申'), {})).to.be.null;
            expect(Branch.checkSixSythesis(Branch.get('申'), Branch.get('未'))).to.be.null;
            expect(Branch.checkSixSythesis(Branch.get('子'), Branch.get('丑'))).to.equal(Element.Earth);
            expect(Branch.checkSixSythesis(Branch.get('寅'), Branch.get('亥'))).to.equal(Element.Wood);
            expect(Branch.checkSixSythesis(Branch.get('卯'), Branch.get('戌'))).to.equal(Element.Fire);
            expect(Branch.checkSixSythesis(Branch.get('辰'), Branch.get('酉'))).to.equal(Element.Gold);
            expect(Branch.checkSixSythesis(Branch.get('申'), Branch.get('巳'))).to.equal(Element.Water);
            expect(Branch.checkSixSythesis(Branch.get('午'), Branch.get('未'))).to.equal(Element.Fire);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支三合局", function (done) {
        try {
            let combinations = null;

            expect(Branch.checkThreeSythesis(Branch.get('寅'), Branch.get('戌')).element).to.equal(Element.Fire);
            expect(Branch.checkThreeSythesis(Branch.get('寅'), Branch.get('酉'))).to.be.null;
            expect(Branch.checkThreeSythesis(Branch.get('寅'), {})).to.be.null;

            /* test 三合局 */
            combinations = Branch.checkCombinations([Branch.get('申'), Branch.get('子'), Branch.get('辰')]);
            expect(combinations.threeSythesis.length).to.equal(1);
            expect(combinations.threeSythesis[0].count).to.equal(3);
            expect(combinations.threeSythesis[0].combination.element).to.equal(Element.Water);

            /* test 半三合局 */
            combinations = Branch.checkCombinations([Branch.get('辰'), Branch.get('子'), Branch.get('亥')]);
            expect(combinations.threeSythesis.length).to.equal(1);
            expect(combinations.threeSythesis[0].count).to.equal(2);
            expect(combinations.threeSythesis[0].combination.element).to.equal(Element.Water);

            /* test 沒有"子"不算三合水局 */
            combinations = Branch.checkCombinations([Branch.get('辰'), Branch.get('申'), Branch.get('亥')]);
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
            let combinations = Branch.checkCombinations([Branch.get('巳'), Branch.get('午'), Branch.get('未')]);
            expect(combinations.threeSupports.length).to.equal(1);
            expect(combinations.threeSupports[0].count).to.equal(3);
            expect(combinations.threeSupports[0].combination.element).to.equal(Element.Fire);

            expect(Branch.checkThreeSupport(Branch.get('申'), Branch.get('酉')).element).to.equal(Element.Gold);
            expect(Branch.checkThreeSupport(Branch.get('申'), Branch.get('卯'))).to.be.null;
            expect(Branch.checkThreeSupport(Branch.get('申'), {})).to.be.null;

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 地支相沖", function (done) {
        try {
            /* test 相沖 */
            let combinations = Branch.checkCombinations([Branch.get('子'), Branch.get('卯'), Branch.get('酉')]);
            expect(combinations.opposite.length).to.equal(1);
            expect(combinations.opposite[0].a).to.equal(Branch.get('卯'));
            expect(combinations.opposite[0].b).to.equal(Branch.get('酉'));

            expect(Branch.checkOpposite(Branch.get('子'), {})).to.be.null;
            expect(Branch.checkOpposite(Branch.get('子'), Branch.get('午'))).to.equal(true);
            expect(Branch.checkOpposite(Branch.get('子'), Branch.get('亥'))).to.equal(false);

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

            expect(Branch.checkPunishment(Branch.get('寅'), {})).to.be.null;

            expect(Branch.checkPunishment(Branch.get('寅'), Branch.get('巳')).type).to.equal("無恩之刑");
            expect(Branch.checkPunishment(Branch.get('午'), Branch.get('寅'))).to.be.null;

            combinations = Branch.checkCombinations([Branch.get('午'), Branch.get('卯')]);
            expect(combinations.punishment.length).to.equal(0);

            combinations = Branch.checkCombinations([Branch.get('寅'), Branch.get('巳'), Branch.get('申')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("無恩之刑");

            combinations = Branch.checkCombinations([Branch.get('丑'), Branch.get('戌'), Branch.get('未')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("持勢之刑");

            combinations = Branch.checkCombinations([Branch.get('子'), Branch.get('卯'), Branch.get('戌')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("無禮之刑");

            combinations = Branch.checkCombinations([Branch.get('午'), Branch.get('卯'), Branch.get('午')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("自刑");

            combinations = Branch.checkCombinations([Branch.get('午'), Branch.get('酉'), Branch.get('酉')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("自刑");

            combinations = Branch.checkCombinations([Branch.get('辰'), Branch.get('辰')]);
            expect(combinations.punishment.length).to.equal(1);
            expect(combinations.punishment[0].type).to.equal("自刑");

            combinations = Branch.checkCombinations([Branch.get('子'), Branch.get('亥'), Branch.get('亥')]);
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
            expect(Branch.checkHarm(Branch.get('子'), {})).to.be.null
            expect(Branch.checkHarm(Branch.get('子'), Branch.get('未'))).to.equal(true);
            expect(Branch.checkHarm(Branch.get('子'), Branch.get('丑'))).to.equal(false);

            let combinations = Branch.checkCombinations([Branch.get('申'), Branch.get('巳'), Branch.get('亥')]);
            expect(combinations.harm.length).to.equal(1);
            expect(combinations.harm[0].a).to.equal(Branch.get('亥'));
            expect(combinations.harm[0].b).to.equal(Branch.get('申'));
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test Relationship", function (done) {
        try {
            expect(Relationship.Enhance.isPositive()).to.equal(true);
            expect(Relationship.Enhance.isNegative()).to.equal(false);
            expect(Relationship.Enhance.isNeutral()).to.equal(false);
            expect(Relationship.EnhancedBy.isPositive()).to.equal(true);
            expect(Relationship.EnhancedBy.isNegative()).to.equal(false);
            expect(Relationship.EnhancedBy.isNeutral()).to.equal(false);

            expect(Relationship.Suppress.isPositive()).to.equal(false);
            expect(Relationship.Suppress.isNegative()).to.equal(true);
            expect(Relationship.Suppress.isNeutral()).to.equal(false);
            expect(Relationship.SuppressedBy.isPositive()).to.equal(false);
            expect(Relationship.SuppressedBy.isNegative()).to.equal(true);
            expect(Relationship.SuppressedBy.isNeutral()).to.equal(false);

            expect(Relationship.Same.isPositive()).to.equal(false);
            expect(Relationship.Same.isNegative()).to.equal(false);
            expect(Relationship.Same.isNeutral()).to.equal(true);

            expect(Relationship.Same.getId()).to.equal('Same');
            expect(Relationship.Enhance.getId()).to.equal('Enhance');
            expect(Relationship.EnhancedBy.getId()).to.equal('EnhancedBy');
            expect(Relationship.Suppress.getId()).to.equal('Suppress');
            expect(Relationship.SuppressedBy.getId()).to.equal('SuppressedBy');

            expect(Relationship.Same.getDisplayName()).to.equal('同');
            expect(Relationship.Enhance.getDisplayName()).to.equal('生');
            expect(Relationship.EnhancedBy.getDisplayName()).to.equal('被生');
            expect(Relationship.Suppress.getDisplayName()).to.equal('剋');
            expect(Relationship.SuppressedBy.getDisplayName()).to.equal('被剋');

            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 時辰", function (done) {
        try {
            expect(Stem.items).to.not.null;

            /* test Stem.get(key) */
            const BRANCH_HOUR_NAMES = ['早子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '晚子'];
            const BRANCH_HOURS = BRANCH_HOUR_NAMES.map(branchHour => HourBranch.get(branchHour));

            for (var i = 0; i < BRANCH_HOURS.length; i++) {
                expect(HourBranch.get(i) instanceof HourBranch).to.equal(true);
                expect(HourBranch.get(i)).to.equal(BRANCH_HOURS[i]);
                expect(HourBranch.get(BRANCH_HOUR_NAMES[i])).to.equal(BRANCH_HOURS[i]);
            }
            expect(HourBranch.get(-131)).to.equal(BRANCH_HOURS[12]);
            expect(HourBranch.get(131)).to.equal(BRANCH_HOURS[1]);
            done();
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    it("test 十二生肖", function (done) {
        try {
            expect(Zodiac.items).to.not.null;

            /* test Stem.get(key) */
            const ZODIAC_NAMES = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
            const ZODIACS = ZODIAC_NAMES.map(zodiac => Zodiac.get(zodiac));

            for (var i = 0; i < ZODIACS.length; i++) {
                expect(Zodiac.get(i) instanceof Zodiac).to.equal(true);
                expect(Zodiac.get(i)).to.equal(ZODIACS[i]);
                expect(Zodiac.get(ZODIAC_NAMES[i])).to.equal(ZODIACS[i]);
                expect(Zodiac.get(i).getIndex()).to.equal(i);
                expect(Zodiac.get(i).getDisplayName()).to.equal(ZODIAC_NAMES[i]);
                expect(Zodiac.get(i).getBranch()).to.equal(Branch.get(i));
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