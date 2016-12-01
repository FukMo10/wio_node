# wio_node SDK
Unofficial SDK of Wio Node written by Node.js.  
The following modules are available

- Generic Digital Input
- Generic Digital Output

## Installation
1. Clone this repository
2. `npm install` in this repository

## Getting Start
1. Get access token from Wio Link app or nodes/list API
2. Write codes!

### Initialize

```
const Wio = require("path/to/repository/lib/wio_node");
const wio = new Wio("YOUR_ACCESS_TOKEN");
```

###  Generic Digital Input

```
const dIn = new wio.GenericDIn();

// Read back the status of this io
dIn.fetch()
.then((res)=>{
  console.log(res); //return {onoff: 0/1}
})
.catch((err)=>{
  // Error handling
  console.log(err);
});
```

###  Generic Digital Output

```
const dOut = new wio.GenericDOut();

// Read back the status of this io
dOut.fetch()
.then((res)=>{
  console.log(res); //return {onoff: 0/1}
})
.catch((err)=>{
  console.log(err);
});

// Control output by writing value
dOut.send(val); // input 0 or 1

// Control output to high
dOut.on();

// Control output to low
dOut.off();

// Output a high pulse in milliseconds
dOut.sendHighPulse(ms);

// Output a low pulse in milliseconds
dOut.sendLowPulse(ms);
```

## Others
You can receive response in both callback and promise.

```
// Promise
dIn.fetch()
.then((res)=>{
  console.log(res); //return {onoff: 0/1}
})
.catch((err)=>{
  // Error handling
  console.log(err);
});

// Callback
dIn.fetch((err, res)=>{
  if(err) // Error handling
  console.log(res);
});
```