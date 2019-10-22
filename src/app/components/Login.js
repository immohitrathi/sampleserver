import React, { Component } from 'react';
import { Link as RLink } from 'react-router-dom';
import { gaEvent} from  '../../utils/util';
import { withCookies } from 'react-cookie';
import myfetch from '../data/utils/fetch';
import config from '../../config';
import fetchJsonP from 'fetch-jsonp';
import ReactGA from 'react-ga';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);


export function isObject( ele ) {
  return ele !== null && typeof ele === "object"; //&& !(ele instanceof Array);
}

export function mapObj( mapping, obj ) {
 if( !isObject( mapping ) && !isObject( obj ) ) {
   throw new Error( 'Invalid Parameters' ); //todo give proper message
 }
 var newObj = {};
 each( mapping, function ( k, v ) {
   if( is.funct( v ) ) {
     newObj[ k ] = v( obj );
   } else {
     newObj[ k ] = obj[ v ];
   }
 } );
 return newObj;
}

export function each( obj, callback ) {
 let i,o;
 if( !callback ) {
   return null;
 }
 if( obj instanceof Array ) {
   for( i = 0; i < obj.length; i++ ) {
     if( callback( i, obj[ i ] ) === false ) {
       break;
     }
   }
 } else if( obj instanceof Object ) {
   for( o in obj ) {
     if( obj.hasOwnProperty( o ) ) {
       if( callback( o, obj[ o ] ) === false ) {
         break;
       }
     }
   }
 } else {
   //callback(0, obj);
 }
}




class Login extends Component {  
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false,userName:'',profilePic:''};
    this.handleLoginCallback = this.loginCallback.bind(this);
    this.logouthandler = this.logouthandlerCallback.bind(this);
  }  

  componentDidMount() {
    const { dispatch , params, query, location, cookies} = this.props;
    let _this = this;
    let otuid = cookies.get('otuid');
    if(typeof(window)!='undefined' && (typeof(otuid)=='undefined' || otuid=="")){
      Login.init(Login.newLoginConfig(), _this);
    }else{
      Login._this = _this;
      let userData = {
        uid : otuid,
        EMAIL : cookies.get('otemail'),
        FL_N : cookies.get('otname')
      };
      _this.handleLoginCallback(userData);
    }
    let ssoid = cookies.get('ssoid');
    let onetapsignin = cookies.get("onetapsignin");
    //disable one tap signin for oems
    //let isOEM = Object.keys(location.query).length > 0 && location.query.utm_source && hideBannersForUTM().includes(location.query.utm_source) ? true : false;
    let isOEM = false;
    //console.log("INside componentDidMount",ssoid);
    if(typeof(ssoid)!='undefined' && ssoid!="") {
      _this.getMyTimesUserInfo(ssoid,function(data){
        if(typeof(data)!='undefined') {
          let tempState = {};
          if(typeof(data.FL_N)!='undefined' && data.FL_N!=''){
            tempState = Object.assign(tempState,{userName:data.FL_N,isLoggedIn:true});
          }
          if(typeof(data.thumb)!='undefined' && data.thumb!=''){
            tempState = Object.assign(tempState,{profilePic:data.thumb});
          }
          _this.setState(tempState);
        }
      });
    }
    
    if(typeof(window)!='undefined' && window.opener && window.opener !== window && window.location.href.indexOf("site=sso")>0){
      window.opener.location.reload();
      window.close();
    }
    
    


    //_this.useGoogleIdTokenForAuth('eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyNzY3MWQ3M2EyNjA1Y2NkNDU0NDEzYzRjOTRlMjViM2Y2NmNkZWEifQ.eyJhdWQiOiI4MjY2MjEyMDA4Ni0zZWFkZDRrMHA2YWg4dWVrcmk4MHNnMnFsNzBlczRlZi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMjE3MjMxOTYwNzQwMjk4ODIwNCIsImVtYWlsIjoic2FuZGVlcHBhbndhcjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjgyNjYyMTIwMDg2LTNlYWRkNGswcDZhaDh1ZWtyaTgwc2cycWw3MGVzNGVmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZXhwIjoxNTE4NzY2MTQzLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiI0MGE3YzE4ZWU4MjYxODUzYjU1YWJlOGUwYjdhZmE3ZmEwNjE2YWFkIiwiaWF0IjoxNTE4NzYyNTQzLCJuYmYiOjE1MTg3NjIyNDMsIm5hbWUiOiJTYW5kZWVwIFBhbndhciIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLURrTC14Zm5YWWFjL0FBQUFBQUFBQUFJL0FBQUFBQUFBQWw4L1hTQ3Azajd0VDlBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJTYW5kZWVwIiwiZmFtaWx5X25hbWUiOiJQYW53YXIifQ.mviYOzzutbx73owax8w0n3Q1kwJZjcwJS9sSbqD-S8sgFMIaWtiQGLeA-AigjlYT7rtYS4IRjQJxV3imIy_Yrg0S1-rL3re8N9T46KJpV1CV4F6WZ3KSIAO5S5BPLcWlIqtCgyd2hhDXb9PNU26M3WFWZXupLMckKdCIVoJcIxF037UABlX_7DlvvZbyoLClRlorm5AzEzn1QYEWx1fhyb38JhLXXj_eXXzQprV_cpjazIbEQ6gjXwsFoXvZnCJsSfqSRzPrvARkNGhPdp9FzCU6KVpLZru_iVrWvNrEZ0TmP_GlHsq8F0uzLQlZX0bS5SSg199hQBSTgSKYaxcV6g');
    //return;
    if(!isOEM && (typeof(onetapsignin)=='undefined' || onetapsignin=="" || onetapsignin==false) && (typeof(ssoid)=='undefined' || ssoid=="")){
      window.onGoogleYoloLoad = (googleyolo) => {
        const hintPromise = googleyolo.hint({
          supportedAuthMethods: [
            "https://accounts.google.com"
          ],
          supportedIdTokenProviders: [
            {
              uri: "https://accounts.google.com",
              clientId: config.GOOGLE_CLIENT_ID
            }
          ]
        });

        hintPromise.then((credential) => {
          if (credential.idToken) {
            // Send the token to your auth backend.
            //console.log("Login: useGoogleIdTokenForAuth",credential);
            _this.useGoogleIdTokenForAuth(credential);
          }
        }, (error) => {
          console.log("inside error",error);
          
          if(error.type=='userCanceled'){
            gaEvent('UserStatus','One Tap','Close');
            //let curDomain = config.DOMAIN_NAME == 'localhost' ? 'localhost' : '.newspointapp.com';
            cookies.set("onetapsignin","1",{path:'/',maxAge:(3600*24*15)});
          }
          
          /*switch (error.type) {
            case "userCanceled":
              // The user closed the hint selector. Depending on the desired UX,
              // request manual sign up or do nothing.
              break;
            case "noCredentialsAvailable":
              // No hint available for the session. Depending on the desired UX,
              // request manual sign up or do nothing.
              break;
            case "requestFailed":
              // The request failed, most likely because of a timeout.
              // You can retry another time if necessary.
              break;
            case "operationCanceled":
              // The operation was programmatically canceled, do nothing.
              break;
            case "illegalConcurrentRequest":
              // Another operation is pending, this one was aborted.
              break;
            case "initializationError":
              // Failed to initialize. Refer to error.message for debugging.
              break;
            case "configurationError":
              // Configuration error. Refer to error.message for debugging.
              break;
            default:
              // Unknown error, do nothing.
          }*/
        });      

      };
    }

  }

  useGoogleIdTokenForAuth(credential) {
    const _this = this;
    const {cookies} = this.props;
    myfetch(config.API_URL+"/verifiyonetape?channel="+Login.getChannel()+"&token="+credential.idToken).then((response)=>{
      if(response.code==200 && response.status=="SUCCESS" && typeof(response.data)!='undefined' && typeof(response.data.ssoid)!='undefined' && response.data.ssoid!="" && response.data.ru!=""){
        //Cookies.save("ssoid",response.data.ssoid,{path:'/',maxAge:(3600*24*365),domain:'.'+config.DOMAIN_NAME});
        /*let ticketIdArr = response.data.ru.split("ticketId=");
        let ticketId = ticketIdArr[1];
        Login.userStatusSuccess({ticketId:ticketId},(user)=>{
          console.log("Inside useGoogleIdTokenForAuth",user);
        });*/
        try{
          _this.getMyTimesUserInfo(response.data.ssoid, function (user) {
            gaEvent('UserStatus','One Tap','Success_google');
            let tempUser = null;
            if(typeof user != 'undefined'){
              tempUser = user;
            }else{
              tempUser = {
                uid : response.data.ssoid,
                EMAIL : credential.id,
                profile : credential.profilePicture,
                FL_N : credential.displayName
              }
            }
            //let curDomain = config.DOMAIN_NAME == 'localhost' ? 'localhost' : '.newspointapp.com';
            cookies.set("otuid",tempUser.uid,{path:'/',maxAge:(3600*24*365)});
            cookies.set("otemail",tempUser.EMAIL,{path:'/',maxAge:(3600*24*365)});
            cookies.set("otname",tempUser.FL_N,{path:'/',maxAge:(3600*24*365)});
            if(document.getElementById("loginNotificationText")){
              document.getElementById("loginNotificationText").innerText = "Successfully signed in as "+tempUser.EMAIL;
              document.getElementById("oneTapContainer").classList.remove("hide");
              document.getElementById("oneTapContainer").classList.add("animated");
              document.getElementById("oneTapContainer").classList.add("slideUp");
              window.setTimeout(()=>{
                document.getElementById("oneTapContainer").classList.add("hide");
              },5000);
            }
            _this.loginCallback(tempUser);
          });
        }catch(error){
          console.log("getMyTimesUserInfo error",error);
        }
      }
      //console.log("Jsso success",response);
    }).catch((error)=>{
      //console.log("Jsso error",error);
    })
  }

  getMyTimesUserInfo(ssoid, callback){
    var url = "https://myt.indiatimes.com/mytimes/profile/info/v1/?ssoid="+ssoid;
    fetchJsonP(url,{method: 'GET', mode: 'cors', credentials: 'include'}).then(response =>{
      return response.json()
    }).then((json)=>{
      callback(json);
      //Login._this.handleLoginCallback(json);
    }).catch((err)=>{
      console.log("GET USERS INFO ERROR",err);
    });    
  }


  handleLoginClick() {
    console.log("here i am");
    //this.setState({isLoggedIn: true});
    Login.login();
    ReactGA.set({ page: 'Login' });
    ReactGA.pageview('Login');
  }

  handleLogoutClick() {
    //this.setState({isLoggedIn: false});
    Login.logout();
  }  

  loginCallback(data){
    const {cookies} = this.props;
    let name = "";
    if(data['FL_N']){
      name = data['FL_N'];
    }else{
      let authDetail = cookies.get( "MSCSAuthDetail" );
      if(authDetail){
        let firstName = authDetail.split('FirstName=')[1].split('~')[0];
        let lastName = authDetail.split('FirstName=')[1].split('~')[1].split('LastName=')[1];
        if(firstName && lastName){
         name = firstName + ' ' + lastName;
        }else{
          name = firstName;
        }
      }
    }
    
    this.state.isLoggedIn = true;
    this.state.userName = name ? name  : 'User';
    this.state.img = data['profile'];
    this.forceUpdate();
    Login.statusChange(data);
    //let curDomain = config.DOMAIN_NAME == 'localhost' ? 'localhost' : '.newspointapp.com';
    cookies.set("ssoid",data.uid,{path:'/',maxAge:(3600*24*365)});
    gaEvent('UserStatus','Login','Email');
  }
  
  logouthandlerCallback(){
    this.state.isLoggedIn = false;
    this.props.closeNavigation();
    this.forceUpdate();
    gaEvent('UserStatus','Logout','Email');
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const userName = this.state.userName;
    const profilePic = this.state.profilePic;
    let {loginText,logoutText, home_installapp} = this.props;
    return (
      <div className="login-wrapper">
        {isLoggedIn ? 
        <div data-plugin="user-isloggedin" className="login-area">
            <span data-plugin="user-name" onClick={this.handleLogoutClick} className="user-name log-text">{userName}</span><span className="log-text logout">{logoutText ? logoutText : 'Logout'}</span>
        </div>
        :
        <div data-plugin="user-notloggedin" className="login-area">
            <span className="log-text" onClick={this.handleLoginClick}>{loginText ? loginText : 'Login'}</span>
        </div>
      }
     </div>
    )
    
  }
}

Login.defaultConfig={
  autoinit: false,
  multiuser: false, //allows multiple users to login at a time
  login: "",
  logout: "",
  check_user_status: "",
  mapping: null,
  renderer: true, //todo to be implemented
  loginWindow: null,
  loginData: null,
  userList: {},
  single_user_id: "SINGLE_USER",
  loginCallback : null,
  domain: config.DOMAIN_NAME == 'localhost' ? 'localhost' : '.newspointapp.com',
  channel: 'newspoint'
}
Login.User = function(attr,mapping){
  let prvt = {},
    tthis = this;
  if( mapping && isObject(mapping) ) {
    attr = mapObj( mapping, attr );
  }
  each( attr, function ( k, v ) {
    prvt[ k ] = v;
    let kCamelCase = k ;
    //            if(setter === true){
    //                tthis['set'+kCamelCase] = function(kk){return prvt[k] = kk;};
    //            }
    tthis[ 'get' + kCamelCase ] = function () {
      return prvt[ k ];
    };
  });
  this.getMappedUser = function () {
    return prvt; //todo return clone.
  };
  this.getOriginalUser = function () {
    return attr; //todo return clone.
  };
  this.toString = this.toJson = function () {
    return JSON ? JSON.stringify( prvt, true, "\t" ) : null;
  };
}
  
Login.getNewUser = function ( default_user, mapping ) {
  if( default_user instanceof Login.User ) {
    return default_user;
  } else if( isObject( default_user ) ) {
    return new Login.User( default_user, mapping );
  } else {
    return null;
  }
}
Login.isUser = function ( obj ) {
  return obj instanceof Login.User;
}  
Login.sso = function ( url, callback ) {
    Login.defaultConfig.loginWindow = Login.uiwindow( url, {
      width: 850,
      height: 780,
      scrollbars: 0
    }, function ( result ) {
      if( result && result.code === "200" ) {
        Login.isLoggedIn();
      } else {
        if( callback ) {
          callback( null, result );
        }
      }
    } );
    Login.defaultConfig.loginWindow.moveTo( 315, 250 );
  }
Login.uiwindow = function(url, options) {
    var default_options,opt,x,y,params,popup;
    default_options = {
        width: 300,
        height: 300,
        name: "Window" ,
        mask:true,
        resizable:false,
        disableScroll:false,
        closeCallback: function(){}
    };
    opt = Object.assign({}, default_options, options);
    x = window.screen.width/2 -  opt.width/2;
    y = window.screen.height/2 - opt.height/2;

    params = ['width=' + opt.width,
        'height=' + opt.height,
        'left=' + (typeof opt.left !== "undefined"?opt.left:x),
        'top=' + (typeof opt.top !== "undefined"?opt.top:(y-20)),
        'scrollbars=' + opt.scrollbars,
        'resizable=' + opt.resizable];      

    popup = window.open(url, opt.name, params.join(","));
    if(popup){
        popup.focus();
    }
    try{
        //Exception "Permission Denied" in IE, using try catch so that this functionality works in other browsers.
        popup.reposition = function(){
            var x = window.screen.width/2 -  opt.width/2,
            y = (window.screen.height/2 - opt.height/2);
            popup.moveTo(x,y);
        };
    }catch(e){
        console.warn("Handled Exception in IE10.");
        console.error(e);
    }

    if(!popup){
       console.error("Popups are blocked. Please enable them.");
        //mod_ui.unmask();
        return popup;
    }
    //TODO use timer module, prevent recursive dependency
    (function(popup,url,opt){
        var interval = window.setInterval(function() {   //todo use timer
            try {
                if (popup === null || popup.closed !== false) {
                    window.close(opt.name);
                    //console.log(window.parent.parent);
                    window.location.reload();
                }
            }
            catch (e) {
                window.clearInterval(interval);
                interval = null;
            }
        }, 500);

        //open_window[opt.name] = {opt:opt, popup:popup, interval:interval, url:url};

    }(popup,url,opt));


    return popup;
  }

Login.setLoginError = function( loginErrorMsg ) {
  Login.setLoginData( {
    error: {
      code: loginErrorMsg,
      message: config.messages[ loginErrorMsg ]
    }
  });
}
Login.setLoginData = function( data ) {
  Login.defaultConfig.loginData = data;
};
Login.reset = function() {
  return;
  if( Login.defaultConfig.loginWindow ) {
    Login.defaultConfig.loginWindow.close();
    Login.defaultConfig.loginWindow = null;
  }
  Login.defaultConfig.loginData = null;
}
Login.getLoginCallback = function() {
  return Login.defaultConfig.loginCallback;
}
Login.getLoginData = function() {
  return Login.defaultConfig.loginData;
}
Login.getDomain = function () {
    return Login.defaultConfig.domain;
}
Login.getChannel = function () {
    return Login.defaultConfig.channel;
}
Login.setLocation = function( href ) {
  if( Login.defaultConfig.loginWindow.tagName === "IFRAME" ) {
    Login.defaultConfig.loginWindow.src = href;
  } else {
    Login.defaultConfig.loginWindow.document.location.href = href;
  }
}
Login.loginResponse = function ( url, error, data ) {
  Login.setLocation( url );
  if( error ) {
    Login.setLoginError( error );
  } else if( data ) {
    Login.setLoginData( data );
  }
}
Login.__sso =function ( data, url ) {
  if( data && Login.defaultConfig.loginWindow ) {
    var currLoginData = Login.defaultConfig.loginData ? Login.defaultConfig.loginData.data : null;
    data.site = data.site || "email";
    if( data.closeWindow ) {
      //console.log( "Close pressed, closing window / popup" );
      Login.defaultConfig.loginWindow.close();
    } else if( data.status == "logout" ) {
      //console.log( "Closing window / popup" );
      loginWindow.close();
    } else if( data.status == "signinsuccess" || data.status == "ssosigninsuccess" ) {
      //console.log( "Closing window / popup" );
      Login.defaultConfig.loginWindow.close();
    } else if( ( data.site == "facebook" || data.site == "googleplus" ) && data.status == "MappingUpdated" ) {
      //console.log( "Closing window / popup" );
      Login.defaultConfig.loginWindow.close();
      //                    setTimeout(function(){loginWindow.close();},500);
    } else if( data.status == "ssosigninfailure" && data.ssoerror == "E119" ) { //E119-username with password incorrect
      Login.loginResponse( config.base_url + "/loginview.cms?x=error&site=" + data.site, "email_failure" );
    } else if( data.status == "ssosigninfailure" && data.ssoerror == "E104" ) { //E104-email with password incorrect
      Login.loginResponse( config.base_url + "/loginview.cms?x=error&site=" + data.site, "email_failure" );
    } else if( data.err == "E104" && data.facebooktoken ) { //E104-facebook not sending email
      Login.loginResponse( config.base_url + "/loginview.cms?x=error&site=" + data.site, "facebook_failure_no_email" );
    } else if( data.status == "signinfailure" && data.error == "F101" ) {
      //                    {site: "facebook", status: "signinfailure", statustype: "fb_mappingfailure", sso: true}
      //                    {site: "facebook", status: "signinsuccess", statustype: "fb_mappingsaved_loginsuccess", sso: true}
      //                    {site: "facebook", status: "signinsuccess", statustype: "FBMappingLoginSuccess", sso: true}
      Login.loginResponse( config.base_url + "/loginview.cms?x=error&site=" + data.site, data.site + "_failure" );
    } else if( data.status == "signinfailure" && data.error == "twitter" && data.site == "twitter" ) { // twitter user denied access to account
      Login.loginResponse( config.base_url + "/loginview.cms?x=error&site=twitter", "twitter_failure_unknown" );
    } else if( data.status == "signinfailure" && data.error == "user_denied" && data.site == "facebook" ) { //facebook user denied access to the account
      Login.loginResponse( config.base_url + "/loginview.cms?x=error&site=" + data.site, "facebook_failure_user_denied" );
    } else if( data.error == "E104" && data.site == "twitter" ) { //when log in with twitter and it is not linked
      Login.loginResponse( config.base_url + "/socialconnect.cms?site=twitter", null, {
        data: data,
        twitter_connect: true
      } );
    } else if( data.error == "E119" && data.site == "twitter" ) { //when log in for linking twitter, username/email with wrong pasword
      Login.loginResponse( config.base_url + "/socialconnect.cms?site=twitter", "twitter_link_username_failure" );
      Login.defaultConfig.loginData.data = currLoginData;
    } else if( data.status == "signinfailure" && data.error == "T102" && data.site == "twitter" ) { //when twitter server is not responding
      Login.loginResponse( config.base_url + "/socialconnect.cms?site=" + data.site, "twitter_failure_server_error" );
    } else if( data.error == "E103" && data.site == "twitter" ) { //when trying to create a new account using already existing id after twitter connect
      Login.loginResponse( config.base_url + "/socialconnect.cms?site=" + data.site, "twitter_failure_already_exist", loginData ? loginData.data : null );
      Login.defaultConfig.loginData.data = currLoginData;
    } else if( data.error == "SSO_INVALID_RES_CHK_MAIL_AV" && data.site == "twitter" ) { //when trying to create a new account a@b.com after twitter connect
      Login.loginResponse( config.base_url + "/socialconnect.cms?site=" + data.site, "twitter_failure_invalid_email" );
      Login.defaultConfig.loginData.data = currLoginData;
    } else {
      console.warn( "Login case not handled" );
      Login.loginResponse( config.base_url + "/loginview.cms?x=error&site=" + data.site, "unknown_error" );
    }
  }
  //console.log( "Checking user status in __sso" );
  Login.isLoggedIn( Login.defaultConfig.loginCallback );
}
Login.closeWindow = function () {
  if( Login.defaultConfig.loginWindow ) {
    Login.defaultConfig.Login.defaultConfig.loginWindow.close();
    //setTimeout(function(){loginWindow.close();},500);
  }
}
Login.setLoginWindowDimension = function ( width, height ) {
  if( Login.defaultConfig.loginWindow ) {
    Login.defaultConfig.loginWindow.resizeTo( width, height );
    if( Login.defaultConfig.loginWindow.reposition ) { //TODO not working for window.open - popup
      Login.defaultConfig.loginWindow.reposition();
    }
    Login.defaultConfig.loginWindow.focus();
  }
}
Login.login = function ( callback, action ) {
  Login.defaultConfig.loginCallback = function ( user ) {
    //event.publish( "user.login", user );Login.login
    if( callback ) {
      callback( user );
    }
  };
  Login.reset();
  let curl = "";
  if(typeof(window)!='undefined') {
    curl = window.location.href;
  }
  
  var login_url = "https://jsso.indiatimes.com/sso/identity/login?channel=" + Login.getChannel().toLowerCase() + (action?"&action="+action:"")+ (curl!=""?"&ru="+encodeURIComponent(curl):"");
  Login.sso( login_url, callback );
}
Login.loginWithTwitter = function( callback ) {
  Login.defaultConfig.loginCallback = function ( user ) {
    //event.publish( "user.login", user );
    if( callback ) {
      callback( user );
    }
  };
  Login.Login.Login.reset();
  var login_url = "https://jsso.indiatimes.com/sso/identity/login/socialLogin?channel=" + Login.getChannel().toLowerCase() + "&oauthsiteid=twitter";
  Login.Login.sso( login_url, callback );
}
Login.loginWithFacebook  = function( callback ) {
  Login.defaultConfig.loginCallback = function ( user ) {
    //event.publish( "user.login", user );
    if( callback ) {
      callback( user );
    }
  };
  Login.reset();
  var login_url = "https://jsso.indiatimes.com/sso/identity/login/socialLogin?channel=" + Login.getChannel().toLowerCase() + "&oauthsiteid=facebook";
  Login.sso( login_url, callback );
}
Login.loginWithGoogle = function( callback ) {
  Login.defaultConfig.loginCallback = function ( user ) {
    //event.publish( "user.login", user );
    if( callback ) {
      callback( user );
    }
  };
  Login.reset();
  var login_url = "https://jsso.indiatimes.com/sso/identity/login/socialLogin?channel=" + Login.getChannel().toLowerCase() + "&oauthsiteid=googleplus";
  Login.sso( login_url, callback );
}
Login.logout = function ( callback ) {
  Login.defaultConfig.loginCallback = function () {
    //event.publish( "user.logout" );
    if( callback ) {
      callback();
    }
  };
  Login.reset();
  var logout_url = "https://jsso.indiatimes.com/sso/identity/profile/logout/external?channel=" + Login.getChannel().toLowerCase();
  //            sso(logout_url,callback);
  var container = document.body;
  var ifr = document.createElement( "iframe" );
  ifr.src = logout_url;
  ifr.scrolling = "no";
  ifr.frameBorder = "0";
  //ifr.width = width || 0;
  //ifr.height = height || 0;
  container.appendChild( ifr );
  ifr.onload = function () {
    //$( ifr ).remove();
    Login.removeUser();
    if( Login.__sso ) {
      Login.__sso();
    }
  }
  //localStorage.remove( "sso_user" );
  var domain = Login.getDomain();
  Cookies.remove( "otuid", "/", domain );
  Cookies.remove( "otemail", "/", domain );
  Cookies.remove( "otname", "/", domain );
  Cookies.remove( "ssoid", "/", domain );
  Cookies.remove( "Fbsecuritykey", "/", domain );
  Cookies.remove( "fbookname", "/", domain );
  Cookies.remove( "CommLogP", "/", domain );
  Cookies.remove( "CommLogU", "/", domain );
  Cookies.remove( "FaceBookEmail", "/", domain );
  Cookies.remove( "Fbimage", "/", domain );
  Cookies.remove( "fbooklocation", "/", domain );
  Cookies.remove( "Fboauthid", "/", domain );
  Cookies.remove( "fbname", "/", domain );
  Cookies.remove( "fbLocation", "/", domain );
  Cookies.remove( "fbimage", "/", domain );
  Cookies.remove( "fbOAuthId", "/", domain );
  Cookies.remove( "MSCSAuth", "/", domain );
  Cookies.remove( "MSCSAuthDetail", "/", domain );
  Cookies.remove( "MSCSAuthDetails", "/", domain );
  Cookies.remove( "Twimage", "/", domain );
  Cookies.remove( "TwitterUserName", "/", domain );
  Cookies.remove( "Fboauthid", "/", domain );
  Cookies.remove( "Twoauthid", "/", domain );
  Cookies.remove( "Twsecuritykey", "/", domain );
  Cookies.remove( "ssosigninsuccess", "/", domain );
  Cookies.remove( 'ssoid' );
  Cookies.remove( 'MSCSAuthDetail' );
  Cookies.remove( 'articleid' );
  Cookies.remove( 'txtmsg' );
  Cookies.remove( 'tflocation' );
  Cookies.remove( 'tfemail' );
  Cookies.remove( 'setfocus' );
  Cookies.remove( 'fbookname' );
  Cookies.remove( 'CommLogP' );
  Cookies.remove( 'CommLogU' );
  Cookies.remove( 'FaceBookEmail' );
  Cookies.remove( 'Fbimage' );
  Cookies.remove( 'fbooklocation' );
  Cookies.remove( 'Fboauthid' );
  Cookies.remove( 'Fbsecuritykey' );
  Cookies.remove( "fbname" );
  Cookies.remove( "fbLocation" );
  Cookies.remove( "fbimage" );
  Cookies.remove( "fbOAuthId" );
  Cookies.remove( 'MSCSAuth' );
  Cookies.remove( 'MSCSAuthDetail' );
  Cookies.remove( 'MSCSAuthDetails' );
  Cookies.remove( 'ssosigninsuccess' );
  Cookies.remove( 'Twimage' );
  Cookies.remove( 'TwitterUserName' );
  Cookies.remove( 'Twoauthid' );
  Cookies.remove( 'Twsecuritykey' );
  Cookies.remove( "otuid" );
  Cookies.remove( "otemail" );
  Cookies.remove( "otname" );
  Login._this.logouthandler();
}
Login.socialappurlSuccess = function(data,callback){
  
  var ssoid = cookies.get( "ssoid" ) || cookies.get( "ssoId" );
  Login.getUsersInfo({ssoid: ssoid}, function (user) {
    if (callback) {
      callback(user[0] || user);
    }
  });


/*  console.log("INSIDE SOCIAL APP URL SUCCESS==============",ssoid);
  if(location.hostname.indexOf(".indiatimes.com") > -1){
    Login.getUsersInfo({ssoid: ssoid}, function (user) {
      if (callback) {
        callback(user[0] || user);
      }
    });
  }else {
    var socialappcdurl = 'http://api.newspointapp.com/v1validateTicket?ticketId=' + data.ticketId + '&channel=' + Login.getChannel().toLowerCase();
    fetch(socialappcdurl,{credentials: 'include'}).then((response) => response.json()).then(function(data){
      // get user info from mytimes
      //console.log("INSIDE SOCIAL APP URL==============",data, ssoid);
      Login.getUsersInfo({ssoid: ssoid}, function (user) {
        if (callback) {
          callback(user[0] || user);
        }
      });
    }).catch((err)=>{
      console.log("INSIDE SOCIAL APP URL catch==============",err);
    });
  }*/
}
Login.userStatusSuccess = function(data,callback){
  //console.log("========================== INSIDE USER STATUS SUCCESS",data,callback);
  if (data.ticketId != null && data.ticketId != undefined && data.ticketId.length > 0) {
    var socialappurl = `${config.API_URL}/validateticket?ticketId=${data.ticketId}&channel=newspoint`;
    //console.log(socialappurl);
    // set old cookies
    fetch(socialappurl,{credentials: 'include'}).then((response) => response.json())
    .then((json) => {
      //console.log("INSIDE FETCH CHECK USER", json);
      Login.socialappurlSuccess(data,callback)
    }).catch((error)=>{
      //console.log("INSIDE USER STATUS ERROR");
      Login.userStatusError(error);
    })


    // fetch(socialappurl,{credentials: 'include'}).then(
    //   data1 => Login.socialappurlSuccess(data1,callback),
    //   error => Login.userStatusError(error)
    // ).catch(function(error){
    //   console.log("INSIDE USER STATUS ERROR");
    //   Login.userStatusError(error);
    // });  
  } else {
    if (callback) {
      callback(null);
    }
  }
}
Login.userStatusError = function(err){
  //console.log("userstatus error :", err);
}
Login.newLoginConfig = function(){
  return {
    check_user_status: function ( params, callback ) {
    let url = 'https://jsso.indiatimes.com/sso/crossdomain/getTicket?version=v1&platform=wap&channel='+Login.getChannel();
    fetchJsonP(url,{method: 'GET', mode: 'cors', credentials: 'include'})
      .then((response) => response.json())
      .then((json) => {
        //console.log("INSIDE FETCH CHECK USER", json);
        Login.userStatusSuccess(json, callback);
      }).catch((err) => {
        //console.log("INSIDE FETCH CHECK USER error",err);
        Login.userStatusError(err);
    });


      // fetch('https://jsso.indiatimes.com/sso/crossdomain/getTicket?version=v1&platform=wap&channel='+Login.getChannel(), {credentials: "include"}).then((response)=>{
      //   response.json().then((data)=>{
      //     console.log("=============INSIDE FETCH ERROR",e);
      //     Login.userStatusSuccess(data, callback);
      //   });
      // }).catch((error)=>{
      //     console.log("=============INSIDE FETCH ERROR",e);
      //     Login.userStatusError(error)
        
      // })

//       fetch('https://jsso.indiatimes.com/sso/crossdomain/getTicket?version=v1&platform=wap&channel='+Login.getChannel(),{
//   credentials: "same-origin"
// }).then(
//         data => Login.userStatusSuccess(data,callback),
//         error => Login.userStatusError(error)
//       ).catch(function(error){
//         console.log("INSIDE FETCH CATCH");
//         Login.userStatusError(error);
//       });  
    },
    mapping: {
    //to : from
    "uid": "uid",
    "email": "EMAIL", // map email
    "id": "_id",
    "name": "FL_N",
    "username": "D_N_U",
    "fullName": "FL_N",
    "firstName": "F_N",
    "lastName": "L_N",
    "icon": "tiny",
    "link": "profile",
    "CITY": "CITY",
    "thumb": "thumb",
    "followersCount": "F_C",
    "FE_C": "FE_C",
    "I_U_A": "I_U_A",
    "I_I_L": "I_I_L",
    "badges": "badges",
    "rewards": "rewards",
    "whatsonid": "W_ID"
    }
  }
}
// Login.getUsersInfo = function ( _params, callback ) {
//   return Login.mytimesapi( "usersInfo", _params, callback );
// }
Login.getUsersInfo = function(_params, callback) {

  var url = "https://myt.indiatimes.com/mytimes/profile/info/v1/?ssoid="+_params.ssoid;
  //console.log("Inside getUsersInfo", _params, url);
  //console.log(url);
  fetchJsonP(url,{method: 'GET', mode: 'cors', credentials: 'include'}).then(response =>{
    return response.json()
  }).then((json)=>{
    //console.log("GET USERS INFO",json,Login._this);

    Login._this.handleLoginCallback(json);
  }).catch((err)=>{
    //console.log("GET USERS INFO ERROR",err);
  });



  /*.then((data)=>{
    console.log("MY TIMES API",data,"hello");
  }).catch((err)=>{
    
    console.log("MY TIMES API ERROR",err);
  });*/

/*  console.log("inside my times api",value);
  return ajax.get( util.val( value.url, value.params ), util.extend( true, {}, value.params, _params ), function ( data ) {
    if( callback ) {
      try {
        callback( data );
      } catch( e ) {
        event.publish( "logger.error", e.stack );
      }
    }
  }, value.type || "jsonp" ).error( function () {
    if( callback ) {
      try {
        callback();
      } catch( e ) {
        event.publish( "logger.error", e.stack );
      }
    }
  });*/
}
Login.renderPlugins = function ( user ) {
  user = user || Login.getUser();
  if( user ) {
    this.setState({isLoggedIn: true,userName:user.getFirstName()});
    //document.querySelector( "[data-plugin='user-isloggedin']" ).style.display = 'block';
    //document.querySelector( "[data-plugin='user-notloggedin']" ).style.display = 'none';
    //document.querySelector( "[data-plugin='user-name']" ).innerText =  user.getFirstName();
    //                $("[data-plugin='user-icon']").attr("data-default", $("[data-plugin='user-icon']").attr("src"));//todo debug data-src, was not working, fix in html also
    document.querySelector( "[data-plugin='user-icon']" ).setAttribute( "src", user.getIcon() ); //todo debug data-src, was not working, fix in html also
    document.querySelector( "[data-plugin='user-thumb']" ).setAttribute( "src", user.getThumb() );
    /*api.getRewards( {
      //uid: user.getEmail()
      uid: user.getUid()
    }, function ( rewards ) {
      if( rewards && rewards.output && rewards.output.user && rewards.output.user.levelName ) {
        $( "[data-plugin='user-points']" ).text( ( rewards.output.user.statusPoints ) );
        $( "[data-plugin='user-level']" ).text( ( rewards.output.user.levelName ) );
        $( "[data-plugin='user-points-wrapper']" )
          .show()
          .addClass( "points_" + rewards.output.user.levelName.toLowerCase() );
      } else {
        $( "[data-plugin='user-points-wrapper']" ).hide();
      }
    } );*/
  } else {
    this.setState({isLoggedIn: false,userName:''});
    document.querySelector( "[data-plugin='user-icon']" ).setAttribute( "src", config.default_user_icon ); //todo debug data-src, was not working, fix in html also
    document.querySelector( "[data-plugin='user-thumb']" ).setAttribute( "src", config.default_user_icon );
    //document.querySelector( "[data-plugin='user-isloggedin']" ).style.display = 'none';
    //document.querySelector( "[data-plugin='user-notloggedin']" ).style.display = 'block';
  }

  //$( "body" ).toggleClass( "loggedin", !!user );
};
Login.isLoggedInSuccess = function(result,callback){
  var _user = Login.getNewUser( result, Login.defaultConfig.mapping );
  //console.log('haha',_user);
  if( _user ) {
    _user.loginType = Cookies.get( "LoginType" );
    _user.facebook = {
      name: Cookies.get( "fbookname" ),
      location: Cookies.get( "fbooklocation" ),
      image: Cookies.get( "Fbimage" ),
      email: Cookies.get( "FaceBookEmail" ),
      oauth: Cookies.get( "Fboauthid" )
    };
    _user.twitter = {
      name: Cookies.get( "TwitterUserName" ),
      //                location:cookie.get("fbooklocation"),
      image: Cookies.get( "Twimage" ),
      //                email:cookie.get("FaceBookEmail"),
      oauth: Cookies.get( "Twoauthid" )
    };
    Login.setUser( _user );
  } else {
    Login.removeUser();
  }
  if( callback ) {
    callback( _user );
  }
}
Login.isLoggedIn = function ( callback ) {
  //let userStatus = Login.defaultConfig.check_user_status({},function(data){
    //console.log("<===============>Inside callback",data);
  //});
  //console.log(userStatus,"<===============>");
    // fetch(Login.defaultConfig.check_user_status()).then(
    //   data => Login.isLoggedInSuccess(data,callback)
    // ).catch(function(error){
    //   console.log(error);
    // });  
};
Login.removeUser = function ( userId ) {
  if( Login.defaultConfig.multiuser ) {
    if( userId ) {
      delete Login.defaultConfig.userList[ userId ];
    } else {
      throw new Error( "'userId' is required to remove a user." );
    }
  } else {
    delete Login.defaultConfig.userList[ Login.defaultConfig.single_user_id ];
  }
  Login.statusChange( null );
};
Login.setUser = Login.addUser = function ( _user ) {
  if( typeof _user !== 'undefined' && !Login.isUser( _user ) ) {
    throw new Error( "Object is not an instance of User, use 'user.getNewUser()' to get a User object." );
  }
  if( Login.defaultConfig.multiuser ) {
    Login.defaultConfig.userList[ _user.id ]( _user );
  } else {
    Login.defaultConfig.userList[ Login.defaultConfig.single_user_id ] = _user;
  }
  Login.statusChange( _user );
};
Login.getUser = function ( userId ) {
  if( Login.defaultConfig.multiuser ) {
    return Object.assign(true, {}, Login.defaultConfig.userList[ userId ]);
  } else {
    return Login.defaultConfig.userList[ Login.defaultConfig.single_user_id ];
  }
};
Login.statusChange = function ( user ) {
  console.info( "User Status:" + ( user ? user.uid : null ) );
  //event.publish( "user.status", user );
  // Create the event
  let event = new CustomEvent("user.status", { detail: ( user ? user.uid : null ) });
  // Dispatch/Trigger/Fire the event
  document.dispatchEvent(event);
};
Login.onStatusChange = function ( callback ) {
  document.addEventListener("user.status", callback ,false);
};
Login.updateConfig = function ( init_config ) {
  if( init_config ) {
    Login.defaultConfig = Object.assign( true, {}, Login.defaultConfig, init_config );
  }
};
Login.init = function ( init_config, _this ) {
  Login._this = _this;
  Login.updateConfig( init_config );
  if( Login.defaultConfig.renderer === true ) {
    Login.onStatusChange( function ( _user ) {
      //Login.renderPlugins( _user );
    } );
  }
  Login.isLoggedIn( function () {} );
  //Login.initActions();
};
Login.initActions = function () {
  document.querySelector( "[data-plugin='user-logout']" ).addEventListener('click', function () {
      Login.logout();
    } );
  document.querySelector( "[data-plugin='user-login']" ).addEventListener('click', function () {
      Login.login();
    } );
  document.querySelector( "[data-plugin='user-register']" ).addEventListener('click', function () {
      Login.register();
    } );
  document.querySelector( "[data-plugin='user-login-facebook']" ).addEventListener('click', function () {
      Login.loginWithFacebook();
    } );
  document.querySelector( "[data-plugin='user-login-twitter']" ).addEventListener('click', function () {
      Login.loginWithTwitter();
    } );
  document.querySelector( "[data-plugin='user-login-google']" ).addEventListener('click', function () {
      Login.loginWithGoogle();
    } );
};


const rxOne = /^[\],:{}\s]*$/;
const rxTwo = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
const rxThree = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const rxFour = /(?:^|:|,)(?:\s*\[)+/g;
const isJSON = (input) => (
  input.length && rxOne.test(
    input.replace(rxTwo, '@')
      .replace(rxThree, ']')
      .replace(rxFour, '')
  )
);

export default withCookies(Login);