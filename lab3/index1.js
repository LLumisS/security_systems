const request = require("request");

var user_options = {
  method: 'POST',
  url: 'https://dev-xwjltbj2c83occox.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: {
    grant_type: 'password',
    username: 'vasa16671@gmail.com',
    password: 'security_systems_2024',
    audience: 'https://dev-xwjltbj2c83occox.us.auth0.com/api/v2/',
    scope: 'offline_access',
    client_id: 'GTcfHjxezpx2zPNxfJv5TRrFeEWC5Jrh',
    client_secret: 'CSjT-dLO0BU5aucihsst6a8odPhG8p2Gj-vBlfEQ4wmBrLl2EZgNVscdPNuJWQtx'
  },
  json: true
};

request(user_options, function (error, response, body) {
  if (error) throw new Error(error);

  const token = body['refresh_token'];
  console.log("\nAccess token: " + body['access_token'])
  console.log("\nRefresh token: " + token);
  refresh_token(token);
});

function refresh_token(token) {
  const refresh_options = {
    method: 'POST',
    url: 'https://dev-xwjltbj2c83occox.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      grant_type: 'refresh_token',
      client_id: 'GTcfHjxezpx2zPNxfJv5TRrFeEWC5Jrh',
      client_secret: 'CSjT-dLO0BU5aucihsst6a8odPhG8p2Gj-vBlfEQ4wmBrLl2EZgNVscdPNuJWQtx',
      refresh_token: token
    },
    json: true
  };
  
  request(refresh_options, function (error, response, body) {
    if (error) throw new Error(error);
    
    const token = body['access_token'];
    console.log("\nNew access token: " + token);
  });
}
