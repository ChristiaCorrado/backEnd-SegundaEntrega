const helpers = {}


helpers.isAuthenticated = (req, res, next) =>{
    console.log(`is autenticated middleware`);
    console.log(req.session);
    if (req.session?.admin ) {
        console.log('entp en true');
        return next()
    }else{
        console.log('entro en false');
        res.redirect('/api/productos')
    }

}

module.exports = helpers 