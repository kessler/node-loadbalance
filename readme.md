# loadbalance

[![npm status](http://img.shields.io/npm/v/loadbalance.svg?style=flat-square)](https://www.npmjs.org/package/loadbalance) [![Travis build status](https://img.shields.io/travis/kessler/node-loadbalance.svg?style=flat-square&label=travis)](http://travis-ci.org/kessler/node-loadbalance) [![Dependency status](https://img.shields.io/david/kessler/node-loadbalance.svg?style=flat-square)](https://david-dm.org/kessler/node-loadbalance)

This is a collection of load balancing engines in (what is hopefully) their most distilled form. 

The goal was to create a highly reusable implementation that imposes as little as possible on the user.

## Install

With [npm](https://npmjs.org) do:

`npm i loadbalance`

```js
var loadbalance = require('loadbalance')
```

## Usage
To use, instantiate an engine or call a factory method with a pool. Then call pick(), which will return the selected object, calling pick() repeatedly will yield the same or a different object from the pool, depending on the algorithm which powers that engine.

```javascript
var loadbalance = require('loadbalance')
var engine = loadbalance.random(['a', 'b', 'c'])
var pick = engine.pick()
```

### pick()
Pick is called without any arguments and will always return an object which is a member of the pool.

## Engines

### Random Engine
The random engine picks an object from the pool at random, each time pick() is called.

```javascript
var loadbalance = require('loadbalance')
var engine = loadbalance.random(['a', 'b', 'c'])
var pick = engine.pick()
```

#### new RandomEngine(pool, seed)
```javascript
var engine = new loadbalance.RandomEngine(pool)
```
Pool - an objects to pick from, eg ```[1,2,3]```
Seed - an optional seed that will be used to recreate a random sequence of selections

### RoundRobinEngine
An engine that picks objects from its pool using Round Robin algorithm (doh!)

```javascript
var loadbalance = require('loadbalance')
var engine = loadbalance.roundRobin(['a', 'b', 'c'])
var pick = engine.pick()
```

The roundRobin() factory method can be used to obtain both RoundRobinEngine and WeightedRoundRobinEngine. The decision is based on the contents of the pool.

#### new RoundRobinEngine(pool) 
```javascript
var engine = new loadbalance.RoundRobinEngine(pool)
```
Pool - objects to pick from, eg ```[1,2,3]```

### WeightedRoundRobinEngine
Same as round robin engine, only members of the pool can have weights. 

```javascript
var loadbalance = require('loadbalance')
var engine = loadbalance.roundRobin([{ object: 'a', weight: 2 }, {object: 'b', weight: 1 }])
var pick = engine.pick()
```

call pick six times using the above engine will yield: 'a', 'a', 'b', 'a', 'a', 'b'

#### new WeightedRoundRobinEngine(pool) 
```javascript
var engine = new loadbalance.WeightedRoundRobinEngine(pool)
```
Pool - objects to pick from. Each object is of the form:
```javascript
var object1 = {
    object: 'something',
    weight: 2
}
```

Weight should always be an integer which is greater than zero. 
Object (you can also use value, its an alias property) can be anything you want, just like other pools. It cannot, however, be null or undefined at the time the pool is created.

### PriorityEngine
Not yet implemented

### Extensibility
Here is an example of a custom engine:
```javascript
var AbstractEngine = require('loadbalance').AbstractEngine
var inherits = require('util').inherits

function MyEngine(pool) {
    AbstractEngine.call(this, pool)
}

inherits(MyEngine, AbstractEngine)

MyEngine.prototype.pick = function () {
    // pick something from the pool somehow and return it
}

```
The contract of pick() states that it MUST return something each invocation.

## misc

This module shares some functinality with [pool](https://github.com/coopernurse/node-pool) module. It is worth taking a look at it if you are looking for something more high level.

This module is heavily inspired by this [article about load balance algorithms](https://devcentral.f5.com/articles/intro-to-load-balancing-for-developers-ndash-the-algorithms)


## license

[MIT](http://opensource.org/licenses/MIT) © [yaniv kessler](blog.yanivkessler.com)
