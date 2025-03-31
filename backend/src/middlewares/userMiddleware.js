import jwt from 'jsonwebtoken'

const createToken = (id) => {
   const token = jwt.sign({id},process.env.JWT_KEY)
   return token
}

const authUser = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).json({
                success: false,
                message: "Not Authorized Login Again",
              });
        }

        const removeBearer = token.split(' ')[1];
        const tokenDecode = jwt.verify(removeBearer,process.env.JWT_KEY)
        req.body.userId = tokenDecode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}



export {
    createToken,
    authUser
}