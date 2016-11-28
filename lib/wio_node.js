"use strict";

const Wio = module.exports = (()=>{
  function Wio (token, config){
    this.token = token || "";

    if(!config) config = {};
    this.endpoint   = config.endpoint   || "us.wio.seeed.io";
    this.protocol   = config.protocol   || "https";
    this.port       = config.port       || "443";
    this.apiVersion = config.apiVersion || "v1";

    this.__proto__.DigitalIn  = require("./digitalIn")(this);
  }

  Wio.prototype.set = (key, val)=>{
    if(typeof val !== "undefined") this[key] = val;
    return this;
  };

  Wio.prototype.get = (key)=>{
    return this[key];
  };

  Wio.prototype.request = require("./request");
  return Wio;
})();