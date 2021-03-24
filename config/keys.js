//add this file to .gitignore
require('dotenv').config()
module.exports = {
    google: {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET
    },

    mongodb: {
        dbURI: process.env.DBURI
    },
    session: {
        cookieKey: process.env.COOKIEKEY
    }
};