module.exports = function(req, res, next) {

    if (req.decodedToken.admin) {
        next();
    } else {
        res.status(403).send({ success: false, message: 'User is not an admin' });
    }
};
