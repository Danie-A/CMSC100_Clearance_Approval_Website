const getLoggedIn = (req, res) => {
  try {
    if (!req.cookies || !req.cookies.authToken) {
      res.status(200).json({ loggedIn: "admin" });
    //   res.status(403).json({ loggedIn: false });
    } else {
      const tokenPayload = jwt.verify(req.cookies.authToken, "THIS_IS_A_SECRET_STRING");
      res.status(200).json({ loggedIn: tokenPayload._id });
    }
  } catch (error) {
    res.status(500).json({ loggedIn: false });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.authToken) {
        next();
    //   res.status(403).json({ success: false });
    } else {
      const tokenPayload = jwt.verify(req.cookies.authToken, "THIS_IS_A_SECRET_STRING");
      if (tokenPayload._id == "admin") {
        next();
      } else {
        res.status(403).json({ success: false });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export { getLoggedIn, isAdmin };
