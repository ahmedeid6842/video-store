const jwt = require("jsonwebtoken");
const config = require("config");

const jwtSECRET = config.get("JWT_SECRET");

module.exports.createToken = (payload) => {
    return jwt.sign(payload, jwtSECRET, { expiresIn: "15m" });
}

module.exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSECRET)
    } catch (error) {
        throw new Error("invalid Token Provided");
    }
}