const url = require('url');
const nodemailer = require('nodemailer');
const fs = require('fs');
const languageArr=[
  {
    languageCode:'2',
    languageNameEng:'Hindi',
    languageName:'हिन्दी',
    locale: "hi",
    chooseLanguage: "भाषा चुनें",
    readNowCTA: "अभी पढ़ें"
  },
  {
    languageCode:'1',
    languageNameEng:'English',
    languageName:'English',
    locale: "en",
    chooseLanguage: "Select Language(s)",
    readNowCTA: "Read Now"
  },
  {
    languageCode:'8',
    languageNameEng:'Tamil',
    languageName:'தமிழ்',
    locale: "ta",
    chooseLanguage: "மொழியை தேர்வு செய்க",
    readNowCTA: "இப்போது படிக்கவும்"
  },
  {
    languageCode:'9',
    languageNameEng:'Telugu',
    languageName:'తెలుగు',
    locale: "te",
    chooseLanguage: "భాషను ఎంచుకోండి",
    readNowCTA: "ఇప్పుడే"
  },
  {
    languageCode:'4',
    languageNameEng:'Bengali',
    languageName:'বাংলা',
    locale: "bn",
    chooseLanguage: "ভাষা বাছুন",
    readNowCTA: "এখনই পড়ুন"
  },
  {
    languageCode:'5',
    languageNameEng:'Kannada',
    languageName:'ಕನ್ನಡ',
    locale: "kn",
    chooseLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
    readNowCTA: "ಈಗ ಓದಿ"
  },
  {
    languageCode:'7',
    languageNameEng:'Malayalam',
    languageName:'മലയാളം',
    locale: "ml",
    chooseLanguage: "ഭാഷ തെരഞ്ഞെടുക്കുക",
    readNowCTA: "ഇപ്പോൾ"
  },
  {
    languageCode:'6',
    languageNameEng:'Gujarati',
    languageName:'ગુજરાતી',
    locale: "gu",
    chooseLanguage: "ભાષા પસંદ કરો",
    readNowCTA: "અત્યારે વાંચો"
  },
  {
    languageCode:'3',
    languageNameEng:'Marathi',
    languageName:'मराठी',
    locale: "mr",
    chooseLanguage: "भाषा निवडा",
    readNowCTA: "आत्ता वाचा"
  },
  {
    languageCode:'10',
    languageNameEng:'Urdu',
    languageName:'اُردُو',
    locale: "ur",
    chooseLanguage: "زبان منتخب کریں",
    readNowCTA: "Read Now"
  },
  {
    languageCode:'13',
    languageNameEng:'Punjabi',
    languageName:'पंजाबी',
    locale: "pa",
    chooseLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
    readNowCTA: "Read Now"
  },
  {
    languageCode:'11',
    languageNameEng:'Odia',
    languageName:'ଓଡ଼ିଆ',
    locale: "or",
    chooseLanguage: "ଭାଷା ବାଛନ୍ତୁ",
    readNowCTA: "Read Now"
  },
  {
    languageCode:'14',
    languageNameEng:'Asamiya',
    languageName:'অসমীয়া',
    locale: "as",
    chooseLanguage: "ভাষা মনোনীত কৰক",
    readNowCTA: "Read Now"
  },
  {
    languageCode:'12',
    languageNameEng:'Nepali',
    languageName:'Nepali',
    locale: "hi",
    chooseLanguage: "भाषा छान्नुहोस्",
    readNowCTA: "Read Now"
  }     
];


const internalPubs = ["nbt","ethindi","toi","et","bi","mm","ahmedabad-mirror","pune-mirror","bangalore-mirror","adage","happytrips","tamilsamayam","telugusamayam","es","vk","malayalamsamayam","mt"];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'newspointpwa@gmail.com',
    pass: 'times@123'
  }
});


const transporterNew = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'newspointpwa1@gmail.com',
    pass: 'times@123'
  }
});


module.exports = {
	sendEmail:function(apiPath, fromEmail){
    let transport = transporterNew;
    let to = "sandeep.panwar@timesinternet.in, harpreet.singh6@timesinternet.in, c-deepak.jindal@timesinternet.in, ravi.kant@timesinternet.in, mohit.rathi@timesinternet.in, amit.upadhyay@timesinternet.in";
    if(typeof(fromEmail)=='undefined'){
      fromEmail = "newspointpwa@gmail.com";
      transport = transporter;
      to = "sandeep.panwar@timesinternet.in";
    }
	  var mailOptions = {
	    from: fromEmail,
	    to: to,
	    subject: 'API not working',
	    text: 'Api not working: '+apiPath
	  };

	  if(apiPath.indexOf('section=more')>=0){
	    return;
	  }

	  transport.sendMail(mailOptions, function(error, info){
	    if (error) {
	      console.log(error);
	    } else {
	      console.log('Email sent: ' + info.response);
	    }
	  });
	},

	parseQueryString:function(req){
	  let url_parts = url.parse(req.url, true);
	  let query = url_parts.query;
	  let queryArr = [];
	  for(let prop in query){
	    queryArr.push(prop+"="+query[prop]);
	  }		
	  return queryArr;
	},

	getLanguageIdByName:function(lang){
		let langArr = lang.split(",");
		let returnArr = [];
		for(let i=0;i<langArr.length;i++){
			let findLang = languageArr.find((l)=>{
				if(l.languageNameEng.toLowerCase()==langArr[i].toLowerCase()){
					return l;
				}
			});
			if(findLang){
				returnArr.push(findLang.languageCode);
			}
		}
		return returnArr.join(",");
	},

  logRequestError:function(err, response){
    if(err || response.statusCode!=200){
      var url = "";
      if(typeof(response)!='undefined' && typeof(response.request)!='undefined' && typeof(response.request.uri)!='undefined' && typeof(response.request.uri.href)!='undefined'){
        url = response.request.uri.href;
      }
      var today = new Date();
      var todayString = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
      fs.appendFileSync("/var/log/node/np-api-error.log", todayString+" ==> "+url+" ==> caught API Error : " + (typeof(response)!='undefined'?response.statusCode:"")+"\n");
    }    
  },

  isInternalPub:function(name){
    if(name && internalPubs.indexOf(name.toLowerCase())>=0){
      return true;
    }
    return false;
  },

  makeUrl:function(url){
    url = url.split(",").join("");
    if(typeof(url)!='undefined' && url!=""){
      return url.split(" ").join("-").toLowerCase();
    } else return url;
  },

  abbreviatePubName:function(name){
    if(!name) return "";
    return name.toLowerCase().split(' ').join('');
  },
  
  logApiRequest:function(api, ft, st, tt, ftime){
    //console.log( api+" ==> "+ft+" ==> " + st+" ==> " + tt+" ==> " + ftime+"\n");
    fs.appendFileSync("/var/log/node/np-api-time.log", api+" ==> "+ft+" ==> " + st+" ==> " + tt+" ==> " + ftime+"\n");
  },
  makeKey:function(str){
    if(typeof(str)!='undefined' && str!=''){
      return str.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
    }
    return str;
  },
  getLanguages:function(){
    return languageArr;
  },
  queryArrToObj: function(queryArr) {
    let obj = {};
    for(let i=0;i< queryArr.length; i++) {
      let temp = queryArr[i].split("=");
      obj[temp[0]] = temp[1];
    }
    return obj;
  }
}