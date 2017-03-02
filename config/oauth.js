var ids = {
    facebook: {
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK
    },
    twitter: {
        consumerKey: process.env.TWITTER_CONSUMERKEY,
        consumerSecret: process.env.TWITTER_CONSUMERSECRET,
        callbackURL: process.env.TWITTER_CALLBACKURL
    },
    google: {
        clientID:  process.env.GOOGLE_CLIENTID,
        clientSecret:  process.env.GOOGLE_CLIENTSECRET,
        callbackURL: process.env.GOOGLE_CALLBACKURL
    }


};

module.exports = ids;
