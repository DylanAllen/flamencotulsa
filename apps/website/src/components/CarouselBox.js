import "./CarouselBox.css";
import React from "react";
import { Box, Heading, Paragraph } from 'grommet';

const carouselBoxStyle = (img, bgposition) => {
  return {
    height: '500px',
    maxHeight: '60vw',
    width: '100%',
    backgroundImage: `url(${process.env.PUBLIC_URL}/${img})`,
    backgroundSize: 'cover',
    backgroundPosition: bgposition,
    padding: '5%'
  }
}

export default function CarouselBox(props) {
  const { image, heading, text } = props;
  return (
    <Box className="carouselBox" style={carouselBoxStyle(image, 'center center')}>
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
