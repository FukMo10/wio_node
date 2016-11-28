"use strict";

const Url     = require("url");
const request = require("superagent");

module.exports = function(options, callback){
  if(typeof options.path != "string"){
    return callback(new Error("Path is required."), null);
  }
  const path   = options.path + "?access_token=" + this.token;
  const method = options.method || "GET";

  const parsedUrl = Url.parse(path);
  parsedUrl.hostname = options.endpoint || this.endpoint;
  parsedUrl.port     = options.port     || this.port;
  parsedUrl.protocol = options.protocol || this.protocol;

  const url   = parsedUrl.format();
  const reqBody  = options.body;

  return new Promise(function(resolve, reject){
    const _callback = function(err, res){
      if(err) return (callback && callback(err, null)) || reject(err);
      const resBody = (!res.text && res.body) ? res.body : res.text;
      return (callback && callback(null, resBody)) || resolve(resBody);
    };
    const r = request[method.toLowerCase()](url);

    if(typeof data == "object"){
      r.send(data);
      r.end(_callback);
    }else{
      if(typeof query == "object") r.query(query);
      r.end(_callback);
    }
  }.bind(this));
}