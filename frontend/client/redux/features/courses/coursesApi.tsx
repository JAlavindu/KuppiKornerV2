import React from "react";
import { apiSlice } from "../api/apiSlice";
import EditCourse from "@/app/components/Admin/Course/EditCourse";

type Props = {};

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateCourse: builder.mutation({
      query: (data) => ({
        url: `create-course`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: `get-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    EditCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
} = coursesApi;
