"use strict";
const WebSocket = require("websocket").w3cwebsocket;

const Wio = module.exports = (()=>{
  function Wio (token, config){
    this.token = token || "";

    if(!config) config = {};
    this.endpoint   = config.endpoint   || "us.wio.seeed.io";
    this.protocol   = config.protocol   || "https";
    this.port       = config.port       || "443";
    this.apiVersion = config.apiVersion || "v1";

    this.__proto__.GenericDIn   = require("./genericDIn")(this);
    this.__proto__.GenericDOut  = require("./genericDOut")(this);
  }

  Wio.prototype.set = function(key, val){
    if(typeof val !== "undefined") this[key] = val;
    return this;
  };

  Wio.prototype.get = function(key){
    return this[key];
  };

  Wio.prototype.connectWS = function(handler){
    const wsURL = "wss://" + this.endpoint + "/" + this.apiVersion + "/node/event";
    const client = new WebSocket(wsURL);

    client.onerror = function() {
      handler(new Error("Connection failed"), null);
    };

    client.onopen = function(){
      client.send(this.token);
    }.bind(this);

    client.onmessage = function(e) {
      var msg = JSON.parse(e.data).msg;
      var res = {};
      for(var attr in msg){
        res.event = attr;
        var port = null;
        if(msg[attr] == "3"){
          port = 0;
        } else if(msg[attr] == "5"){
          port = 1;
        }
        res.port = port;
      }
      handler(null, res);
    };
  };

  Wio.prototype.request = require("./request");
  return Wio;
})();