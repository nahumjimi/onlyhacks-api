const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
    const authorization = req.header('Authorization');

    if(authorization) {
        const [type, token] = authorization.split(' ');

        if (type === 'Bearer'){
            if (token){
                // el token es valido???  es tipo BEARER ?
                jwt.verify(token, 'Super Secrettt', (err, decodedToken) => {
                    if (err) {
                        next(err);
                    } else {
                        req.currentUser = decodedToken.id;
                        next(); // aqui todo ha ido bien
                    }   
                })
            } else {
                next (createError(401, 'Token Error'));
            }
        } else {
            next(createError, (401, 'Bearer error'));
        }
    } else {
        next(createError, (401, 'No auth'));
    }
}