const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');

const route = require('./routers/route');
const middlewares = require('./middlewares/middlewares');

const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        eq(a, b, options) {
            const result = String(a) === String(b);
            if (options && typeof options.fn === 'function') {
                return result ? options.fn(this) : options.inverse(this);
            }
            return result;
        },
        contains(lista, id) {
            if (!Array.isArray(lista)) return false;
            return lista.map(String).includes(String(id));
        }
    }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'portfolio-receitas-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(middlewares.logRegister);
app.use(middlewares.sessionControl);

app.use('/', route);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
