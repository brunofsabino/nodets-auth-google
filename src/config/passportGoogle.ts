import passport from 'passport'
import dotenv from 'dotenv'

dotenv.config()

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done){
    done(null, user)
})
passport.deserializeUser(function(user:any, done){
    done(null, user) 
})


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRETY_GOOGLE as string,
    callbackURL: "http://localhost:4000/google/callback"
  },
  function(accessToken: any, refreshToken: any, profile:any, done: any) {
    console.log(profile);
    return done(null, profile);
  }
));