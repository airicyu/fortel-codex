# fortel-codex.js

[![npm version](https://img.shields.io/npm/v/fortel-codex.svg)](https://www.npmjs.com/package/fortel-codex)
[![node](https://img.shields.io/node/v/fortel-codex.svg)](https://www.npmjs.com/package/fortel-codex)
[![Build](https://travis-ci.org/airicyu/fortel-codex.svg?branch=master)](https://travis-ci.org/airicyu/fortel-codex)
[![Codecov branch](https://img.shields.io/codecov/c/github/airicyu/fortel-codex/master.svg)](https://codecov.io/gh/airicyu/fortel-codex)

[![GitHub issues](https://img.shields.io/github/issues/airicyu/fortel-codex.svg)](https://github.com/airicyu/fortel-codex/issues)
[![GitHub forks](https://img.shields.io/github/forks/airicyu/fortel-codex.svg)](https://github.com/airicyu/fortel-codex/network)
[![GitHub stars](https://img.shields.io/github/stars/airicyu/fortel-codex.svg)](https://github.com/airicyu/fortel-codex/stargazers)
[![GitHub License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://raw.githubusercontent.com/airicyu/ahp/master/LICENSE)
[![dependencies Status](https://david-dm.org/airicyu/fortel-codex/status.svg)](https://david-dm.org/airicyu/fortel-codex)
[![devDependencies Status](https://david-dm.org/airicyu/fortel-codex/dev-status.svg)](https://david-dm.org/airicyu/fortel-codex?type=dev)

This node.js module is a library for some basic codex of Chinese Astrology. It included "陰陽", "五行", "天干", "地支", "生肖".


## Project page

- [Project Home](http://blog.airic-yu.com/2010/fortel-codex)
- [Github](https://github.com/airicyu/fortel-codex)
- [NPM](https://www.npmjs.com/package/fortel-codex)

Wiki pages for Chinese Astrology:
- [陰陽](https://zh.wikipedia.org/wiki/%E9%98%B4%E9%98%B3)
- [五行](https://zh.wikipedia.org/wiki/%E4%BA%94%E8%A1%8C)
- [天干](https://zh.wikipedia.org/wiki/%E5%A4%A9%E5%B9%B2)
- [地支](https://zh.wikipedia.org/wiki/%E5%9C%B0%E6%94%AF)
- [生肖](https://zh.wikipedia.org/wiki/%E7%94%9F%E8%82%96)

------------------------

## Install

```bash
$ npm install --save fortel-codex
```

------------------------
## Samples

### DarkBright(陰陽)
```javascript
const fortelCodex = require('fortel-codex');
const DarkBright = fortelCodex.DarkBright;

var dark = DarkBright.get('陰');
dark = DarkBright.dark; //or equivalently
console.log('陰:', dark);

var bright = DarkBright.get('陽');
bright = DarkBright.bright; //or equivalently
console.log('陽:', bright);
```

Console output
```
陰: DarkBright { index: 0, displayName: '陰' }
陽: DarkBright { index: 1, displayName: '陽' }
```

### Essence(五行)

基本五行

```javascript
const Essence = fortelCodex.Essence;

/* 基本五行 Object */
var gold = Essence.gold;
gold = Essence.get('金'); //or equivalently
console.log('金: ', gold);

var wood = Essence.wood;
wood = Essence.get('木'); //or equivalently
console.log('木: ', wood);

var earth = Essence.earth;
earth = Essence.get('土'); //or equivalently
console.log('土: ', earth);

var water = Essence.water;
water = Essence.get('水'); //or equivalently
console.log('水: ', water);

var fire = Essence.fire;
fire = Essence.get('火'); //or equivalently
console.log('火: ', fire);
```

Console output
```
金:  Essence { index: 0, displayName: '金' }
木:  Essence { index: 1, displayName: '木' }
土:  Essence { index: 2, displayName: '土' }
水:  Essence { index: 3, displayName: '水' }
火:  Essence { index: 4, displayName: '火' }
```

五行關係

```javascript
console.log('五行生剋關係1:');
console.log(`金${gold.to(gold).relation}金`);
console.log(`金${gold.to(wood).relation}木`);
console.log(`金${gold.to(earth).relation}土`);
console.log(`金${gold.to(water).relation}水`);
console.log(`金${gold.to(fire).relation}火`);

console.log('\n');

console.log('五行生剋關係2:');
console.log(`金生${gold.feed.displayName}`);
console.log(`金被${gold.feeded.displayName}所生`);
console.log(`金剋${gold.suppress.displayName}`);
console.log(`金被${gold.suppressed.displayName}所剋`);
```

Console output
```
五行生剋關係1:
金同金
金剋木
金被生土
金生水
金被剋火


五行生剋關係2:
金生水
金被土所生
金剋木
金被火所剋
```

### Sky(天干)

Array of Sky object(天干)
```javascript
const fortelCodex = require('fortel-codex');
const Sky = fortelCodex.Sky;

/* 基本天干 Object */
var items = Sky.items; //Array of "天干"
var output = "";
for(let item of items){
    output += item.displayName;
}
console.log(output);
```

Console output
```
甲乙丙丁戊己庚辛壬癸
```

Get by index
```javascript
const util = require('util');
const fortelCodex = require('fortel-codex');
const Sky = fortelCodex.Sky;

/* Get 天干 by index */
console.log('0: '+util.inspect(Sky.get(0)));
console.log('1: '+util.inspect(Sky.get(1)));
console.log('......\n');
```

Console output
```
0: Sky {
  index: 0,
  displayName: '甲',
  darkBright: DarkBright { index: 1, displayName: '陽' },
  essence: Essence { index: 1, displayName: '木' } }
1: Sky {
  index: 1,
  displayName: '乙',
  darkBright: DarkBright { index: 0, displayName: '陰' },
  essence: Essence { index: 1, displayName: '木' } }
```

Get by name
```javascript
const util = require('util');
const fortelCodex = require('fortel-codex');
const Sky = fortelCodex.Sky;

/* Get 天干 by display name */
console.log('0: '+util.inspect(Sky.get('甲')));
console.log('1: '+util.inspect(Sky.get('乙')));
console.log('......\n');
```

Console output
```
0: Sky {
  index: 0,
  displayName: '甲',
  darkBright: DarkBright { index: 1, displayName: '陽' },
  essence: Essence { index: 1, displayName: '木' } }
1: Sky {
  index: 1,
  displayName: '乙',
  darkBright: DarkBright { index: 0, displayName: '陰' },
  essence: Essence { index: 1, displayName: '木' } }
```

天干合化
```javascript
/* 天干合化 */
console.log('甲己合化' + Sky.get('甲').sythesis(Sky.get('己')).displayName); //甲己合化土
console.log('乙庚合化' + Sky.get('乙').sythesis(Sky.get('庚')).displayName); //乙庚合化金
console.log('丙辛合化' + Sky.get('丙').sythesis(Sky.get('辛')).displayName); //丙辛合化水
console.log('丁壬合化' + Sky.get('丁').sythesis(Sky.get('壬')).displayName); //丁壬合化木
console.log('戊癸合化' + Sky.get('戊').sythesis(Sky.get('癸')).displayName); //戊癸合化火
```

Console output
```
甲己合化土
乙庚合化金
丙辛合化水
丁壬合化木
戊癸合化火
```

天干相剋
```javascript
/* 天干相剋 */
console.log('甲剋' + Sky.get('甲').suppress.displayName);
console.log('戊被' + Sky.get('戊').suppressed.displayName + '所剋');
```

Console output
```
甲剋戊
戊被甲所剋
```

### Ground(地支)

Array of Ground object(地支)
```javascript
const fortelCodex = require('fortel-codex');
const Ground = fortelCodex.Ground;

/* 基本地支 Object */
var items = Ground.items; //Array of "地支"
var output = "";
for(let item of items){
    output += item.displayName;
}
console.log(output);
```

Console output
```
子丑寅卯辰巳午未申酉戌亥
```

Get by index
```javascript
/* Get 地支 by index */
console.log('0: '+util.inspect(Ground.get(0)));
console.log('1: '+util.inspect(Ground.get(1)));
console.log('......\n');
```

Console output
```
0: Ground {
  index: 0,
  displayName: '子',
  darkBright: DarkBright { index: 1, displayName: '陽' },
  essence: Essence { index: 3, displayName: '水' },
  baseSky:
   Sky {
     index: 9,
     displayName: '癸',
     darkBright: DarkBright { index: 0, displayName: '陰' },
     essence: Essence { index: 3, displayName: '水' } },
  collectSky: null,
  remainSky: null,
  direction: '北' }
1: Ground {
  index: 1,
  displayName: '丑',
  darkBright: DarkBright { index: 0, displayName: '陰' },
  essence: Essence { index: 2, displayName: '土' },
  baseSky:
   Sky {
     index: 5,
     displayName: '己',
     darkBright: DarkBright { index: 0, displayName: '陰' },
     essence: Essence { index: 2, displayName: '土' } },
  collectSky:
   Sky {
     index: 7,
     displayName: '辛',
     darkBright: DarkBright { index: 0, displayName: '陰' },
     essence: Essence { index: 0, displayName: '金' } },
  remainSky:
   Sky {
     index: 9,
     displayName: '癸',
     darkBright: DarkBright { index: 0, displayName: '陰' },
     essence: Essence { index: 3, displayName: '水' } },
  direction: '東北偏北' }
```

Get by name
```javascript
const util = require('util');
const fortelCodex = require('fortel-codex');
const Sky = fortelCodex.Sky;

/* Get 地支 by display name */
console.log('0: '+util.inspect(Sky.get('子')));
console.log('1: '+util.inspect(Sky.get('丑')));
console.log('......\n');
```

Console output
```
0: Ground {
  index: 0,
  displayName: '子',
  darkBright: DarkBright { index: 1, displayName: '陽' },
  essence: Essence { index: 3, displayName: '水' },
  baseSky:
   Sky {
     index: 9,
     displayName: '癸',
     darkBright: DarkBright { index: 0, displayName: '陰' },
     essence: Essence { index: 3, displayName: '水' } },
  collectSky: null,
  remainSky: null,
  direction: '北' }
1: Ground {
  index: 1,
  displayName: '丑',
  darkBright: DarkBright { index: 0, displayName: '陰' },
  essence: Essence { index: 2, displayName: '土' },
  baseSky:
   Sky {
     index: 5,
     displayName: '己',
     darkBright: DarkBright { index: 0, displayName: '陰' },
     essence: Essence { index: 2, displayName: '土' } },
  collectSky:
   Sky {
     index: 7,
     displayName: '辛',
     darkBright: DarkBright { index: 0, displayName: '陰' },
     essence: Essence { index: 0, displayName: '金' } },
  remainSky:
   Sky {
     index: 9,
     displayName: '癸',
     darkBright: DarkBright { index: 0, displayName: '陰' },
     essence: Essence { index: 3, displayName: '水' } },
  direction: '東北偏北' }
```

地支六合局
```javascript
/* Get 地支六合局 */
let combinations = Ground.checkCombinations([Ground.get('子'), Ground.get('丑')]);
console.log("子丑合化"+combinations.sixSythesis[0].essence.displayName);

console.log("寅亥合化"+Ground.checkSixSythesis(Ground.get('寅'), Ground.get('亥')).displayName);
```

Console output
```
子丑合化土
寅亥合化木
```

地支三合局
```javascript
/* Get 地支三合局 */
let combinations = Ground.checkCombinations([Ground.get('申'), Ground.get('子'), Ground.get('辰')]);
console.log("申子辰三合"+combinations.threeSythesis[0].combination.essence.displayName+"局");

console.log("寅戌合"+Ground.checkThreeSythesis(Ground.get('寅'), Ground.get('戌')).essence.displayName+"局");
```

Console output
```
申子辰三合水局
寅戌合火局
```

地支相沖
```javascript
/* Get 地支相沖 */
console.log(Ground.checkOpposite(Ground.get('子'), Ground.get('午')));
console.log(Ground.checkOpposite(Ground.get('子'), Ground.get('亥')));
```

Console output
```
true
false
```

地支相刑
```javascript
/* Get 地支相刑 */
let combinations = Ground.checkCombinations([Ground.get('寅'), Ground.get('巳'), Ground.get('申')]);
console.log(combinations.punishment[0].type);

combinations = Ground.checkCombinations([Ground.get('午'), Ground.get('午')]);
console.log(combinations.punishment[0].type);
```

Console output
```
無恩之刑
自刑
```

地支相害
```javascript
/* Get 地支相害 */
/* Get 地支相刑 */
console.log(Ground.checkHarm(Ground.get('子'), Ground.get('未')));
console.log(Ground.checkHarm(Ground.get('子'), Ground.get('丑')));
```

Console output
```
true
false
```

### GroundHour(時辰)
Array of GroundHour object(時辰)
```javascript
const fortelCodex = require('fortel-codex');
const GroundHour = fortelCodex.GroundHour;

var items = GroundHour.items; //Array of "時辰"
console.log(items.map(item=>item.displayName).join(', '));
```

Console output
```
早子, 丑, 寅, 卯, 辰, 巳, 午, 未, 申, 酉, 戌, 亥, 晚子
```

### Zodiac(生肖)
Array of Zodiac object(生肖)
```javascript
const fortelCodex = require('fortel-codex');
const Zodiac = fortelCodex.Zodiac;

var items = Zodiac.items; //Array of "生肖"
console.log(items.map(item=>item.displayName).join(', '));
```

Console output
```
鼠, 牛, 虎, 兔, 龍, 蛇, 馬, 羊, 猴, 雞, 狗, 豬
```

------------------------

## API
(Will update later)

------------------------
## Author Contact

- Eric Yu: airic.yu@gmail.com
