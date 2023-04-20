module.exports = async (app) => {
    app.use('/', require('./backend/routes/home'));
    app.use('/auth', require('./backend/routes/auth'));
}