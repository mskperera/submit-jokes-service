

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });
  
    const base64Credentials = authHeader.split(' ')[1];
   
    //const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    console.log('credentials',base64Credentials)
    const [email, password] = base64Credentials.split(':');
  

    if (email === 'admin@admin.com' && password === 'admin123') {
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  

  module.exports={authMiddleware};