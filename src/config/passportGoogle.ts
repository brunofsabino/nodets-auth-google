import passport from 'passport'
import { User } from '../models/User';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done){
    done(null, user)
})
passport.deserializeUser(function(user:any, done){
    done(null, user) 
})


passport.use(new GoogleStrategy({
    clientID: '484987551826-997ev1u6ret35pv2p090gi1io3ludah0.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:4000/google/callback"
  },
  function(accessToken: any, refreshToken: any, profile:any, done: any) {
    console.log(profile);
    return done(null, profile);
  }
));