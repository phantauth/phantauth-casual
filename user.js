var casual = require('casual')
var crypto = require("crypto-js");

module.exports = function (context, cb) {
  var sub = context.query.name || casual.first_name.toLowerCase() + casual.integer(2,99);
  var md5 = crypto.MD5(sub); 
  casual.seed(md5.words[0]);
  var user = {
    sub: sub,
    nickname: casual.first_name,
    given_name: casual.first_name,
    family_name: casual.last_name,
    password: casual.password,
    phone_number: casual.phone,
    phone_number_verified: casual.coin_flip,
    email: casual.email,
    email_verified: casual.coin_flip,
    birthdate: casual.date('YYYY-MM-DD'),
    zoneinfo: casual.timezone,
    locale: casual.locale,
    address: {
        country: casual.country,
        locality: casual.city,
        postal_code: casual.zip([5, 9]),
        formatted: casual.address,
        region: casual.state
    },
    gender: casual.random_element(['male', 'female', 'unknown']),
    picture: 'https://www.gravatar.com/avatar/' + md5 + '?s=256&d=identicon&f=y'
  };

  user.name = user.given_name + ' ' + user.family_name;
  user.preferred_username = (user.family_name.charAt(0) + user.given_name).toLowerCase();

  cb(null, user);
};

