a bunch of scripts to test performance of something that can be used as basis for round robin selection

* **if.js** does an if check for each invocation to see if the counter has reached a max and needs a reset, otherwise the counter is the pick
* **mod_var1** performs a modulo operation to detemine the next round robin
* **mod_var2** performs a modulo operation to detemine the next round robin but also checks that the counter (which is needed for the modulo) does not surpass a certain max (this would normally be Number.MAX_VALUE or something)

Using module seems more efficient but exposes us to the risk of overflowing number
