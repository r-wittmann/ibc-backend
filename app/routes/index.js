module.exports = function(app) {
    const basePath = 'app/routes/';

    // ==============================
    // public routes, no token needed
    // ==============================

    include(basePath + 'admin/setup')(app, '/admin/setup');
    include(basePath + 'admin/authenticate')(app, '/admin/authenticate');

    include(basePath + 'api/register')(app, '/api/register');
    include(basePath + 'api/authenticate')(app, '/api/authenticate');

    include(basePath + 'public/companies')(app, '/public/companies');
    include(basePath + 'public/postings')(app, '/public/postings');

    // ============================
    // private routes, token needed
    // ============================

    include(basePath + 'api/companies')(app, '/api/companies');
    include(basePath + 'api/postings')(app, '/api/postings');
    include(basePath + 'api/recruiters')(app, '/api/recruiters');
    include(basePath + 'api/profile')(app, '/api/profile');

    // ===============================================
    // admin routes, token and admin privileges needed
    // ===============================================

    include(basePath + 'admin/accounts')(app, '/admin/accounts');
};
