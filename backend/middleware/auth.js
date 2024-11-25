import jwt from 'jsonwebtoken';
import userModel from "../models/useModel.js";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.json({ success: false, message: "Not Authorized, Login Again" });
    }

    try {
        // Verify access token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        console.log("This is user id:", req.body.userId);
        next();
    } catch (error) {
        // Access token expired or invalid
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            const { refresh_token } = req.headers;

            if (!refresh_token) {
                return res.json({ success: false, message: "Refresh token missing, Login Again" });
            }

            try {
                // Verify refresh token
                const decoded_refresh_token = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
                console.log("decodec refresh token",decoded_refresh_token)
                // Check if refresh token is stored in DB
                const user = await User.findOne({ _id: decoded_refresh_token.id, refreshToken: refresh_token });
                console.log("This is user for refresh token",user);
                
                if (!user) {
                    return res.json({ success: false, message: "Invalid refresh token, Login Again" });
                }

                // Generate a new access token
                const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

                // Send new access token to the client
                return res.json({ 
                    success: true, 
                    message: "New access token issued", 
                    accessToken: newAccessToken 
                });
                
            } catch (refreshError) {
                console.log(refreshError);
                return res.json({ success: false, message: "Invalid refresh token, Login Again" });
            }
        } else {
            console.log(error);
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }
    }
}

export default authMiddleware;
