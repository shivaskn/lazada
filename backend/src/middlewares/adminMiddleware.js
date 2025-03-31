import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next)=> {
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.json({
                success:false,
                message:"Not Authorized Login Again"
            })
        }

        const removeBearer = token.split(" ")[1];
        const tokenDecode = jwt.verify(removeBearer,process.env.JWT_KEY);

        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
              success: false,
              message: "Not Authorized login Again",
            });
          }
      
          next();
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
          });
    }
}

export default adminAuth