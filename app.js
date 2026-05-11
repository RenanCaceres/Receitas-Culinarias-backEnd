// parte do middlewares
const middlewares = require('./middlewares/middlewares');

app.use(middlewares.logRegister);
app.use(middlewares.sessionControl);
