const request = require("request");

const token_options = {
  method: 'POST',
  url: 'https://dev-xwjltbj2c83occox.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: {
    client_id: 'GTcfHjxezpx2zPNxfJv5TRrFeEWC5Jrh',
    client_secret: 'CSjT-dLO0BU5aucihsst6a8odPhG8p2Gj-vBlfEQ4wmBrLl2EZgNVscdPNuJWQtx',
    audience: 'https://dev-xwjltbj2c83occox.us.auth0.com/api/v2/',
    grant_type: 'client_credentials'
  },
  json: true
};

request(token_options, function (error, response, body) {
  if (error) throw new Error(error);
  
  const token = body['access_token'];
  create_user(token);
});

function create_user(token) {
  console.log(token);
  const user_options = {
    method: 'POST',
    url: 'https://dev-xwjltbj2c83occox.us.auth0.com/api/v2/users',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: {
      email: 'vasa16671@gmail.com',
      password: 'security_systems_2024',
      connection: 'Username-Password-Authentication'
    },
    json: true
  };

  request(user_options, function (error, response, body) {
    if (error) throw new Error(error);
    
    console.log(body);
  });
}
