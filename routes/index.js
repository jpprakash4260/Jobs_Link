const initializeRoutes = (app) => {
    app.use('/api/v1/access', require('./v1/access.routes'));
    app.use('/api/v1/admin', require('./v1/admin.routes'));
    app.use('/api/v1/adminMenu', require('./v1/adminMenu.routes'));
    app.use('/api/v1/campus', require('./v1/campus.routes'));
    app.use('/api/v2/', require('./v2/loginRegister.routes'));
    app.use('/api/v2/crud', require('./v2/crud.routes'));
    app.use('/api/v2/seeker', require('./v2/seeker.routes'));
    app.use('/api/v2/employer', require('./v2/employer.routes'));


};

module.exports = initializeRoutes;