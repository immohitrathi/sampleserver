import React, { PureComponent } from 'react';
class FAQ extends PureComponent {
  render() {  
    const {params, location} = this.props;
    const langSelected = typeof params.lang != 'undefined' ? params.lang.toLowerCase() : 'english';
    const filterLangs = ['Nepali', 'Asamiya', 'Urdu', 'Odia', 'Punjabi'];
    const notSupportedLangs = filterLangs.map((it)=>it.toLowerCase());
    let currentLanguage = notSupportedLangs.includes(langSelected) ? 'english' : langSelected;
    let showBanner = typeof location != 'undefined' && typeof location.query != 'undefined' && typeof location.query.fv != 'undefined' && (isNaN(location.query.fv) || location.query.fv == '') ? true : false;
    const timerFaq = typeof location != 'undefined' && typeof location.query != 'undefined' && typeof location.query.timer != 'undefined' && (location.query.timer == "true") ? true : false;
    const cashFaq = typeof location != 'undefined' && typeof location.query != 'undefined' && typeof location.query.cash != 'undefined' && (location.query.cash == "true") ? true : false;
    return([
        (()=>{
        return (
            showBanner ?
            <div className="faq-banner">
                <div className="faq-before" style={{display:'none'}}>
                    <div className="icon"></div>
                    <div className="title">You can start earning more tokens with our upcoming app update!</div>
                    <div className="sub-title">Your existing tokens are safe and redeemable against exciting deals.</div>
                </div>
                <div className="faq-after">
                    <div className="icon"></div>
                    <div className="title"><div style={{color: '#ce4649', marginBottom: '5px'}}>Not able to earn tokens?</div>Please update your app to continue earning NewsPoint tokens</div>
                    <div className="sub-title">Your existing tokens are safe and redeemable against exciting deals.</div>
                </div>
            </div>
            : null )
        })(),
        (()=>{
            switch(currentLanguage) {
                case 'english':
                return(
                    <div key="a1" className="loot-faq">
                        <div className="faq-title">FAQS</div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What are NewsPoint (NP) Token(s)</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP token(s) are the virtual currency that can be used to redeem exciting offers/vouchers from the NewsPoint App.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What are My activities ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Activities are different ways (Daily Check-In, Read article, Watch a video) that helps you earn NewsPoint token(s).</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Daily Check-In</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Open app daily & earn NewsPoint token(s). More days you check-in consecutively, more you earn. On each CheckIn on 6 consecutive days you earn 3 Token(s) & 7th day checkIn lets you earn 10 bonus Token(s). Missed a day ? No worries all your previous earnings remains however, checkIn cycle restarts.</span>
                            </div>
                        </div>
                        {/*<div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Refer the App</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Referring the App to friends is the faster way to earn NP token(s). You can earn upto 10,000 NP token(s) by referring to friends & family.</span>
                            </div>
                        </div>*/}
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Read an Article</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">This Activity makes you earn NP Token(s) everytime when you read an article. In case of frequent swipes on articles NP token(s) may not be allocated.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Watch a video</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">This Activity makes you earn NP Token(s) everytime when you watch a video. NP Token(s) are attributed for this activity everytime when you watch a video. In case of frequent video play activity the token(s) may not be attributed.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do I Redeem ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In order to Redeem the NP Token(s), you need to login first & go to My activity page. tapping on Redeem will showcase various offers to choose from.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What are Redeemable Token(s)?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Redeemable token(s) are the eligible token(s) that can be used for redemption against the exciting offers.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does offers remains same all the time?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">We work hard to revise the offers day in day out to add more value & provide better options to redeem.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">When do my earned Tokens expire?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Token expires exactly one year from the day it is earned.</span>
                            </div>
                        </div>
                        {timerFaq &&
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is a timer activity?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">With Timer Activity, you get to earn NewsPoint Token(s). Well, it is pretty simple! the timer starts running every time you open the app and start using it. And, each time the timer completes its duration, you get NewsPoint Token(s). It's easy! Isn't it? Also, the timer will get paused when the app moves to the background. But, don't worry. It will restart in no time when the app comes back to the foreground within 30 minutes. However, the timer will re-initiate if you return after 30 minutes.</span>
                            </div>
                        </div>
                        }
                        {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is Token to Cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens to cash is an offering by the help of which tokens earned can be converted into Paytm cash.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Is there a limit on converting tokens into cash per day</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes there is a daily limit per user for converting tokens into cash. the capping is placed both on higher and lower side.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does daily tokens limit changes for conversion ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes it is at the sole discretion of the Times Internet Limited to update the limit as and when required as per business needs.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do i know the value of my tokens?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash equavalent value of tokens can be seen on the Earn tokens screen.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Where do I find the tokens converted status ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">All the transactions done against tokens are stored on transactions screen</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My token balance is deducted but I did't recieve cash in paytm account</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In case if a transaction is marked as 'Failed' & tokens get deducted. Please dont worry about the tokens as the tokens will be credited back within 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How much time does it takes to recieve paytm cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash is credited in maximum of 30 minutes post the conversion is successfully done</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What does different status shown on transaction screen mean?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction done for converting tokens in to paytm cash are:<br/>
                                    1. Success - tokens are converted successfully<br/>
                                    2. Failure - due to some issue tokens conversion has failed<br/>
                                    3. Pending - tokens conversion request has been received for verification <br/>
                                    4. Refund - In case if the tokens conversion fails the tokens deducted gets refunded after some time
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My transaction status is shown as Falure and yet my tokens deducted from tokens balance?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens deducted for unsuccessful conversion are credited back in maximum of 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What all leads to failure of transaction?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction failure can occur due to multiple reasons. Reason for failure is shown with respective transaction.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is needed to get the tokens converted successfully?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">User need to have below while converting tokens<br/>
                                    1. Login to App<br/>
                                    2. Enter an active Paytm number<br/>
                                    3. Tokens balance shall be more than minimum tokens required for conversion.
                                </span>
                            </div>
                        </div></div>}
                    </div>)
                case 'hindi':
                   return( <div key="a1" className="loot-faq">
                        <div className="faq-title">FAQS</div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">क्या है न्यूजप्वाइंट (NP) Token(s)?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP Token(s) वर्चुअल करेंसी हैं जिनका उपयोग न्यूजप्वाइंट ऐप से रोमांचक ऑफ़र / वाउचर को रिडीम करने के लिए किया जा सकता है।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">मेरी एक्टिविटिज क्या हैं?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">आपकी एक्टिविटिज के कई तरीके हैं (डेली चेक-इन, आर्टिकल पढ़ना, वीडियो देखना) जो आपको न्यूजप्वाइंट Token(s) कमाने में मदद करते हैं।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">डेली चेक-इन</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ऐप रोजाना खोलें और कमाएं NewsPoint Token(s). आप हर दिन जितना ज्यादा ऐप खोलेंगे, उतना ज्यादा कमाएंगे। लगातार 6 दिन ऐप खोलने पर 3 Token(s) और 7वें दिन मिलेंगे 10 बोनस Token(s). यदि आपने किसी दिन मिस किया? तो चिंता ना करें, आपके कमाए Token(s) बचे रहेंगे. हालांकि, चेक-इन साइकल दोबारा से शुरू हो जाएगी.</span>
                            </div>
                        </div>
                        {/*<div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ऐप को रेफर करें या डाउनलोड कराएं</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">तेजी से NP Token(s) कमाने के लिए इस ऐप को अपने दोस्तों से शेयर करें। परिजनों और दोस्तों को ऐप रेफर करके आप 10,000 NP Token(s) तक कमा सकते हैं। </span>
                            </div>
                        </div>*/}
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">आर्टिकल पढ़ें</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">आपकी यह एक्टिविटी हर बार नए आर्टिकल पढ़ने पर NP Token(s) कमाने में मदद करती है। अगर आप तेजी से आर्टिकल स्वाइप करते हैं तो आपको NP Token(s) नहीं मिलेंगे।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">देखें वीडियो</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">आपकी यह एक्टिविटी हर बार नए वीडियो देखने पर NP Token(s) कमाने में मदद करती है। आप जब भी वीडियो देखेंगे आपको NP Token(s) मिलते रहेंगे। अगर आप तेजी से वीडियो स्वाइप करते हैं तो आपको NP Token(s) नहीं मिलेंगे।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">प्वाइंट्स को कैसे करें रिडीम?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP Token(s) रिडीम करने के लिए सबसे पहले आपको लॉग-इन कर माई एक्टिविटिज पेज पर जाना होगा। रिडीम पर क्लिक करने के साथ ही बहुत सारे ऑफर्स आपको दिखाई देंगे।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">रिडीम करने योग्य Token(s) क्या हैं?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">रिडीम करने योग्य Token(s) वह है, जिसका उपयोग बेहतरीन ऑफर्स के लिए किया जा सकता है।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">क्या ये ऑफर्स हर समय एक समान रहते हैं?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">हम हर दिन ऑफर्स को संशोधित करने के लिए कड़ी मेहनत करते हैं ताकि आपको हम बेहतर विकल्प प्रदान कर सकें।</span>
                            </div>
                        </div>
                        {timerFaq &&
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">टाइमर एक्टिविटी क्या है?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">टाइमर एक्टिविटी के साथ आप NewsPoint टोकन्स कमा सकते हैं। यह बहुत ही आसान है! आप हर बार, जब आप ऐप खोलते हैं और उसका उपयोग करना शुरू कर देते हैं, तब टाइमर शुरू हो जाएगा। और हर बार ऐप में एक निश्चित समय पूरा करने पर आपको NewsPoint टोकन प्राप्त होते हैं। यह बहुत ही आसान है! है ना? साथ ही, ऐप को बैकग्राउंड में ले जाने पर टाइमर पॉज़ हो जाएगा। लेकिन, चिंता न करें। अगर आप 30 मिनट के अंदर इसे फिर से खोलते हैं तो यह दोबारा पुराने समय से शुरू हो जाएगा। हालांकि, यदि आप 30 मिनट बाद लौटते हैं, तो टाइमर फिर से शुरू होगा।</span>
                            </div>
                        </div>}
                        {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">टोकन टू कैश क्या है?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">टोकन टू कैश एक आकर्षक ऑफर है। इसके ज़रिए आप टोकंस को अपने पेटीएम में कैश कर सकते हैं </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">टोकंस को कैश में बदलने के लिए कोई डेली लिमिट है?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">जी हां, टोकंस को कैश में बदलने के लिए डेली लिमिट है। अधिकतम और न्यूनतम, दोनों तरह की लिमिट इसमें शामिल हैं। </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">कनवर्जन के लिए डेली टोकन लिमिट बदलती है?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">हां, बिजनेस की ज़रूरतों को ध्यान में रखते हुए टाइम्स इंटरनेट लिमिटेड के पास सर्वाधिकार सुरक्षित हैं। </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">मैं अपने टोकंस की वैल्यू कैसे जान सकता/सकती हूं?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">इसे आप अर्न्स टोकंस स्क्रीन पर देख सकते हैं</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">टोकन कनवर्ट होने का स्टेटस कहां दिखेगा?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">यह सब आपको ट्रांजैक्शन स्क्रीन पर दिख जाएगा</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">मेरा टोकन बैलेंस कट गया लेकिन कैश नहीं आया</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ट्रांजैक्शन फेल्ड दिखा और टोकंस कट गए तो चिंता ना करें आपके टोकंस 7 दिन के भीतर वापस कर दिए जाएंगे </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">पेटीएम कैश कितनी देर में प्राप्त हो जाता है ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">पेटीएम कैश अधिकतम 30 मिनट में सफलतापूर्वक मिल जाता है। </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ट्रांजैक्शन स्क्रीन पर कुछ और दिखने का क्या आशय है?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ट्रांजैक्शन पूरा होने पर आपको दिखेगा -<br/>
                                    1. सफल - टोकंस का कनवर्जन सफल हुआ। <br/>
                                    2. फेल - किसी कारण से कनवर्जन नहीं हो सका<br/>
                                    3. पेंडिंग - टोकन का कनवर्जन वेरिफिकेशन तक रुका है  <br/>
                                    4. रिफंड - टोकन कनवर्जन फेल होने पर कुछ देर में वापस मिल जाएँगे
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ट्रांजैक्शन स्टेटस फेल दिख रहा है लेकिन मेरे टोकंस कट गए हैं</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">असफल कनवर्जन पर कटे हुए टोकंस अधिकतम 7 दिन के भीतर वापस आ जाते हैं </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ट्रांजैक्शन फेल किन कारणों से होता है?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ट्रांजैक्शन फेल होने के कई कारण हो सकते हैं. कारण शो भी होता है</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">टोकन को सफलतापूर्वक कनवर्ट करने के लिए क्या ज़रूरी है?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">यूज़र को ये स्टेप फॉलो करने होंगे - <br/>
                                    1. लॉग-इन होना ज़रूरी <br/>
                                    2. सक्रिय पेटीएम नंबर होना ज़रूरी <br/>
                                    3. टोकन बैलेंस की लिमिट कनवर्जन के लिए उपयुक्त होना ज़रूरी 
                                </span>
                            </div>
                        </div></div>}
                    </div>)
                case 'tamil':
                return(<div key="a1" className="loot-faq">
                        <div className="faq-title">FAQS</div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">என்னென்ன நியூஸ்பாயின்ட் காசுகள்  </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">நியூஸ்பாயின்டில் வவுச்சர் மற்றும் ஆபர்கள் பெற இந்த காசுகள் பயன்படுத்தலாம் </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">என்னுடைய செயல்பாடுகள் என்ன?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">செய்தி படிப்பது, வீடியோ பார்ப்பது, தினமும் செக் செய்வது என செயல்பாடுகள் வேறுபடுகிறது</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">தினமும் செக் செய்யவும் </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">தினசரி பயன்பாட்டைத் திறக்கவும் & NewsPoint நாணயங்களைப் பெறுங்கள். மேலும் நாட்களுக்கு நீங்கள் தொடர்ந்து சோதனை செய்துகொள்கிறீர்கள், மேலும் சம்பாதிக்கிறீர்கள். ஒவ்வொரு செக்சனையிலும் 6 தொடர் நாட்களில் நீங்கள் 3 நாணயங்கள் மற்றும் 7 வது நாளில் நீங்கள் 10 போனஸ் நாணயங்களை சம்பாதிக்கலாம். ஒரு நாள் தவறவிட்டதா? எந்த வருத்தமும் உங்கள் முந்தைய வருமானங்கள் இருப்பினும், காசோலை சுழற்சி மீண்டும் தொடர்கிறது.</span>
                            </div>
                        </div>
                        {/*<div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ஆப் பரிந்துரைக்கவும் </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">நண்பர்களுக்கு பரிந்துரைப்பது மூலம் வேகமாக காசுகள் சம்பாதிக்கலாம். நண்பர்கள் & குடும்பத்தினருக்கு பரிந்துரைப்பது மூலம் 10,000 காசுகள் சம்பாதிக்கலாம் </span>
                            </div>
                        </div>*/}
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">செய்தி படிக்கவும் </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">செய்திகள் படிக்கும்போது வீடியோ பார்க்கும்போது காசு கிடைக்கும். அடிக்கடி ஸ்வைப் செய்தால் காசு கிடைக்காது </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">வீடியோ பார்க்கவும் </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">வீடியோ பார்க்கும்போது எல்லாம் காசு கிடைக்கும். அடிக்கடி பார்க்கும்போது காசு கிடைக்காது.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">எப்படி காசு பெறுவது?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">log in செய்து முதலில் My Activity page செல்லவும். அங்கே பல்வேறு ஆபர்கள் இருக்கும். தேர்வு செய்யவும் .  </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">மீட்கப்படும் காசுகள்?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ஆபர்கள் பெறுவதற்கு மீட்கப்படும் காசுகள் தகுதி பெறுகின்றன </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does offers remains same all the time?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">We work hard to revise the offers day in day out to add more value & provide better options to redeem.</span>
                            </div>
                        </div>
                        {timerFaq &&
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">டைமர் எப்படி இயங்குகிறது?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">டைமர் உதவியுடன் நீங்கள் NewsPoint Token(s) வெல்ல முடியும். இது மிகவும் சுலபமானது. நீங்கள் ஒவ்வொரு முறை ஆப்-ஐ திறந்து பயன்படுத்தும்போதும் டைமர் இயங்கத் தொடங்கும். ஒவ்வொரு முறை டைமர் முடியும்போதும் NewsPoint Token(s) கிடைக்கும். இது சுலபம் இல்லையா? பேக்ரவுண்டில் ஆப் இயங்கினால், டைமர் தற்காலிகமாக நிற்கும். ஆனால், கவலை வேண்டாம். 30 நிமிடங்களுக்குள் ஆப்- பேக்ரவுண்டில் இருந்து முன்னே வந்தால் டைமர் மீண்டும் இயங்கும். ஆனால், 30 நிமிடங்களுக்கு மேல் ஆனால், டைமர் முதலில் இருந்து இயங்கத் தொடங்கும்.</span>
                            </div>
                        </div>}
                        {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is Token to Cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens to cash is an offering by the help of which tokens earned can be converted into Paytm cash.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Is there a limit on converting tokens into cash per day</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes there is a daily limit per user for converting tokens into cash. the capping is placed both on higher and lower side.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does daily tokens limit changes for conversion ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes it is at the sole discretion of the Times Internet Limited to update the limit as and when required as per business needs.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do i know the value of my tokens?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash equavalent value of tokens can be seen on the Earn tokens screen.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Where do I find the tokens converted status ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">All the transactions done against tokens are stored on transactions screen</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My token balance is deducted but I did't recieve cash in paytm account</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In case if a transaction is marked as 'Failed' & tokens get deducted. Please dont worry about the tokens as the tokens will be credited back within 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How much time does it takes to recieve paytm cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash is credited in maximum of 30 minutes post the conversion is successfully done</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What does different status shown on transaction screen mean?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction done for converting tokens in to paytm cash are:<br/>
                                    1. Success - tokens are converted successfully<br/>
                                    2. Failure - due to some issue tokens conversion has failed<br/>
                                    3. Pending - tokens conversion request has been received for verification <br/>
                                    4. Refund - In case if the tokens conversion fails the tokens deducted gets refunded after some time
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My transaction status is shown as Falure and yet my tokens deducted from tokens balance?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens deducted for unsuccessful conversion are credited back in maximum of 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What all leads to failure of transaction?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction failure can occur due to multiple reasons. Reason for failure is shown with respective transaction.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is needed to get the tokens converted successfully?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">User need to have below while converting tokens<br/>
                                    1. Login to App<br/>
                                    2. Enter an active Paytm number<br/>
                                    3. Tokens balance shall be more than minimum tokens required for conversion.
                                </span>
                            </div>
                        </div></div>}
                    </div>)
                case 'telugu':
                return(<div key="a1" className="loot-faq">
                        <div className="faq-title">FAQS</div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">NewsPoint (NP) Token(s) అంటే ఏమిటి..??</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP token(s) వర్చువల్ కరెన్సీగా చెప్పవచ్చు, NewsPoint App నుండి వీటిని ఉత్తేజకరమైన ఆఫర్లు / వోచర్లు రూపంలో పొందవచ్చు.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">నా ఆక్టివిటీలు ఏమిటి..??</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">కార్యక్రమాలను వివిధ మార్గాలు (డైలీ చెక్-ఇన్, ఆర్టికల్ చదవటం, వీడియో చూడటం) ఇవి మీరు NewsPoint token(s) సంపాదించడంలో సహాయపడ తాయి.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">రోజు చెక్-ఇన్?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">రోజు యాప్ ఓపెన్ చేసి NewsPoint token(s) పొందండి. వరుసగా చెక్ ఇన్ చేయటం ద్వారా మరిన్ని token(s) పొందగలరు. వరుసగా 6 రోజులు చెక్-ఇన్ చేయటం ద్వారా 3 token(s) మరియు 7వ రోజు చెక్-ఇన్ చేయటం ద్వారా అదనంగా 10 token(s) పొందగలరు. ఒకవేళ మధ్యలో ఒక రోజు చెక్-ఇన్ చేయనట్లైయితే, ఇదివరకు సంపాదించిన token(s) అలాగే ఉంటాయి కానీ చెక్-ఇన్ సైకిల్ పునఃప్రారంభమవుతుంది.</span>
                            </div>
                        </div>
                        {/*<div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">యాప్ ను రిఫర్ చేయండి</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">మీ స్నేహితులకు రిఫర్ చేయటం ద్వారా వేగంగా NP token(s) సంపాదించవచ్చు. స్నేహితులకు & కుటుంబ సభ్యులకు రిఫర్ చేయటం ద్వారా 10,000 NP token(s) పొందవచ్చు </span>
                            </div>
                        </div>*/}
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ఆర్టికల్ చదవండి </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ఆర్టికల్ చదివిన ప్రతిసారి NP token(s) సంపాదించవచ్చు. కానీ తరచుగా ఆర్టికల్ ను స్వైప్ చేయటం ద్వారా NP token(s) పొందలేరు</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">వీడియో చూడండి</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">వీడియో చుసిన ప్రతిసారి NP token(s) సంపాదించవచ్చు. కానీ తరచుగా వీడియోలు చూడటం ద్వారా మాత్రం NP token(s) పొందలేరు</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">నేను ఎలా రిడీమ్ చేయవచ్చు?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP token(s) రీడీమ్ చేయడానికి, మీరు ముందుగా లాగిన్ అయి & నా ఆక్టివిటీ పేజీకి వెళ్లాలి. Redeem నొక్కడం ద్వారా ప్రదర్శించబడే ఆఫర్లలో నచ్చిన దానిని మీరు ఎంచుకోవచ్చు.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">పునరుద్దరించదగిన token(s) అనగా ఏమిటి?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">రీడిమబుల్ token(s) ఉత్తేజకరమైన ఆఫర్ లను సొంతం చేసుకోటానికి ఉపయోగపడతాయి</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ప్రతి సారి ఈ ఆఫర్లు అన్నింటికీ ఒకేవిధంగా ఉంటాయా?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">రిడీమ్ చేసుకోటానికి మరింత విలువను & మంచి ఆప్షన్ లను అందించడానికి మేము ప్రయత్నిస్తున్నాము</span>
                            </div>
                        </div>
                        {timerFaq &&
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">పటైమర్ యాక్టివిటీ అంటే ఏమిటి?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">రటైమర్ యాక్టివిటీతో న్యూస్ పాయింట్ టోకెన్లు సులభంగా గెలవొచ్చు. న్యూస్ పాయింట్ యాప్‌ ఓపెన్ చేసిన ప్రతిసారి టైమర్ మొదలై మీకు టోకెన్లు సాధించవచ్చు. యాప్ మినిమైజ్ చేసి ఇతర యాప్ వాడుతున్నప్పుడు టైమర్ విరామంలో ఉంటుంది. 30 నిమిషాలలోపు న్యూస్ పాయింట్‌ యాప్‌ ఓపెన్ చేస్తే టైమర్ కంటిన్యూ అవుతుంది. 30 నిమిషాత అనంతరం యాప్ ఓపెన్ చేస్తే కొత్త టైమర్ స్టార్ట్ అవుతుంది.</span>
                            </div>
                        </div>}
                        {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is Token to Cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens to cash is an offering by the help of which tokens earned can be converted into Paytm cash.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Is there a limit on converting tokens into cash per day</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes there is a daily limit per user for converting tokens into cash. the capping is placed both on higher and lower side.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does daily tokens limit changes for conversion ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes it is at the sole discretion of the Times Internet Limited to update the limit as and when required as per business needs.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do i know the value of my tokens?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash equavalent value of tokens can be seen on the Earn tokens screen.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Where do I find the tokens converted status ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">All the transactions done against tokens are stored on transactions screen</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My token balance is deducted but I did't recieve cash in paytm account</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In case if a transaction is marked as 'Failed' & tokens get deducted. Please dont worry about the tokens as the tokens will be credited back within 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How much time does it takes to recieve paytm cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash is credited in maximum of 30 minutes post the conversion is successfully done</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What does different status shown on transaction screen mean?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction done for converting tokens in to paytm cash are:<br/>
                                    1. Success - tokens are converted successfully<br/>
                                    2. Failure - due to some issue tokens conversion has failed<br/>
                                    3. Pending - tokens conversion request has been received for verification <br/>
                                    4. Refund - In case if the tokens conversion fails the tokens deducted gets refunded after some time
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My transaction status is shown as Falure and yet my tokens deducted from tokens balance?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens deducted for unsuccessful conversion are credited back in maximum of 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What all leads to failure of transaction?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction failure can occur due to multiple reasons. Reason for failure is shown with respective transaction.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is needed to get the tokens converted successfully?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">User need to have below while converting tokens<br/>
                                    1. Login to App<br/>
                                    2. Enter an active Paytm number<br/>
                                    3. Tokens balance shall be more than minimum tokens required for conversion.
                                </span>
                            </div>
                        </div></div>}
                    </div>)
                case 'bengali':
                return(<div key="a1" className="loot-faq">
                        <div className="faq-title">FAQS</div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">নিউজপয়েন্ট (NP) TOKEN(s) কী?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">এটি ভার্চুয়াল কারেন্সি যেটা সহজেই ভাউচার বা অফারে রিডিম করতে পারবেন নিউজপয়েন্ট অ্যাপের মাধ্যমে।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">আমাকে কী করতে হবে এখানে?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">বিভিন্ন ধরনের অ্যাকটিভিটি রয়েছে। যেমন-প্রতিদিনের চেক-ইন, আর্টিকেল পড়া, ভিডিও দেখা যা TOKEN জিততে সাহায্য করবে</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">প্রতিদিনের চেক-ইন</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">রোজ নিউজপয়েন্ট অ্যাপ খুলুন আর জিতে নিন token। পরপর যতদিন অ্যাপ খুলবেন, ততই আপনি জিততে পারবেন token। প্রত্যেক চেক-ইনে আপনি পাবেন ১০ token। আর সপ্তম দিনে চেন-ইন করলেই ৫০ বোনাস token জিতে নেওয়ার সুযোগ থাকছে। পরপর ৬ দিন চেক-ইন করতে পারেন নি? চিন্তা নেই, আগের token-গুলির আপনার থেকেই যাচ্ছে। তবে সাইকেল আবার প্রথম থেকে শুরু হবে সেক্ষেত্রে।</span>
                            </div>
                        </div>
                        {/*<div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">অ্যাপ রেফার করা</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">অ্যাপ রেফার করে TOKEN জেতা অনেক সহজ। যত বেশি রেফার, ততই কয়েন জেতার সুযোগ। এভাবেই আপনি ১০,০০০ NP TOKEN পর্যন্ত জিতে নিতে পারেন।</span>
                            </div>
                        </div>*/}
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">আর্টিক্যাল পড়া</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">এর মাধ্যমে একটি আর্টিক্যাল পড়ে আপনি সহজেই জিতে নিতে পারেন NP TOKEN(s)। তবে একই আর্টিক্যালে বারবার ক্লিক করলে মিলবে না পয়েন্ট</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ভিডিও দেখা</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ভিডিও দেখার মাধ্যমে সহজেই জিতে নেওয়া যায় NP TOKEN(s)। তবে এক ভিডিও বারবার দেখলে মিলবে না NP TOKEN(s)।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">কীভাবে আমি TOKEN(s) রিডিম করব?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">TOKEN(s) রিডিম করার জন্য প্রথমে আপনাকে লগ-ইন করতে হবে। তারপর সেখানে গিয়ে মাই অ্যাকটিভিটিতে গিয়ে একাধিক অপশনের মাধ্য থেকে রিডিম করতে পারবেন।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">রিডিম করা যাবে কোন TOKEN(s)?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">অফারের জন্য যে কয়েন ব্যবহার করা যাবে তাকেই রিডিম কয়েন বলে</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">অফার সবসময় কি একই থাকে?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">আমরা সবসময় চেষ্টা করি যাতে আরও নতুন নতুন অফার আপনাদের সামনে নিয়ে আসতে পারি। </span>
                            </div>
                        </div>
                        {timerFaq &&
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">টাইমার অ্যাকটিভিটি কী?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">টাইমার অ্যাকটিভিটির মাধ্যমে আপনি জিততে পারেন NewsPoint Token(s)। এটা অত্যন্ত সহজ উপায়! প্রত্যেকবার আপনি অ্যাপ খুলে ব্যবহার করলেই এই টাইমার কাজ করা শুরু করে। আর প্রত্যেকবার টাইমার তার নির্ধারিত সময় শেষ করলেই আপনি পেয়ে যাবেন NewsPoint Token(s)। এটা সত্যিই সহজ নয়? এছাড়াও, অ্যাপটি ব্যাকগ্রাউন্ডে চলে গেলে টাইমারও থেমে যাবে নিজে থেকেই। তবে, চিন্তা করার কিছু নেই। ফের অ্যাপটি আবার ৩০ মিনিটের মধ্যে অ্যাকটিভ হয়ে গেলেই টাইমার নিজে থেকেই কাজ করতে শুরু করে দেবে। যদিও মনে রাখবেন, ৩০ মিনিট পর অ্যাপ অ্যাকটিভ হলে নতুন করে আবার টাইমার চালু হবে।</span>
                            </div>
                        </div>}
                        {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is Token to Cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens to cash is an offering by the help of which tokens earned can be converted into Paytm cash.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Is there a limit on converting tokens into cash per day</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes there is a daily limit per user for converting tokens into cash. the capping is placed both on higher and lower side.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does daily tokens limit changes for conversion ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes it is at the sole discretion of the Times Internet Limited to update the limit as and when required as per business needs.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do i know the value of my tokens?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash equavalent value of tokens can be seen on the Earn tokens screen.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Where do I find the tokens converted status ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">All the transactions done against tokens are stored on transactions screen</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My token balance is deducted but I did't recieve cash in paytm account</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In case if a transaction is marked as 'Failed' & tokens get deducted. Please dont worry about the tokens as the tokens will be credited back within 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How much time does it takes to recieve paytm cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash is credited in maximum of 30 minutes post the conversion is successfully done</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What does different status shown on transaction screen mean?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction done for converting tokens in to paytm cash are:<br/>
                                    1. Success - tokens are converted successfully<br/>
                                    2. Failure - due to some issue tokens conversion has failed<br/>
                                    3. Pending - tokens conversion request has been received for verification <br/>
                                    4. Refund - In case if the tokens conversion fails the tokens deducted gets refunded after some time
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My transaction status is shown as Falure and yet my tokens deducted from tokens balance?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens deducted for unsuccessful conversion are credited back in maximum of 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What all leads to failure of transaction?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction failure can occur due to multiple reasons. Reason for failure is shown with respective transaction.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is needed to get the tokens converted successfully?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">User need to have below while converting tokens<br/>
                                    1. Login to App<br/>
                                    2. Enter an active Paytm number<br/>
                                    3. Tokens balance shall be more than minimum tokens required for conversion.
                                </span>
                            </div>
                        </div></div>}
                    </div>)
                case 'kannada':
                return(<div key="a1" className="loot-faq">
                        <div className="faq-title">FAQS</div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">NewsPoint (NP) Token(s) ಅಂದರೆ ಏನು </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP token(s) ಅಂದರೆ ವರ್ಚುಯಲ್ ಕರೆನ್ಸಿ ನ್ಯೂಸ್ ಪಾಯಿಂಟ್ ಆಪ್ ನಿಂದ ನಿಮ್ಮ ಎಕ್ಸಿಸಿಟಿಂಗ್ ಆಫರ್ಸ್ ಅನ್ನು ರಿಡೀಮ್  ಮಾಡಲು ಉಪಯೋಗಿಸಬಹುದು </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ನನ್ನ ಆಕ್ಟಿವಿಟೀಸ್ ಯಾವುವು ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ಚಟುವಟಿಕೆಗಳು ವಿಭಿನ್ನ ಮಾರ್ಗಗಳಾಗಿವೆ (ಡೈಲಿ ಚೆಕ್ ಇನ್, ಆರ್ಟಿಕಲ್ ಓದುವುದು , ವಿಡಿಯೋ ನೋಡುವುದು ) ಇವು ನಿಮಗೆ ನ್ಯೂಸ್ ಪಾಯಿಂಟ್ ಆಪ್ token(s) ಗಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ಡೈಲಿ ಚೆಕ್ ಇನ್</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ಪ್ರತಿ ದಿನ ಆಪ್ ಓಪನ್ ಮಾಡಿ ಮತ್ತು ನ್ಯೂಸ್ ಪಾಯಿಂಟ್ token(s) ಗೆಲ್ಲಿರಿ . ಸತತವಾಗಿ ಅತಿ ಹೆಚ್ಚು ಚೆಕ್ ಇನ್ ಮಾಡಿದರೆ ನೀವು ಹೆಚ್ಚು ಗೆಲ್ಲಬಹುದು. 6 ದಿನ ಸತತವಾಗಿ ಚೆಕ್ ಇನ್ ಮಾಡಿದರೆ ನೀವು 3 token(s) ಗಳಿಸಬಹುದು. 7 ನೇ ದಿನ ಚೆಕ್ ಇನ್ ಮಾಡಿದರೆ 10 ಬೋನಸ್ token(s) ಗಳಿಸಬಹುದು.ಈ ದಿನ ಮಿಸ್ ಆಯ್ತಾ ? ಚಿಂತಿಸಬೇಡಿ ನಿಮ್ಮ ಎಲ್ಲ ಹಿಂದಿನ ಗಳಿಕೆಗಳು ಹಾಗೆ ಇವೆ .ಚೆಕ್ ಇನ್ ಸೈಕಲ್ ಪುನಃ ಶುರುವಾಗುವುದು</span>
                            </div>
                        </div>
                        {/*<div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ಆಪ್ ಅನ್ನು ರೆಫರ್ ಮಾಡಿ </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP token(s) ಫಾಸ್ಟ್ ಆಗಿ ಪಡೆಯುವ ಮಾರ್ಗ ಅಂದರೆ ನಿಮ್ಮ ಸ್ನೇಹಿತರಿಗೆ ಆಪ್ ಅನ್ನು ರೆಫರ್ ಮಾಡುವುದರಿಂದ. ನೀವು ನಿಮ್ಮ ಸ್ನೇಹಿತರು ಮತ್ತು ಫ್ಯಾಮಿಲಿ ಗೆ ರೆಫರ್ ಮಾಡುವುದರಿಂದ 10,000 NP Token(s)  ಗಳಿಸಬಹುದು .</span>
                            </div>
                        </div>*/}
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ಆರ್ಟಿಕಲ್ ಓದಿ</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ಈ ಆಕ್ಟಿವಿಟಿ ಇಂದ ನೀವು ಪ್ರತಿ ಬಾರಿ ಆರ್ಟಿಕಲ್ ಓದಿದಾಗ  ಗಳಿಸಬಹುದು NP Token(s) ಆರ್ಟಿಕಲ್ ಮೇಲೆ ಆಗಾಗ ಸ್ವೈಪ್ ಮಾಡಿದರೆ NP Token(s) ಸಿಗುವುದಿಲ್ಲ .</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ವಿಡಿಯೋ ನೋಡಿ </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ಈ ಆಕ್ಟಿವಿಟಿ ಇಂದ ನೀವು ಪ್ರತಿ ಬಾರಿ ವಿಡಿಯೋ ನೋಡಿದಾಗ   ಗಳಿಸಬಹುದು NP Token(s). ಆರ್ಟಿಕಲ್ ಮೇಲೆ ಆಗಾಗ ಸ್ವೈಪ್ ಮಾಡಿದರೆ NP Token(s) ಸಿಗುವುದಿಲ್ಲ .</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ರಿಡೀಮ್ ಮಾಡುವುದು ಹೇಗೆ ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ರಿಡೀಮ್ ಮಾಡಬೇಕಾದರೆ ನೀವು ಮೊದಲು ಲಾಗಿನ್ ಮಾಡಬೇಕು ಮತ್ತು ಮೈ ಆಕ್ಟಿವಿಟಿ ಪೇಜ್ ಗೆ ಹೋಗಬೇಕು ರಿಡೀಮ್ ಮೇಲೆ ಟಪ್ ಮಾಡುವುದರಿಂದ ನಿಮಗೆ ಹಲವಾರು ಆಫರ್ಸ್ ತೋರಿಸಲಾಗುತ್ತದೆ ಅದರಲ್ಲಿ ಆಯ್ಕೆ ಮಾಡಬೇಕು .</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ರಿಡೀಮೇಬಲ್ Token(s) ಅಂದರೆ ಏನು ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ಎಕ್ಸಿಸಿಟಿಂಗ್ ಆಫರ್ಸ್ ವಿರುದ್ಧ ನೀವು ರಿಡೀಮೇಬಲ್ Token(s) ಅನ್ನು ಉಪಯೋಗಿಸಬಹುದು </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ಏನು ಪ್ರತೀ ಬಾರಿ ಈ ಆಫರ್ ಒಂದೇ ರೀತಿ ಇರುತ್ತದೆಯೇ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ನಾವು ನಿಮಗೆ ರಿಡೀಂ ಗಾಗಿ ಉತ್ತಮ ಆಯ್ಕೆಗಳನ್ನು ನೀಡುವುದಕ್ಕಾಗಿ ಪ್ರತೀ ದಿನ ಆಫರ್ಸ್ ಗಳನ್ನು ಪರಿಷ್ಕರಿಸಲು ಕಠಿಣ ಶ್ರಮ ಪಡಬೇಕಾಗುತ್ತದೆ,</span>
                            </div>
                        </div>
                        {timerFaq &&
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ಟೈಮರ್ ಆಕ್ಟಿವಿಟಿ ಎಂದರೆ ಏನು?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ನಟೈಮರ್ ಆಕ್ಟಿವಿಟಿ ಮೂಲಕ ನೀವು ನ್ಯೂಸ್ ಪಾಯಿಂಟ್ ಟೋಕನ್(s) ಗಳಿಸಬಹುದು. ಇದು ತುಂಬಾ ಸರಳ. ಪ್ರತಿ ಬಾರಿ ನೀವು ಆಪ್ ಓಪನ್ ಮಾಡಿದಾಗಲೂ ಟೈಮರ್ ಆರಂಭವಾಗುತ್ತದೆ ಮತ್ತು ಪ್ರತಿ ಟೈಮರ್ ಸಮಯ ಮುಗಿಯುತ್ತಿದ್ದಂತೆ ನೀವು ನ್ಯೂಸ್ ಪಾಯಿಂಟ್ ಟೋಕನ್(S) ಗಳಿಸುತ್ತೀರಿ. ಇದು ಅತ್ಯಂತ ಸುಲಭವಲ್ಲವೇ? ಜೊತೆಗೆ, ಆಪ್ ಹಿಂಬದಿಗೆ ಸರಿದಾಗ ಟೈಮರ್ ತಾತ್ಕಾಲಿಕವಾಗಿ ನಿಂತುಕೊಳ್ಳುತ್ತದೆ. ಇದಕ್ಕೆನೀವು ತಲೆಕೆಡಿಸಿಕೊಳ್ಳುವ ಅಗತ್ಯವಿಲ್ಲ. ಕೇವಲ 30 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಆಪ್ ಮುಂಬದಿಗೆ ಬಂದಾಗ ಮತ್ತೊಮ್ಮೆ ಟೈಮರ್ ಆರಂಭವಾಗುತ್ತದೆ. 30 ನಿಮಿಷಗಳ ಬಳಿಕ ಮರಳಿದರೂ ಟೈಮರ್ ಮರು ಆರಂಭವಾಗುತ್ತದೆ.</span>
                            </div>
                        </div>}
                        {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is Token to Cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens to cash is an offering by the help of which tokens earned can be converted into Paytm cash.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Is there a limit on converting tokens into cash per day</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes there is a daily limit per user for converting tokens into cash. the capping is placed both on higher and lower side.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does daily tokens limit changes for conversion ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes it is at the sole discretion of the Times Internet Limited to update the limit as and when required as per business needs.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do i know the value of my tokens?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash equavalent value of tokens can be seen on the Earn tokens screen.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Where do I find the tokens converted status ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">All the transactions done against tokens are stored on transactions screen</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My token balance is deducted but I did't recieve cash in paytm account</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In case if a transaction is marked as 'Failed' & tokens get deducted. Please dont worry about the tokens as the tokens will be credited back within 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How much time does it takes to recieve paytm cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash is credited in maximum of 30 minutes post the conversion is successfully done</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What does different status shown on transaction screen mean?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction done for converting tokens in to paytm cash are:<br/>
                                    1. Success - tokens are converted successfully<br/>
                                    2. Failure - due to some issue tokens conversion has failed<br/>
                                    3. Pending - tokens conversion request has been received for verification <br/>
                                    4. Refund - In case if the tokens conversion fails the tokens deducted gets refunded after some time
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My transaction status is shown as Falure and yet my tokens deducted from tokens balance?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens deducted for unsuccessful conversion are credited back in maximum of 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What all leads to failure of transaction?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction failure can occur due to multiple reasons. Reason for failure is shown with respective transaction.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is needed to get the tokens converted successfully?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">User need to have below while converting tokens<br/>
                                    1. Login to App<br/>
                                    2. Enter an active Paytm number<br/>
                                    3. Tokens balance shall be more than minimum tokens required for conversion.
                                </span>
                            </div>
                        </div></div>}
                    </div>)
                case 'malayalam':
                return(<div key="a1" className="loot-faq">
                        <div className="faq-title">FAQS</div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">എന്താണ് ന്യൂസ്പോയിന്‍റ് നാണയങ്ങള്‍?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ന്യൂസ്പോയിന്‍റ് ആപ്പില്‍ നിന്നും ഓഫറുകളും വൗച്ചറുകളും</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">എന്തൊക്കെയാണ് എന്‍റെ പ്രവര്‍ത്തനങ്ങള്‍?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ന്യൂസ്പോയിന്‍റ് നാണയങ്ങള്‍ നേടാന്‍ സഹായിക്കുന്നവയാണ് ആക്റ്റിവിറ്റികള്‍( പ്രതിദിന ചെക്കിന്‍, ലേഖനം വായിക്കുക, വീഡിയോ കാണുക)</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">പ്രതിദിന ചെക്കിന്‍</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ആപ്പ് ദിനവും തുറക്കൂ, ന്യൂസ്പോയിന്‍റ് നാണയങ്ങള്‍ നേടൂ. തുടര്‍ച്ചയായി കൂടുതല്‍ ദിവസങ്ങള്‍ തുറന്ന് കൂടുതല്‍ സമ്പാദിക്കൂ. ആറു ദിനങ്ങള്‍ തുടര്‍ച്ചയായി ചെക്കിന്‍ ചെയ്ത് 3 നാണയങ്ങള്‍ നേടാം. ഏഴാമത്തെ ദിനം 10 ബോണസ് നാണയങ്ങള്‍ ലഭിക്കും. ഇടയ്ക്ക് ഒരു ദിനം നഷ്ടപ്പെട്ടാലും പേടിക്കേണ്ട. നിങ്ങളുടെ സമ്പാദ്യം അവിടെത്തന്നെ കാണും! ചെക്കിന്‍ സൈക്കിള്‍ വീണ്ടും തുടര്‍ന്ന് കൂടുതല്‍ സമ്പാദ്യം നേടാം</span>
                            </div>
                        </div>
                        {/*<div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ആപ്പ് നിര്‍ദ്ദേശിക്കുക</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ആപ്പ് മറ്റുള്ളവര്‍ക്ക് നിര്‍ദ്ദേശിക്കുന്നതിലൂടെ നേടൂ 10,000 വരെ ന്യൂസ്പോയിന്‍റ് നാണയങ്ങള്‍ </span>
                            </div>
                        </div>*/}
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ലേഖനം വായിക്കുക</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ഓരോ തവണ വീഡിയോ കാണുമ്പോഴും ന്യൂസ്പോയിന്‍റ് നാണയങ്ങള്‍ നേടൂ.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">വീഡിയോ കാണുക</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ഓരോ തവണ വീഡിയോ കാണുമ്പോഴും ന്യൂസ്പോയിന്‍റ് നാണയങ്ങള്‍ നേടൂ.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">എങ്ങനെയാണ് റഡീം ചെയ്യുക?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">റഡീം ചെയ്യാനായി ആദ്യം ലോഗിന്‍ ചെയ്യുക. ഇതിനായി മൈ ആക്റ്റിവിറ്റി പേജിലെ റഡീം ഓപ്ഷന്‍ തെരഞ്ഞെടുക്കുക</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">റഡീം ചെയ്യാന്‍ പറ്റുന്ന നാണയങ്ങള്‍ ഏതൊക്കെയാണ്?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">മികച്ച ഓഫറുകളിന്മേല്‍ റഡീം ചെയ്യാവുന്ന നാണയങ്ങള്‍ ആണ് റഡീമബിള്‍ നാണയങ്ങള്‍</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ഓഫറുകള്‍ എല്ലായ്പ്പോഴും ഒരേപോലെയാണോ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">മികച്ച ഓഫറുകള്‍ നല്‍കുന്നതിനായി ഞങ്ങള്‍ നിരന്തരം പരിശ്രമിക്കും. കൂടുതല്‍ മികച്ച റഡീം ഓപ്ഷനുകള്‍ നല്‍കും  </span>
                            </div>
                        </div>
                        {timerFaq &&
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">എന്താണ് ടൈമർ ആക്റ്റിവിറ്റി?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">ടൈമർ ആക്റ്റിവിറ്റി വഴി നിങ്ങൾക്ക് NewsPoint Token(s) സമ്പാദിക്കാനാകും. വളരെ എളുപ്പമാണിത്! ഒരോ പ്രാവശ്യവും നിങ്ങൾ ആപ്പ് തുറന്ന് ഉപയോഗിക്കുമ്പോൾ ടൈമർ ആരംഭിക്കും. ഇതേ ടൈമർ അതിന്‍റെ കാലയളവ് ഒരോ തവണയും പൂർത്തിയാക്കുമ്പോൾ NewsPoint Token(s) ലഭിക്കും. ശരിക്കും എളുപ്പമല്ലേ?..പറയൂ...മറ്റൊരു കാര്യം കൂടി, ആപ്പ് പശ്ചാത്തലത്തിലേക്ക് മായുമ്പോൾ ടൈമർ താൽക്കാലികമായി പ്രവർത്തന രഹിതമാകും. പേടിക്കണ്ട! 30 മിനിറ്റുകൾക്കുള്ളിലാണ് നിങ്ങൾ ആപ്പിനെ വീണ്ടും പ്രാവർത്തികമാക്കുന്നതെങ്കിൽ ടൈമർ വീണ്ടും പ്രവർത്തിക്കും. 30 മിനിറ്റുകൾക്ക് ശേഷമാണ് നിങ്ങൾ മടങ്ങുന്നതെങ്കിൽ ടൈമർ രണ്ടാമതെ തുടങ്ങും.</span>
                            </div>
                        </div>}
                        {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is Token to Cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens to cash is an offering by the help of which tokens earned can be converted into Paytm cash.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Is there a limit on converting tokens into cash per day</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes there is a daily limit per user for converting tokens into cash. the capping is placed both on higher and lower side.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does daily tokens limit changes for conversion ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes it is at the sole discretion of the Times Internet Limited to update the limit as and when required as per business needs.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do i know the value of my tokens?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash equavalent value of tokens can be seen on the Earn tokens screen.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Where do I find the tokens converted status ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">All the transactions done against tokens are stored on transactions screen</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My token balance is deducted but I did't recieve cash in paytm account</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In case if a transaction is marked as 'Failed' & tokens get deducted. Please dont worry about the tokens as the tokens will be credited back within 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How much time does it takes to recieve paytm cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash is credited in maximum of 30 minutes post the conversion is successfully done</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What does different status shown on transaction screen mean?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction done for converting tokens in to paytm cash are:<br/>
                                    1. Success - tokens are converted successfully<br/>
                                    2. Failure - due to some issue tokens conversion has failed<br/>
                                    3. Pending - tokens conversion request has been received for verification <br/>
                                    4. Refund - In case if the tokens conversion fails the tokens deducted gets refunded after some time
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My transaction status is shown as Falure and yet my tokens deducted from tokens balance?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens deducted for unsuccessful conversion are credited back in maximum of 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What all leads to failure of transaction?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction failure can occur due to multiple reasons. Reason for failure is shown with respective transaction.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is needed to get the tokens converted successfully?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">User need to have below while converting tokens<br/>
                                    1. Login to App<br/>
                                    2. Enter an active Paytm number<br/>
                                    3. Tokens balance shall be more than minimum tokens required for conversion.
                                </span>
                            </div>
                        </div></div>}
                    </div>)
                case 'marathi':
                return(<div key="a1" className="loot-faq">
                        <div className="faq-title">FAQS</div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">काय आहे न्यूजप्वाइंट (NP) Token(s)?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP Token(s) वर्चुअल करेंसी आहे, ज्याचा उपयोग न्यूजप्वाइंट ऍप वर आकर्षित ऑफ़र / वाउचर ला रिडीम करण्यासाठी जाऊ शकते।</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">माझ्या एक्टिविटिज काय आहेत?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">तुमच्या एक्टिविटिजचे विविध प्रकार आहेत (डेली चेक-इन, आर्टिकल वाचणे, वीडियो पाहणे) जे तुम्हाला न्यूजप्वाइंट Token(s) कमवण्यामध्ये मदत करतात.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">डेली चेक-इन</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">दररोज ऍप उघडा आणि कमवा NewsPoint Token(s). तुम्ही जितका जास्त ऍप उघडाल तितके जास्त कमवाल. लागोपाठ 6 दिवस ऍप उघडल्यावर 3 Token(s) आणि 7 व्या दिवशी मिळतील 10 बोनस Token(s). जर तुम्ही एखाद्या दिवशी मिस केले तर, चिंता करू नका, तुम्ही कमावलेले Token(s) तश्याच राहतील, परंतु चेक- इन साइकल पुन्हा सुरु होईल.</span>
                            </div>
                        </div>
                        {/*<div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">ऍप ला रेफर करा अथवा डाऊनलोड करा </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">जलद NP Token(s) कमवण्यासाठी ह्या ऍप ला आपल्या मित्रांबरोबर शेअर करा. मित्रांना आणि परिवाराला ऍप रेफर करून तुम्ही 10,000 NP Token(s) पर्यंत कमवू शकता. </span>
                            </div>
                        </div>*/}
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">आर्टिकल वाचा </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">तुमची हि एक्टिविटी प्रत्येक वेळी नवीन आर्टिकल वाचल्याने NP Token(s) कमवण्यामध्ये मदत करतात. जर तुम्ही फास्ट आर्टिकल स्वाइप करत असाल तर NP Token(s) नाहीत मिळणार.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">पहा व्हिडीओ </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">तुमची हि एक्टिविटी प्रत्येक वेळी नवीन व्हिडीओ पाहिल्याने NP Token(s) कमवण्यामध्ये मदत करतात. जर तुम्ही फास्ट व्हिडीओ स्वाइप करत असाल तर NP Token(s) नाहीत मिळणार.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">प्वाइंट्सला कसे कराल रिडीम?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">NP Token(s) रिडीम करण्यासाठी सर्वात अगोदर तुम्हाला लॉग-इन करून माई एक्टिविटिज पेज जावे लागेल,  रिडीम वर क्लिक करण्या बरोबर खूप ऑफर्स तुम्हाला दिसतील. </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">रिडीम करण्या योग्य Token(s) काय आहे?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">रिडीम करण्या योग्य Token(s) त्या आहेत, ज्याचा उपयोग उत्कृष्ट ऑफर्स साठी करू शकता.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">काय हे ऑफर प्रत्येक वेळी समान राहतात का ? </span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">आम्ही प्रत्येक दिवशी ऑफरला रिव्हाईज करण्यासाठी प्रयत्न करत असतो, रिडिम साठी तुम्हाला अधिक आकर्षक ऑफर देऊ शकू. </span>
                            </div>
                        </div>
                        {timerFaq &&
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">टाइमर एक्टिविटी क्या है?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">टाइमर एक्टिविटी के साथ आप NewsPoint टोकन्स कमा सकते हैं। यह बहुत ही आसान है! आप हर बार, जब आप ऐप खोलते हैं और उसका उपयोग करना शुरू कर देते हैं, तब टाइमर शुरू हो जाएगा। और हर बार ऐप में एक निश्चित समय पूरा करने पर आपको NewsPoint टोकन प्राप्त होते हैं। यह बहुत ही आसान है! है ना? साथ ही, ऐप को बैकग्राउंड में ले जाने पर टाइमर पॉज़ हो जाएगा। लेकिन, चिंता न करें। अगर आप 30 मिनट के अंदर इसे फिर से खोलते हैं तो यह दोबारा पुराने समय से शुरू हो जाएगा। हालांकि, यदि आप 30 मिनट बाद लौटते हैं, तो टाइमर फिर से शुरू होगा।</span>
                            </div>
                        </div>}
                        {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is Token to Cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens to cash is an offering by the help of which tokens earned can be converted into Paytm cash.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Is there a limit on converting tokens into cash per day</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes there is a daily limit per user for converting tokens into cash. the capping is placed both on higher and lower side.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does daily tokens limit changes for conversion ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes it is at the sole discretion of the Times Internet Limited to update the limit as and when required as per business needs.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do i know the value of my tokens?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash equavalent value of tokens can be seen on the Earn tokens screen.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Where do I find the tokens converted status ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">All the transactions done against tokens are stored on transactions screen</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My token balance is deducted but I did't recieve cash in paytm account</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In case if a transaction is marked as 'Failed' & tokens get deducted. Please dont worry about the tokens as the tokens will be credited back within 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How much time does it takes to recieve paytm cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash is credited in maximum of 30 minutes post the conversion is successfully done</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What does different status shown on transaction screen mean?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction done for converting tokens in to paytm cash are:<br/>
                                    1. Success - tokens are converted successfully<br/>
                                    2. Failure - due to some issue tokens conversion has failed<br/>
                                    3. Pending - tokens conversion request has been received for verification <br/>
                                    4. Refund - In case if the tokens conversion fails the tokens deducted gets refunded after some time
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My transaction status is shown as Falure and yet my tokens deducted from tokens balance?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens deducted for unsuccessful conversion are credited back in maximum of 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What all leads to failure of transaction?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction failure can occur due to multiple reasons. Reason for failure is shown with respective transaction.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is needed to get the tokens converted successfully?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">User need to have below while converting tokens<br/>
                                    1. Login to App<br/>
                                    2. Enter an active Paytm number<br/>
                                    3. Tokens balance shall be more than minimum tokens required for conversion.
                                </span>
                            </div>
                        </div></div>}
                    </div>)
                case 'gujarati':
                    return(<div key="a1" className="loot-faq">
                            <div className="faq-title">FAQS</div>
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">શું છે ન્યૂઝપોઈન્ટ (NP) Token(s)?</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">NP Token(s) વર્ચ્યુઅલ કરન્સી છે, જેનો ઉપયોગ ન્યૂઝપોઈન્ટ એપથી રોમાંચક ઓફર/વાઉચરને રિડીમ કરવા માટે કરી શકાય છે.</span>
                                </div>
                            </div>
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">મારી એક્ટિવિટીઝ શું છે?</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">આપની એક્ટિવિટીના અનેક પ્રકાર છે. (ડેલી ચેક-ઈન, આર્ટિકલ વાંચવા, વીડિયો જોવા) જે આપને ન્યૂઝપોઈન્ટ Token(s) કમાવવામાં મદદ કરે છે.</span>
                                </div>
                            </div>
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">ડેલી ચેક-ઈન</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">રોજ એપ ઓપન કરો, અને કમાઓ NewsPoint Token(s). જેટલા વધુ દિવસ આપ સતત ચેક-ઈન કરશો, તેટલા જ વધુ Token(s) કમાશો. સતત છ દિવસ સુધી ચેક-ઈન કરવા પર આપને મળશે રોજના 10 Token(s), અને સાતમા દિવસના ચેક-ઈનમાં આપ મેળવશો 50 બોનસ Token(s). એક દિવસ ચૂકી ગયા? ચિંતા ન કરશો , તમારા અગાઉના Token(s) યથાવત રહેશે, જોકે ચેક-ઈન સાયકલ ફરી સ્ટાર્ટ થશે.</span>
                                </div>
                            </div>
                            {/*<div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">એપને રિફર કરો અથવા ડાઉનલોડ કરાવો</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">ઝડપથી NP Token(s) કમાવવા માટે આપ એપને પોતાના દો્તો સાથે શેર કરો. પરિજનો અને દોસ્તો સાથે એપ શેર કરી આપ 10,000 કોઈન્સ કમાઈ શકો છો.</span>
                                </div>
                            </div>*/}
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">આર્ટિકલ વાંચો</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">આપની આ એક્ટિવિટી દરેક વખતે નવા આર્ટિકલ વાંચવા પર NP Token(s) કમાવવામાં મદદ કરે છે. જો તમે ઝડપથી આર્ટિકલ સ્વાઈપ કરશો તો આપને NP Token(s) નહીં મળે.</span>
                                </div>
                            </div>
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">જુઓ વીડિયો</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">આપની આ એક્ટિવિટી દરેક વખતે નવા વીડિયો વાંચવા પર NP Token(s) કમાવવામાં મદદ કરે છે. આપ જ્યારે વીડિયો જોશો ત્યારે આપને NP Token(s) મળતા રહેશે. જો તમે ઝડપથી વીડિયો સ્વાઈપ કરશો તો આપને NP Token(s) નહીં મળે.</span>
                                </div>
                            </div>
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">પોઈન્ટ્સને કઈ રીતે રિડીમ કરશો?</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">NP Token(s) રિડીમ કરવા માટે સૌ પહેલા આપને લોગ-ઈન કરી માય એક્ટિવિટી પેજ પર જવાનું રહેશે. રિડીમ પર ક્લિક કરતાની સાથે આપ અનેક ઓફર્સ જોઈ શકશો.</span>
                                </div>
                            </div>
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">રિડીમ કરવા યોગ્ય Token(s) શું છે?</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">રિડીમ કરવા યોગ્ય Token(s) એ છે કે જેનો ઉપયોગ આપ બહેતરિન ઓફર્સ માટે કરી શકો છો.</span>
                                </div>
                            </div>
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">શું આ ઓફર્સ દરેક વખતે સરખી જ રહે છે?</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">અમે રોજ ઓફર્સ વધુ સારી બનાવવા ખૂબ મહેનત કરીએ છીએ, જેથી આપને બેસ્ટ ઓપ્શન્સ મળી શકે.</span>
                                </div>
                            </div>
                            {timerFaq &&
                            <div className="qna-wrapper">
                                <div className="ques">
                                    <span className="icon">Q</span>
                                    <span className="text">ટાઈમર એક્ટિવિટી શું છે?</span>
                                </div>
                                <div className="ans">
                                    <span className="icon">A</span>
                                    <span className="text">ટાઈમર એક્ટિવિટીથી આપ કમાઈ શકો છો ન્યૂઝપોઈન્ટ ટોકન્સ. તે ખૂબ જ સરળ છે. તમે જ્યારે પણ એપ ખોલશો તે સાથે જ ટાઈમર સ્ટાર્ટ થઈ જશે, જેનો તમે ઉપયોગ કરી શકશો. જ્યારે પણ ટાઈમર પોતાની ડ્યૂરેશન પૂરી કરશે તે સાથે જ તમને મળશે ન્યૂઝપોઈન્ટ ટોકન્સ. છે ને સાવ સરળ! ખરું કે નહીં? એટલું જ નહીં, એપ બેકગ્રાઉન્ડમાં જશે ત્યારે ટાઈમર અટકી જશે. જોકે, તેની ચિંતા કરવાની જરુર નથી. તમે 30 મિનિટની અંદર જેવી એપ ફરી ઓપન કરશો કે તરત જ તે ફરી શરુ થઈ જશે. જોકે, તમે 30 મિનિટ પછી ફરી એપ ખોલશો તો ટાઈમર નવેસરથી શરુ થશે.</span>
                                </div>
                            </div>}
                            {cashFaq &&
                        <div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is Token to Cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens to cash is an offering by the help of which tokens earned can be converted into Paytm cash.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Is there a limit on converting tokens into cash per day</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes there is a daily limit per user for converting tokens into cash. the capping is placed both on higher and lower side.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Does daily tokens limit changes for conversion ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Yes it is at the sole discretion of the Times Internet Limited to update the limit as and when required as per business needs.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How do i know the value of my tokens?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash equavalent value of tokens can be seen on the Earn tokens screen.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">Where do I find the tokens converted status ?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">All the transactions done against tokens are stored on transactions screen</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My token balance is deducted but I did't recieve cash in paytm account</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">In case if a transaction is marked as 'Failed' & tokens get deducted. Please dont worry about the tokens as the tokens will be credited back within 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">How much time does it takes to recieve paytm cash?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Paytm cash is credited in maximum of 30 minutes post the conversion is successfully done</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What does different status shown on transaction screen mean?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction done for converting tokens in to paytm cash are:<br/>
                                    1. Success - tokens are converted successfully<br/>
                                    2. Failure - due to some issue tokens conversion has failed<br/>
                                    3. Pending - tokens conversion request has been received for verification <br/>
                                    4. Refund - In case if the tokens conversion fails the tokens deducted gets refunded after some time
                                </span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">My transaction status is shown as Falure and yet my tokens deducted from tokens balance?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Tokens deducted for unsuccessful conversion are credited back in maximum of 7 days</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What all leads to failure of transaction?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">Transaction failure can occur due to multiple reasons. Reason for failure is shown with respective transaction.</span>
                            </div>
                        </div>
                        <div className="qna-wrapper">
                            <div className="ques">
                                <span className="icon">Q</span>
                                <span className="text">What is needed to get the tokens converted successfully?</span>
                            </div>
                            <div className="ans">
                                <span className="icon">A</span>
                                <span className="text">User need to have below while converting tokens<br/>
                                    1. Login to App<br/>
                                    2. Enter an active Paytm number<br/>
                                    3. Tokens balance shall be more than minimum tokens required for conversion.
                                </span>
                            </div>
                        </div></div>}
                        </div>)
                default:
                    return null;
            }
        })()
    ]) 
  }
}

export default FAQ;
