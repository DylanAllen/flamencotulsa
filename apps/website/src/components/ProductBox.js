import "./ProductBox.css";
import React, { useState } from "react";
import { Box, Heading, Paragraph, Layer, Image, Button } from 'grommet';

export default function ProductBox(props) {
  const { link, image, title, description } = props.product;
  const [show, setShow] = useState(false)
  return (
    <Box
      className={"productBox"}
    >
      <Heading level="4">
        <a href={link}>{title}</a>
      </Heading>
      <Box className={"productImage"}>
        <Image
          fit="contain"
          src={image}
          onClick={() => setShow(true)}
        />
      </Box>
      <Paragraph>{description}</Paragraph>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          className="lightBox"
        >
          <Image
            fit="cover"
            src={image}
            onClick={() => setShow(true)}
          />
        <Paragraph>{description}</Paragraph>
        <Button label="Close" onClick={() => setShow(false)} />
        </Layer>
      )}
    </Box>
  )
}
