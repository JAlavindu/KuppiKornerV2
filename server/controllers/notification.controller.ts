import NotificationModdel from "../models/notification.model";
import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron";

//get all notifications --- only
export const getNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModdel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

//update notification status -- only admin
export const updateNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModdel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }

      await notification?.save();

      const notifications = await NotificationModdel.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

//delete notification -- only admin
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModdel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDayAgo },
  });
  console.log("Deleted read notifications older than 30 days");
});
