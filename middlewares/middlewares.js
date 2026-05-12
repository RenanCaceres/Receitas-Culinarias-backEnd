module.exports = {
    logRegister(req, res, next) {
        console.log(`${req.method} ${req.url} ${new Date().toLocaleString('pt-BR')}`);
        next();
    },

    sessionControl(req, res, next) {
        if (req.session && req.session.login !== undefined) {
            res.locals.usuarioLogin = req.session.login;
            res.locals.login = req.session.login;
            res.locals.usuarioId = req.session.alunoId;
            res.locals.isAdmin = Number(req.session.tipo) === 1;
            return next();
        }

        const rotasPublicas = [
            '/',
            '/login',
            '/receitasPublicas',
            '/receitasPorCategoria',
            '/relatorioHabilidades'
        ];

        if (rotasPublicas.includes(req.path)) {
            return next();
        }

        if (req.path.startsWith('/receitasPorCategoria/')) {
            return next();
        }

        return res.redirect('/');
    },

    adminControl(req, res, next) {
        if (req.session && Number(req.session.tipo) === 1) {
            return next();
        }
        return res.redirect('/home');
    }
};
