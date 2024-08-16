import React, { FC, useState, useEffect } from "react";
import { styles } from "@/app/styles/style"; // Import the styles module

type Props = {
  courseInfo: any;
  setCourseInfo: (course: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
        }
      };
    }
  };

  return (
    <div className=" w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack development"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`} htmlFor="description">
            {" "}
            Course description
          </label>
          <textarea
            name=""
            id=" "
            cols={30}
            rows={10}
            placeholder="write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[48%]">
            <label htmlFor="estimatedPrice">Estimated Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="2000"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN, Redux, Nodejs"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div>
          <label htmlFor="level">Level</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.level}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, level: e.target.value })
            }
            id="level"
            placeholder="Beginner"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div>
          <label htmlFor="demoUrl">Demo Url</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.demoUrl}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
            }
            id="demoUrl"
            placeholder="https://www.youtube.com"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
