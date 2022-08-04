const initializeRoutes = (app) => {
    app.use('/api/v1/', require('./v1/loginRegister.routes'));
    app.use('/api/v1/crud', require('./v1/crud.routes'));
    app.use('/api/v1/seeker', require('./v1/seeker.routes'));
    app.use('/api/v1/employer', require('./v1/employer.routes'));
    app.use('/api/v1/admin', require('./v1/admin.routes'));
    app.use('/api/v1/adminMenu', require('./v1/adminMenu.routes'));


};

module.exports = initializeRoutes;