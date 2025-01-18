const jwt = require("jsonwebtoken");

const generateToken = (res , user , msg)=> {
    const token = jwt.sign({userId:user_id} , process.env.SECRET_KEY , {expiresIn:"1d"});

    return res.status(200).cookie("token" , token , {httpOnly:true , sameSite:"strict", maxAge: 24*60*60*1000}).json({
        success:true,
        message,
        user
    });
}

module.exports = generateToken;