var REMOTE_CLOUD_HOSTNAME = "open.hknetworks.kr";
var basePath = '/smarthome/queryDeviceStatusAll';
const https = require('https');


function log(title, msg) {
    console.log(`[${title}] ${msg}`);
}

var post_data = '{"userid":"seunghee@hknetworks.kr","password":"test12345"}';

log('DEBUG', `post data : ${post_data}  basePath : ${basePath}`);
var options = {
    hostname: REMOTE_CLOUD_HOSTNAME,
    port: 443,
    path: basePath,
    method: 'POST',
    headers: {
        "Content-Type": 'application/json',
        "Content-Length": Buffer.byteLength(post_data),
        //"AccessToken": userAccessToken
    }
};

var callback = function(response) {
    var str = '';
    response.on('data', function(chunk) {
        str += chunk.toString('utf-8');
        
    });
    response.on('end', function() {
        var appliances = [];
        log('DEBUG', `Resturn value : ${str}`);
        var jsonObj = JSON.parse(str);
        
        if(jsonObj.status === 0)
        {
            for(var i in jsonObj.statusList)
            {
                
                log('DEBUG', 'deviceid:'+jsonObj.statusList[i].deviceId +', online: '+ jsonObj.statusList[i].online+ ', deviceStatus : ' + jsonObj.statusList[i].deviceStatus )  ;
            }
        }
             
        
    });

    response.on('error', function(e) {
        log('Error', e.message);
    });
    
};

log('Debug', 'Request options : ${options}');
var post_request = https.request(options, callback)
    .on('error', function(e) {
        log('Error', e.message);
      
        //context.fail(generateControlError('Discovery Error', 'DEPENDENT_SERVICE_UNAVAILABLE', 'Unable to connect to server'));
    });
    
post_request.write(post_data);
post_request.end();