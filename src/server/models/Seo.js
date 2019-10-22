const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");

const API_DOMAIN_URL = config.API_DOMAIN;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;

module.exports = {
	getSections:function(callback){
		RedisCache.get("sections", function(err, reply){
			var arr = [];
			if(reply!=null){
			  arr = reply;
			}
			callback(false, arr);
		});		
	},
	addSection:function(title,link,callback){
		
		var error = false;
		if(typeof(title)=='undefined' || title=="") {
			error ="please add section title";
		}		
		if(error){
			callback(true, { error:error });
			return;
		}
		var obj = {};
		obj['title'] = title;
		obj['link'] = link;

		RedisCache.get("sections", function(err, reply){
			var arr = {sections:[]};
			if(reply!=null){
			  arr = reply;
			}
			if(typeof(arr.sections) && arr.sections.length>0){
				for(var i=0;i<arr.sections.length;i++){
					if(arr.sections[i].title==title){
						callback(true, { error:"Section name '"+title+"' is already in list." });
						return;
					}
				}
			} 

			arr.sections.push(obj);
			RedisCache.set("sections",arr,157680000);
			callback(false, { success:"Section added successfully!!!!" });
		});	
	},
	deleteSection:function(title,callback){
		var error = false;
		if(typeof(title)=='undefined' || title=="") {
			error ="please add section title";
		}		
		if(error){
			callback(true, { error:error });
			return;
		}

		RedisCache.get("sections", function(err, reply){
			var arr = {sections:[]};
			if(reply!=null){
			  arr = reply;
			}
			if(typeof(arr.sections) && arr.sections.length>0){
				for(var i=0;i<arr.sections.length;i++){
					if(arr.sections[i].title==title){
						arr.sections.splice(i, 1);
						RedisCache.set("sections",arr,157680000);
						callback(false, { message:"Section name '"+title+"' deleted from list." });
						return;
					}
				}
				callback(false, { message:"Section name '"+title+"' is not in the list." });
			} else {
				callback(false, { message:"Section name '"+title+"' is not in the list." });
			}
		});	
	},
	addLink:function(section,title,link,callback){
		
		var error = false;
		if(typeof(section)=='undefined' || section=="") {
			error ="please select section";
		} else if(typeof(title)=='undefined' || title=="") {
			error ="please add section title";
		}		
		if(error){
			callback(true, { error:error });
			return;
		}
		var obj = {};
		var key = "section_"+Util.makeKey(section);
		obj['title'] = title;
		obj['link'] = link;
		
		RedisCache.get(key, function(err, reply){
			var arr = {links:[]};
			if(reply!=null){
			  arr = reply;
			}
			if(typeof(arr.links) && arr.links.length>0){
				for(var i=0;i<arr.links.length;i++){
					if(arr.links[i].title==title){
						callback(true, { error:"Link '"+title+"' is already in list." });
						return;
					}
				}
			} 
			arr.links.push(obj);
			RedisCache.set(key,arr,157680000);
			callback(false, { success:"Link added successfully!!!!" });
		});	
	},
	getLinks:function(section, callback){
		var key = "section_"+Util.makeKey(section);
		RedisCache.get(key, function(err, reply){
			var arr = [];
			if(reply!=null){
			  arr = reply;
			}
			callback(false, arr);
		});		
	},
	deleteLinks:function(section, title,callback){
		var error = false;
		if(typeof(section)=='undefined' || section=="") {
			error ="please add section";
		}
		if(typeof(title)=='undefined' || title=="") {
			error ="please add link title";
		}		
		if(error){
			callback(true, { error:error });
			return;
		}

		var key = "section_"+Util.makeKey(section);

		RedisCache.get(key, function(err, reply){
			var arr = {links:[]};
			if(reply!=null){
			  arr = reply;
			}
			if(typeof(arr.links) && arr.links.length>0){
				for(var i=0;i<arr.links.length;i++){
					if(arr.links[i].title==title){
						arr.links.splice(i, 1);
						RedisCache.set(key,arr,157680000);
						callback(false, { message:"Link '"+title+"' deleted from list." });
						return;
					}
				}
				callback(false, { message:"Link '"+title+"' is not in the list." });
			} else {
				callback(false, { message:"Link '"+title+"' is not in the list." });
			}
		});	
	},

	getTrendings:function(callback){
		RedisCache.get("trendings", function(err, reply){
			var arr = [];
			if(reply!=null){
			  arr = reply;
			}
			callback(false, arr);
		});		
	},
	addTrendings:function(title,link,callback){
		
		var error = false;
		if(typeof(title)=='undefined' || title=="") {
			error ="please add section title";
		} else if(typeof(link)=='undefined' || link==""){
			error ="please add section Link";
		}		
		if(error){
			callback(true, { error:error });
			return;
		}
		var obj = {};
		obj['title'] = title;
		obj['link'] = link;

		RedisCache.get("trendings", function(err, reply){
			var arr = {sections:[]};
			if(reply!=null){
			  arr = reply;
			}
			if(typeof(arr.sections) && arr.sections.length>0){
				for(var i=0;i<arr.sections.length;i++){
					if(arr.sections[i].title==title){
						callback(true, { error:"Section name '"+title+"' is already in list." });
						return;
					}
				}
			} 

			arr.sections.push(obj);
			RedisCache.set("trendings",arr,157680000);
			callback(false, { success:"Section added successfully!!!!" });
		});	
	},
	deleteTrendings:function(title,callback){
		var error = false;
		if(typeof(title)=='undefined' || title=="") {
			error ="please add title";
		}		
		if(error){
			callback(true, { error:error });
			return;
		}

		RedisCache.get("trendings", function(err, reply){
			var arr = {sections:[]};
			if(reply!=null){
			  arr = reply;
			}
			if(typeof(arr.sections) && arr.sections.length>0){
				for(var i=0;i<arr.sections.length;i++){
					if(arr.sections[i].title==title){
						arr.sections.splice(i, 1);
						RedisCache.set("trendings",arr,157680000);
						callback(false, { message:"Section name '"+title+"' deleted from list." });
						return;
					}
				}
				callback(false, { message:"Section name '"+title+"' is not in the list." });
			} else {
				callback(true, { error:"Section name '"+title+"' is not in the list." });
			}
		});	
	},
	getFooter:function(callback) {
		const _this = this;
		RedisCache.get("sections", function(err, reply){
			var arr = [];
			if(reply!=null){
			  arr = reply;
			}
			if(typeof(arr)!='undefined' && typeof(arr.sections)!='undefined' && arr.sections.length>0){
				var promiseArr = [];
				for(let i=0 ;i<arr.sections.length;i++){
					(function(i){
						_this.getLinks(arr.sections[i].title, function(err, data){
							//console.log(key, data);
							var arrData = [];
							if(data!=null){
							  arrData = data;
							}
							if(typeof(arrData.links)!='undefined'){
								arr.sections[i]['urls'] = arrData.links;
							}
							
							if(i>=arr.sections.length-1){
								_this.getTrendings(function(terr, tdata){
									arr['trendings'] = tdata;
									callback(false, arr);
								})
							}
						});
					})(i)
				}
			} else {
				callback(false, []);
			}
		});		
	},

	addMeta:function(url, obj, callback){
		var error = false;
		if(typeof(url)=='undefined' || url=="") {
			error ="please add url";
		}		
		if(error){
			callback(true, { error:error });
			return;
		}
		var key = "meta_"+Util.makeKey(url);
		RedisCache.set(key,obj,157680000);
		callback(false, { success:"Meta added successfully!!!" });	
	},
	getMeta:function(url, callback){
		if(typeof(url)=='undefined'){
			callback(true, {});
		}
		let urlArr = url.split("?");
		url = urlArr[0];
		var key = "meta_"+Util.makeKey(url);
		RedisCache.get(key, function(err, reply){
			var arr = [];
			if(reply!=null){
			  arr = reply;
			}
			callback(false, arr);
		});		
	},
	deleteMeta:function(key,callback){
		var error = false;
		if(typeof(key)=='undefined' || key=="") {
			error ="please add url";
		}
				
		if(error){
			callback(true, { error:error });
			return;
		}

		RedisCache.delete(key, function(err, reply){
			callback(false, { message:"Meta deleted successfully!!!" });
		});	
	},
	getMetaListing:function(callback){
		var key = "meta_*";
		RedisCache.multi(key, function(err, replies){
			var arr = [];
			if(replies!=null){
				let arr = [];
				for(let i=0;i<replies.length;i++){
					let key = replies[i];
					replies[i] = replies[i].replace(/meta_/g,"/");
					replies[i] = replies[i].replace("http_","http://");
					replies[i] = replies[i].replace("//","/");
					replies[i] = replies[i].replace(/_/g,"/");
					replies[i] = replies[i].substr(1);
					arr.push({'id':key,'url':replies[i]});
				}
				callback(false, arr);
			} else {
				callback(false, arr);
			}
			
		});		
	},	
	
}