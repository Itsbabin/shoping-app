const jwt = require('jsonwebtoken');

   const fetchuser = async (req,res,next)=> {
            const token = req.header('token');
            if(!token){
                res.status(401).json({ error: "use valid token" });
            }
            else{

                try {
                    const data = await jwt.verify(token,'babin')
                    req.user = data;
                    // console.log(data);
                    next();
                } catch (error) {
                    res.status(401).json( error );
                }
            }
        }

module.exports = fetchuser