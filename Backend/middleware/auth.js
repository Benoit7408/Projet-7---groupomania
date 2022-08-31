const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        
        const decodedToken = jwt.verify(token,process.env.secretkey);
        const quadri = decodedToken.userId;
        req.auth = {userId: quadri};
        console.log(req.body);
        console.log(req.auth)
        if(req.body.quadri && req.body.quadri !== quadri){
            console.log(req.body.userId)
            console.log("utilisateur non valable")
            throw "User Id non valable" ;
        }else {
            console.log("utilisateur valable")
            next()
        }
    } catch (error){
        
        res.status(401).json({message: error | "requete non identifié"})
    }
}