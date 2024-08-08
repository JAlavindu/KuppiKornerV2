import { Request } from "express";
import { IUser } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// import { Request } from "express";

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: any; // You can replace `any` with a more specific type if you have one
//   }
// }
