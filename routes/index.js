const initializeRoutes = (app) => {
    app.use('/api/v1/', require('./v1/loginRegister.routes'));
    app.use('/api/v1/crud', require('./v1/crud.routes'));
    app.use('/api/v1/seeker', require('./v1/seeker.routes'));
    app.use('/api/v1/employer', require('./v1/employer.routes'));

};

module.exports = initializeRoutes;