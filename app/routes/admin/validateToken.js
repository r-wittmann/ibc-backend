module.exports = function(req, res, next) {
    // check, if the sent token belongs to an admin
    if (req.decodedToken.admin) {
        next();
    } else {
        res.status(403).json({ error: 'User is not an admin' });
    }
};
