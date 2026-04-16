const jwt = require('jsonwebtoken');

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = decoded; // attach user
    console.log("Connected user:", decoded.email);

    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
});