import { NextFunction, Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/userModel";

//get user by id
export const getUserById = async (id: string, res: Response) => {
  const user = await userModel.findById(id);

  res.status(200).json({
    succss: true,
    user,
  });

  // if (user) {
  //   const user = JSON.parse(user);
  //   return res.status(200).json({
  //     success: true,
  //     user,
  //   });
  // }
};

//Get all users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

//update user role
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};
