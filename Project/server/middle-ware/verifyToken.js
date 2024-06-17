
const check =["/restaurants","/prefernces"];

function auth(req, res, next) {
    if(!check.includes(req.originalUrl)){
        console.log(req.session);
        // if()
        
            // return res.status(401).send('Access Denied');
}
    next();
}

module.exports = auth;