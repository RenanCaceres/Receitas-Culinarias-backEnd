module.exports = {
    logRegister(req, res, next) {
        console.log(req.url + ' ' + req.method + ' ' + new Date());
        next();
    },

    sessionControl(req, res, next) {
        if (req.session.login != undefined) {
            res.locals.login = req.session.login;

            if (req.session.tipo == 2) {
                res.locals.admin = true;
            }

            next();
        }
        else if ((req.url == '/') && (req.method == 'GET')) {
            next();
        }
        else if ((req.url == '/login') && (req.method == 'POST')) {
            next();
        }
        else if ((req.url == '/receitas') && (req.method == 'GET')) {
            next();
        }
        else if ((req.url.includes('/receitasCategoria')) && (req.method == 'GET')) {
            next();
        }
        else if ((req.url == '/relatorioHabilidades') && (req.method == 'GET')) {
            next();
        }
        else {
            res.redirect('/');
        }
    },

    adminControl(req, res, next) {
        if (req.session.tipo == 2) {
            next();
        } else {
            res.redirect('/home');
        }
    }
};
