"use strict"

const DigitalOut = module.exports = (wio)=>{
  function DigitalOut(nodeNum, attrs){
  	this.nodeNum = nodeNum || 0;
  	for(var attr in attrs){
      if(attrs.hasOwnProperty(attr)){
          this[attr] = attrs[attr];
      }
    }
  };
  const classPass = DigitalOut.prototype.classPass = "GenericDOutD";

  DigitalOut.prototype.fetch = function(callback){
  	return wio.request({
  	  path:    "/" + wio.apiVersion + "/node/" + this.classPass + this.nodeNum + "/onoff_status",
  	  method:  "GET",
  	  nodeNum: this.nodeNum
  	}).then((data)=>{
  	  var obj = null;
      try{
        obj = JSON.parse(data);
      }catch(err){
        throw err;
      }
      if(callback) return callback(null, obj);
      return obj;
  	}).catch((err)=>{
      if(callback) return callback(err, null);
      throw err;
    });
  };

  DigitalOut.prototype.send = function(param, callback){
    return wio.request({
      path:    "/" + wio.apiVersion + "/node/" + this.classPass + this.nodeNum + "/onoff/" + param,
      method:  "POST",
      nodeNum: this.nodeNum
    }).then((data)=>{
      var obj = null;
      try{
        obj = JSON.parse(data);
      }catch(err){
        throw err;
      }
      if(callback) return callback(null, obj);
      return obj;
    }).catch((err)=>{
      if(callback) return callback(err, null);
      throw err;
    });
  };

  DigitalOut.prototype.on = function(callback){
    return this.send(1, callback);
  }

  DigitalOut.prototype.off = function(callback){
    return this.send(0, callback);
  }

  DigitalOut.prototype.send = function(param, callback){
    return wio.request({
      path:    "/" + wio.apiVersion + "/node/" + this.classPass + this.nodeNum + "/onoff/" + param,
      method:  "POST",
      nodeNum: this.nodeNum
    }).then((data)=>{
      var obj = null;
      try{
        obj = JSON.parse(data);
      }catch(err){
        throw err;
      }
      if(callback) return callback(null, obj);
      return obj;
    }).catch((err)=>{
      if(callback) return callback(err, null);
      throw err;
    });
  };

  ["high", "low"].forEach(function(method){
    var methodName = "send" + method[0].toUpperCase() + method.substr(1) + "Pulse";
    DigitalOut.prototype[methodName] = function(param, callback){
      return wio.request({
        path:    "/" + wio.apiVersion + "/node/" + this.classPass + this.nodeNum + "/" + method + "_pulse/" + param,
        method:  "POST",
        nodeNum: this.nodeNum
      }).then((data)=>{
        var obj = null;
        try{
          obj = JSON.parse(data);
        }catch(err){
          throw err;
        }
        if(callback) return callback(null, obj);
        return obj;
      }).catch((err)=>{
        if(callback) return callback(err, null);
        throw err;
      });
    };
  });

  return DigitalOut;
};