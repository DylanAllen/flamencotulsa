import "./ProductBox.css";
import React, { useState } from "react";
import { Box, Heading, Paragraph, Layer, Image, Button, Anchor, Text } from 'grommet';

export default function ProductBox(props) {
  const { link, image, title, description } = props.product;
  const [show, setShow] = useState(false)
  return (
    <Box
      className={"productBox"}
    >
      <Heading level="3" size="small" textAlign="center" truncate={true}>
        <Anchor href={link} target="_blank" label={title} />
      </Heading>
      <Box className={"productImage"}>
        <Image
          fit="contain"
          src={image}
          onClick={() => setShow(true)}
        />
      </Box>
      <Text truncate={true}>{description}</Text>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          className="lightBox"
        >
          <Heading level="3" size="small" textAlign="center">
            <Anchor href={link} target="_blank" label={title} />
          </Heading>
          <Image
            fit="contain"
            src={image}
            style={{maxHeight: '60vh'}}
            onClick={() => setShow(true)}
          />
          <Box>
            <Paragraph fill={true}>
              {description}
            </Paragraph>
            <Anchor href={link} margin={'small'} style={{textAlign: 'center'}} target="_blank" label='Buy on Amazon' size="large" textAlign="center" />
            <Button margin={'small'} label="Close" onClick={() => setShow(false)} />
          </Box>
        </Layer>
      )}
    </Box>
  )
}
