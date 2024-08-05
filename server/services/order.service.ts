import mongoose, { Document, Model, Schema } from "mongoose";
import { NextFunction, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";
import CourseModel from "../models/course.model";

export const newOrder = catchAsyncError(
  async (req: any, res: any, next: NextFunction) => {
    const order = await OrderModel.create(req.body);

    res.status(201).json({
      success: true,
      order,
    });
  }
);

//Get all orders
export const getAllOrdersService = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    orders,
  });
};
