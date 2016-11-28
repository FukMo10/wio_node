"use strict"

const GenericDIn = module.exports = (wio)=>{
  function GenericDIn(nodeNum, attrs){
  	this.nodeNum = nodeNum || 0;
  	for(var attr in attrs){
      if(attrs.hasOwnProperty(attr)){
          this[attr] = attrs[attr];
      }
    }
  };
  const classPass = GenericDIn.prototype.classPass = "GenericDInD";

  GenericDIn.prototype.fetch = function(callback){
  	return wio.request({
  	  path:    "/" + wio.apiVersion + "/node/" + this.classPass + this.nodeNum + "/input",
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

  return GenericDIn;
};