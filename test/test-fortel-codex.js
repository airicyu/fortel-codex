'use strict';

const should = require('chai').should;
const expect = require('chai').expect;
const supertest = require('supertest');
const fortelCodex = require('./../index');
const DarkBright = fortelCodex.DarkBright;
const Essence = fortelCodex.Essence;

describe('fortel-codex test', function () {

    before(function(done){
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

            expect(DarkBright.bright).to.equal(DarkBright.items[1]);
            expect(DarkBright.bright).to.equal(DarkBright.get(1));
            expect(DarkBright.bright).to.equal(DarkBright.get('陽'));
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

            expect(Essence.gold.displayName).to.equal('金');
            expect(Essence.wood.displayName).to.equal('木');
            expect(Essence.earth.displayName).to.equal('土');
            expect(Essence.water.displayName).to.equal('水');
            expect(Essence.fire.displayName).to.equal('火');
            
            expect(Essence.gold.to(Essence.gold)).to.eql({relation: '同', isPositive: false, isNegative: false});
            expect(Essence.gold.to(Essence.wood)).to.eql({relation: '剋', isPositive: false, isNegative: true});
            expect(Essence.gold.to(Essence.earth)).to.eql({relation: '被生', isPositive: true, isNegative: false});
            expect(Essence.gold.to(Essence.water)).to.eql({relation: '生', isPositive: true, isNegative: false});
            expect(Essence.gold.to(Essence.fire)).to.eql({relation: '被剋', isPositive: false, isNegative: true});

            expect(Essence.wood.to(Essence.wood)).to.eql({relation: '同', isPositive: false, isNegative: false});
            expect(Essence.wood.to(Essence.earth)).to.eql({relation: '剋', isPositive: false, isNegative: true});
            expect(Essence.wood.to(Essence.water)).to.eql({relation: '被生', isPositive: true, isNegative: false});
            expect(Essence.wood.to(Essence.fire)).to.eql({relation: '生', isPositive: true, isNegative: false});
            expect(Essence.wood.to(Essence.gold)).to.eql({relation: '被剋', isPositive: false, isNegative: true});

            expect(Essence.earth.to(Essence.earth)).to.eql({relation: '同', isPositive: false, isNegative: false});
            expect(Essence.earth.to(Essence.water)).to.eql({relation: '剋', isPositive: false, isNegative: true});
            expect(Essence.earth.to(Essence.fire)).to.eql({relation: '被生', isPositive: true, isNegative: false});
            expect(Essence.earth.to(Essence.gold)).to.eql({relation: '生', isPositive: true, isNegative: false});
            expect(Essence.earth.to(Essence.wood)).to.eql({relation: '被剋', isPositive: false, isNegative: true});

            expect(Essence.water.to(Essence.water)).to.eql({relation: '同', isPositive: false, isNegative: false});
            expect(Essence.water.to(Essence.fire)).to.eql({relation: '剋', isPositive: false, isNegative: true});
            expect(Essence.water.to(Essence.gold)).to.eql({relation: '被生', isPositive: true, isNegative: false});
            expect(Essence.water.to(Essence.wood)).to.eql({relation: '生', isPositive: true, isNegative: false});
            expect(Essence.water.to(Essence.earth)).to.eql({relation: '被剋', isPositive: false, isNegative: true});

            expect(Essence.fire.to(Essence.fire)).to.eql({relation: '同', isPositive: false, isNegative: false});
            expect(Essence.fire.to(Essence.gold)).to.eql({relation: '剋', isPositive: false, isNegative: true});
            expect(Essence.fire.to(Essence.wood)).to.eql({relation: '被生', isPositive: true, isNegative: false});
            expect(Essence.fire.to(Essence.earth)).to.eql({relation: '生', isPositive: true, isNegative: false});
            expect(Essence.fire.to(Essence.water)).to.eql({relation: '被剋', isPositive: false, isNegative: true});

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
});