const initializeRoutes = (app) => {
    app.use('/api/v1/access', require('./v1/access.routes'));
    app.use('/api/v1/admin', require('./v1/admin.routes'));
    app.use('/api/v1/adminMenu', require('./v1/adminMenu.routes'));
    app.use('/api/v1/campus', require('./v1/campus.routes'));
    app.use('/api/v1/chat', require('./v1/chat.routes'));
    app.use('/api/v1/city', require('./v1/city.routes'));
    app.use('/api/v1/college', require('./v1/college.routes'));
    app.use('/api/v1/conference', require('./v1/conference.routes'));
    app.use('/api/v1/contactresume', require('./v1/contactresume.routes'));
    app.use('/api/v1/country', require('./v1/country.routes'));
    app.use('/api/v1/course', require('./v1/course.routes'));
    app.use('/api/v1/edu_course', require('./v1/edu_course.routes'));
    app.use('/api/v1/empedudetail', require('./v1/empedudetail.routes'));
    app.use('/api/v1/empjobcat', require('./v1/empjobcat.routes'));
    app.use('/api/v1/empkskills', require('./v1/empkskills.routes'));
    app.use('/api/v1/emploct', require('./v1/emploct.routes'));
    app.use('/api/v1/employer', require('./v1/employer.routes'));
    app.use('/api/v1/empoffdetails', require('./v1/empoffdetails.routes'));
    app.use('/api/v1/enquiry', require('./v1/enquiry.routes'));
    app.use('/api/v1/entrepreneurship', require('./v1/entrepreneurship.routes'));
    app.use('/api/v1/experince', require('./v1/experince.routes'));
    app.use('/api/v1/gallery', require('./v1/gallery.routes'));
    app.use('/api/v1/gcmregister', require('./v1/gcmregister.routes'));
    app.use('/api/v1/govcategory', require('./v1/govcategory.routes'));
    app.use('/api/v1/govjobnews', require('./v1/govjobnews.routes'));
    app.use('/api/v1/govtjobpost_exp', require('./v1/govtjobpost_exp.routes'));
    app.use('/api/v1/govtjobpost', require('./v1/govtjobpost.routes'));
    app.use('/api/v1/govtlevel', require('./v1/govtlevel.routes'));
    app.use('/api/v1/industrytype', require('./v1/industrytype.routes'));
    app.use('/api/v1/intschedule', require('./v1/intschedule.routes'));
    app.use('/api/v1/jobapplied', require('./v1/jobapplied.routes'));
    app.use('/api/v1/jobhistory', require('./v1/jobhistory.routes'));
    app.use('/api/v1/jobposting', require('./v1/jobposting.routes'));
    app.use('/api/v1/jobscategory', require('./v1/jobscategory.routes'));
    app.use('/api/v1/jobtype', require('./v1/jobtype.routes'));
    app.use('/api/v1/keyskills', require('./v1/keyskills.routes'));
    app.use('/api/v1/notification', require('./v1/notification.routes'));
    app.use('/api/v1/operator', require('./v1/operator.routes'));
    app.use('/api/v1/qualification', require('./v1/qualification.routes'));
    app.use('/api/v1/resumescore', require('./v1/resumescore.routes'));
    app.use('/api/v1/salary', require('./v1/salary.routes'));
    app.use('/api/v1/seeker', require('./v1/seeker.routes'));
    app.use('/api/v1/seminars', require('./v1/seminars.routes'));
    app.use('/api/v1/specialization', require('./v1/specialization.routes'));
    app.use('/api/v1/state', require('./v1/state.routes'));
    app.use('/api/v1/symposium', require('./v1/symposium.routes'));
    app.use('/api/v1/unrestjobpost_exp', require('./v1/unrestjobpost_exp.routes'));
    app.use('/api/v1/unrestjobpost', require('./v1/unrestjobpost.routes'))
    app.use('/api/v1/workshops', require('./v1/workshops.routes'))
    app.use('/api/v1/seeker', require('./v1/seeker.routes'))
    app.use('/api/v1/employer', require('./v1/employer.routes'))
    app.use('/api/v1/seeker', require('./v1/loginregister.routes'))
    app.use('/api/v1/employer', require('./v1/employerLogin.routes'))
    app.use('/api/v1/joinquery', require('./v1/joinquery.routes'))
    app.use('/api/v1/helper', require('./v1/helper.routes'))
    

}

module.exports = initializeRoutes