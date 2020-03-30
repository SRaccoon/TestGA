var express = require('express');
var router = express.Router();
var request = require("request");
var access_token = "EAAIaSUccYigBAJ59mLek9F8829FzcnD23ygcI3pEDtKYg9ZA1nQhFIeyFnbvc3x0faE3gqowPvFFY97NXfckxdVVAa1E3FUgy0tSEUssxt4xIds9ut9n8GrlT8IeFIcqq7ypWyRPjdDs5JuohIEYWTS1nRgWTvFFEAyNGgJCE2BIUdX69ff9YUZB0G6CcZD";
var appId = "591851981398568";
var appSecret = "a0a7969e765fb652c54f936a380dd20e";
var longToken = "EAAIaSUccYigBAFTXSGb82SdrRUge19JZCC0VH0zw4SJ8ZCZCRZAQZCUKQFtoJHZClmqv395ZAgjQZBuUfgj5pXVAaXX5lZAsXiqrbAhAmwrHuxloCR7mUJIHKfCgipOYFtd0h0jIlPV9WU9ZBUkEwKWu5yAYX8xcGF7T8vunLGKuCOiAZDZD";
var pageAccessToken = "EAAIaSUccYigBAF6jNsedLPwvrKQe5H0ZCRTMRA0DHYw3vS9nEAdGtZCp0zk9VP5btOncWqwHZBC7glaV4KyXwQxOH0Q8TdE51rZCpqrZBOlq51eZCLf659ecyGh6uZAsPdHVy3e6orkdczt2EoTzZBUYIQ3rSEOPCnHlfGYOgQBcKwZDZD"
var admin = require('firebase-admin');
var app = admin.initializeApp();
var pageId = "459640830808796";


function getToken() {
  var json = request('https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=' + appId + '&client_secret=' + appSecret + '&fb_exchange_token=' + access_token, function (error, response, body) {
    return JSON.parse(body);
  })
  return json.access_token;
}

function getPageToken(){
  var json =  request("https://graph.facebook.com/"+pageId+"?access_token="+longToken+"&fields=access_token",function(err,res,body){
    console.log(body);
  })
  // return json;
}

function publish(message){
  request({uri:'https://graph.facebook.com/'+pageId+'/feed?message=Hello Fans!&access_token='+pageAccessToken,method:"POST"},function(err,req,body){
    console.log(err);
    console.log(body);
  })
}

// getPageToken();
let client_key = '166816571571-u4l5icj5tt6jmdqfqu9i4qii91dgkcub.apps.googleusercontent.com';

// request({ uri: 'https://dragon-ace-blackjack.firebaseio.com/.json?print=pretty',method:"GET"}, function (err, req, body) {
//   console.log(err);
//   console.log(JSON.parse(body));
// })

var config = {
  apiKey:"AIzaSyBB0Oq5Ux01_OaXCjtbOJkdn_6xcW3_QEQ",
  authDomain:"dragon-ace-blackjack.firebase.com"
}

function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
}
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

/* GET home page. */
router.get('/test', async function (req, res, next) {
  res.render('test', { title: 'Express' }); 
});

router.get('/', async function (req, res, next) {
  res.render('HelloAnalytics', { title: 'Express' }); 
});
 
// request('https://graph.facebook.com/v2.12/459640830808796_1418383801601156/comments?fields=from&access_token='+access_token, function (error, response, body) {
//   console.log('error:', error);
//   console.log('statusCode:', response && response.statusCode);
//   let datas = JSON.parse(body);
//   console.log(datas);
// });

module.exports = router;
