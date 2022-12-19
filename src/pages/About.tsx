import { Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const { state } = useLocation();
  return (
    <div>
      <Typography variant="h3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        ipsum neque nulla nesciunt adipisci rem ducimus explicabo. Assumenda
        temporibus magnam rem voluptates, possimus optio vero earum cupiditate
        officiis hic accusamus! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Consectetur ipsum neque nulla nesciunt adipisci rem
        ducimus explicabo. Assumenda temporibus magnam rem voluptates, possimus
        optio vero earum cupiditate officiis hic accusamus! Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Consectetur ipsum neque nulla
        nesciunt adipisci rem ducimus explicabo. Assumenda temporibus magnam rem
        voluptates, possimus optio vero earum cupiditate officiis hic accusamus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        ipsum neque nulla nesciunt adipisci rem ducimus explicabo. Assumenda
        temporibus magnam rem voluptates, possimus optio vero earum cupiditate
        officiis hic accusamus! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Consectetur ipsum neque nulla nesciunt adipisci rem
        ducimus explicabo. Assumenda temporibus magnam rem voluptates, possimus
        optio vero earum cupiditate officiis hic accusamus!
      </Typography>
    </div>
  );
};

export default About;
