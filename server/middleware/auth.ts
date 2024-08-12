import { Request, Response, NextFunction } from "express";
import catchAsyncError from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();
import { redis } from "../utils/redis";

//authenticated user
export const isAuthenticated = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
    // const refresh_token = req.cookies.refreshoken;

    if (!access_token) {
      return next(new ErrorHandler("Login first to access this resource", 401));
    }

    try {
      const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;

      const user = await redis.get(decoded.id);

      if (!user) {
        return next(
          new ErrorHandler("Please login to access this resource", 404)
        );
      }

      req.user = JSON.parse(user);

      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  }
);

//validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role (${req.user?.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

//NIGGA
