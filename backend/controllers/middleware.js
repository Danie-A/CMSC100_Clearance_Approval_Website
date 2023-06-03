import jwt from "jsonwebtoken";
import { Student } from "../models/user.js";
import { Approver } from "../models/approver.js";

const getLoggedIn = (req, res) => {
  try {
    if (!req.cookies || !req.cookies.authToken) res.status(403).json({ loggedIn: false });
    else {
      const tokenPayload = jwt.verify(req.cookies.authToken, "THIS_IS_A_SECRET_STRING");
      res.status(200).json({ loggedIn: tokenPayload._id });
    }
  } catch (error) {
    console.log(`Error in middleware - getLoggedIn(): ${error}`);
    res.status(500).json({ loggedIn: false });
  }
};

const isUserAn = async (user, cookies) => {
  try {
    if (!cookies || !cookies.authToken) return { code: 403 };
    else {
      const tokenPayload = jwt.verify(cookies.authToken, "THIS_IS_A_SECRET_STRING");
      if (user === "student" && (await Student.findById(tokenPayload._id))) {
        return { code: 200, userId: tokenPayload._id };
      } else if (user === "adviser" && (await Approver.findById(tokenPayload._id))) {
        return { code: 200, userId: tokenPayload._id };
      } else if (user === "admin" && tokenPayload._id === "admin") {
        return { code: 200, userId: tokenPayload._id };
      } else {
        return { code: 403 };
      }
    }
  } catch (error) {
    return 500;
  }
};

const isStudent = async (req, res, next) => {
  try {
    const result = await isUserAn("student", req.cookies);
    if (result.code === 200) {
      req.userId = result.userId;
      next();
    } else if (result.code === 403) res.status(403).json({ success: false });
    else if (result.code === 500) res.status(500).json({ success: false });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

const isAdviser = async (req, res, next) => {
  try {
    const result = await isUserAn("adviser", req.cookies);
    if (result.code === 200) {
      req.userId = result.userId;
      next();
    } else if (result.code === 403) res.status(403).json({ success: false });
    else if (result.code === 500) res.status(500).json({ success: false });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const result = await isUserAn("admin", req.cookies);
    if (result.code === 200) {
      req.userId = result.userId;
      next();
    } else if (result.code === 403) res.status(403).json({ success: false });
    else if (result.code === 500) res.status(500).json({ success: false });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export { getLoggedIn, isStudent, isAdviser, isAdmin };
