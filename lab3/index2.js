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
  set_password('security_systems_2024_new', token);
});

function set_password(password, token) {
    const password_options = {
      method: 'PATCH',
      url: 'https://dev-xwjltbj2c83occox.us.auth0.com/api/v2/users/auth0|664294a93706ebda7d81a337',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: {
        password: password,
        connection: 'Username-Password-Authentication'
      },
      json: true
    };
  
    request(password_options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
  }