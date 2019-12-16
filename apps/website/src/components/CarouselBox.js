import "./CarouselBox.css";
import React from "react";
import { Box, Heading, Paragraph } from 'grommet';

export default function CarouselBox(props) {
  const { image, heading, text } = props;
  return (
    <Box className="carouselBox" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${image})` }}>
      <Box className="carouselTextContainer">
        <Heading
          color={'light-1'}
          textAlign={'start'}
          alignSelf={'start'}
        >
          { heading }
        </Heading>
        <Paragraph
          color={'light-1'}
          textAlign={'start'}
          alignSelf={'start'}
          size={'xlarge'}
        >
          { text }
        </Paragraph>
      </Box>
    </Box>
  )
}
