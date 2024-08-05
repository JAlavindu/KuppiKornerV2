import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs, { name } from "ejs";
import { title } from "process";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModdel from "../models/notification.model";
import { getAllUsersService } from "../services/user.services";
import { getAllCoursesService } from "../services/course.service";

//upload course
export const uploadCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

//edit course
export const editCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

//get single course  --- without  purchasing
export const getSingleCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCatchExist = await redis.get(courseId);

      console.log("hitting mongoDB");

      if (isCatchExist) {
        const course = JSON.parse(isCatchExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links"
        );

        console.log("hitting mongoDB");

        await redis.set(courseId, JSON.stringify(course), "EX", 604800);

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all courses --- without purchasing
export const getAllCourses = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCatchExist = await redis.get("allCourses");
      if (isCatchExist) {
        const courses = JSON.parse(isCatchExist);
        console.log("hitting redis");
        res.status(200).json({
          success: true,
          courses,
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links"
        );

        console.log("hitting mongoDB");

        await redis.set("allCourses", JSON.stringify(courses));

        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get course content -- only for valid users
export const getCourseByUser = catchAsyncError(
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user.courses;
      const courseId = req.params.id;

      const courseExist = userCourseList.find(
        (course: any) => course._id.toStirng() === courseId.toStirng()
      );
      if (!courseExist) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 400)
        );
      }
      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId } = req.body as IAddQuestionData;
      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Content not found", 400));
      }

      //create a new question
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      courseContent.questions.push(newQuestion);

      await NotificationModdel.create({
        user: req.user?._id,
        title: "New question received",
        message: `You have a new question in  ${courseContent?.title} `,
      });

      //save the updated course
      await course?.save();

      res.status(200).json({
        success: true,
        message: "Question added successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//add answer in course question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId } =
        req.body as IAddAnswerData;
      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Content not found", 400));
      }

      const question = courseContent.questions.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Question not found", 400));
      }

      //create a new answer
      const newAnswer: any = {
        user: req.user,
        answer,
      };

      question.questionReplies.push(newAnswer);

      //save the updated course
      await course?.save();

      if (req.user?._id === question.user._id) {
        await NotificationModdel.create({
          user: req.user?._id,
          title: "Question answered",
          message: `You have a new answer in  ${courseContent?.title} `,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: html,
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler("Email could not be sent", 500));
        }

        res.status(200).json({
          success: true,
          message: "Answer added successfully",
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//add review in course
interface IAddReviewData {
  review: string;
  courseId: string;
  rating: number;
  userId: string;
}

export const addReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      //check if courseId already exists in userCourseList based on _id
      const courseExist = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );
      if (!courseExist) {
        return next(
          new ErrorHandler("You are not eligible to add review", 400)
        );
      }

      const { review, rating } = req.body as IAddReviewData;
      const course = await CourseModel.findById(courseId);
      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      course?.reviews.push(reviewData);

      let avg = 0;
      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      if (course) {
        course.ratings = avg / course.reviews.length;
      }

      await course?.save();
      const notification = {
        title: "new review recieved",
        message: `${req.user?.name} has added a review in ${course?.name}`,
      };

      await course?.save();

      //create notification
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// add reply in review
interface IAddReviewData {
  comment: String;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewData;

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 400));
      }

      const review = course?.reviews.find(
        (item: any) => item._id.toString() === reviewId
      );

      if (!review) {
        return next(new ErrorHandler("Review not found", 400));
      }

      const replayData: any = {
        user: req.user,
        comment,
      };

      review.commentReplies?.push(replayData);
      await course?.save();

      res.status(200).json({
        success: true,
        message: "Reply added successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all courses --- only for admin
export const gerAllUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//delete courses --- only for admin
export const deleteCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const course = await CourseModel.findById(id);

      if (!course) {
        return next(new ErrorHandler("User not found", 400));
      }

      await course.deleteOne({ id });

      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });

      await course.deleteOne({ id });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
