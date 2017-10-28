module.exports = function(app) {
    const basePath = 'app/routes/';

    // ==============================
    // public routes, no token needed
    // ==============================

    include(basePath + 'admin/setup')(app, '/admin/setup');
    include(basePath + 'admin/authenticate')(app, '/admin/authenticate');

    include(basePath + 'api/authenticate')(app, '/api/authenticate');

    include(basePath + 'public/companies')(app, '/public/companies');
    include(basePath + 'public/postings')(app, '/public/postings');
    include(basePath + 'public/recruiters')(app, '/public/recruiters');



    // ============================
    // private routes, token needed
    // ============================

    include(basePath + 'api/companies')(app, '/api/companies');
    include(basePath + 'api/postings')(app, '/api/postings');
    include(basePath + 'api/recruiters')(app, '/api/recruiters');


    // ===============================================
    // admin routes, token and admin privileges needed
    // ===============================================

    include(basePath + 'admin/users')(app, '/admin/users');

};
