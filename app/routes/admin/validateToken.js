module.exports = function(req, res, next) {

    if (req.decodedToken.admin) {
        next();
    } else {
        res.status(403).json({ error: 'User is not an admin' });
    }
};
