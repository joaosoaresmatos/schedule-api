const jwt = require("jsonwebtoken");
const config = require('../../config/auth');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if(!auth){
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token de autenticação não existe!"
    })
  }

  const [, token] = auth.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, config.secret);

    if(!decoded){
      return res.status(401).json({
        error: true,
        code: 130,
        message: "O token está expirado!"
      })
    } else {
      req.user_id = decoded.id;
      next();
    }
    
  } catch {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token está inválido!"
    })
  }

}