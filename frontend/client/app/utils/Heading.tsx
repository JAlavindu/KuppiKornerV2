import exp from "constants";
import React, { FC } from "react";

interface HeadProps {
  title: string;
  description: string;
  keywords: string;
}

const Heading: FC<HeadProps> = ({ title, description, keywords }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-sclae=1" />
      <meta name="description" content={description} />
      <meta name="ketwords" content={keywords} />
    </>
  );
};

export default Heading;
