const initializeRoutes = (app) => {
    app.use('/api/v1/access', require('./v1/access.routes'));
    app.use('/api/v1/admin', require('./v1/admin.routes'));
    app.use('/api/v1/adminMenu', require('./v1/adminMenu.routes'));
    app.use('/api/v1/campus', require('./v1/campus.routes'));
    app.use('/api/v1/chat', require('./v1/chat.routes'));
    app.use('/api/v1/city', require('./v1/city.routes'));
    app.use('/api/v1/college', require('./v1/college.routes'));
    app.use('/api/v1/seeker', require('./v1/seeker.routes'));
    app.use('/api/v1/employer', require('./v1/employer.routes'));


    app.use('/api/v1/', require('./v1/loginRegister.routes'));
    app.use('/api/v1/crud', require('./v1/crud.routes'));



};

module.exports = initializeRoutes;