const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        //la methode verify permet de verifier la validite d'un tok
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId : userId
        };
    next();
    } catch (error) {
        res.status(401).json({error});
    }
}