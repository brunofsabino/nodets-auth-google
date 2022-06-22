import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport'

import * as ApiController from '../controllers/apiController';

const router = Router();

// router.post('/register', ApiController.register);
// router.post('/login', ApiController.login);

// router.get('/list', ApiController.list);
const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    (req.user) ? next() : res.send('vc nao ta logado').status(401)
}
router.get('/', (req, res) => res.send("Voce nao esta logado"));
router.get('/failed', (req, res) => res.send("Falhou o login"));
router.get('/good', isLoggedIn, (req: any, res) => res.send(`Seja bem vindo(a) ${req.user.displayName}! --- email: ${req.user.emails[0].value} -- Photo: <img src=${req.user.photos[0].value}>`));
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),

function(req, res) {
// Successful authentication, redirect home.
res.redirect('/good');
});


router.get('/logout', (req, res) => {
    req.logout(err => {
        if(err) throw err
        else { 
            req.session!.destroy(err);
            res.redirect('/');
        }
    })
});

export default router;