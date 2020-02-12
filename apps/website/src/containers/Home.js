import "./Home.css";
import React from "react";
import { Box, Heading, ResponsiveContext, Text, Paragraph } from 'grommet';
import CarouselBox from '../components/CarouselBox.js';

export default function Home(props) {

  return (
    <div className="Home">
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box>
            <Box>
              <CarouselBox
                image={'feriapic.jpeg'}
                heading={'Community'}
                text={'Flamenco Tulsa is a community of flamenco performers, students, and Spanish culture aficionados.'}
              />
            </Box>
            <Box className="mainTextContainer">
              <Box>
                <Heading level={2} color={'brand'}>Mission</Heading>
                <Text size="large" margin={{right: 'medium'}}>
                  Flamenco Tulsa's mission is to share the flamenco art form with our Tulsa community. We do this through classes, cultural events, and enrichment opportunities that benefit our community.
                </Text>
              </Box>
              <Box>
                <Heading level={2} color={'brand'}>Contact</Heading>
                <Text size="large">
                  Contact us at <a href="mailto:info@reflejosflamencos.com">info@reflejosflamencos.com</a>
              </Text>
              </Box>
            </Box>
            <Box border='top' margin={{top: 'large'}}>
              <Heading level={1} color={'brand'}>About FlamencoTulsa</Heading>
              <Paragraph fill={true} size="large">
                Flamenco Tulsa's mission, plain and simple, is to share the flamenco art form with our Tulsa community. We do this through classes, cultural events, and enrichment opportunities that benefit our community.
              </Paragraph>
              <Box>
                <Heading level={2} color={'accent-3'}>What is flamenco?</Heading>
                <Paragraph fill={true} size="large">
                  Flamenco is a music and dance art form that originated in the Southern part of Spain, called Andalucia. It developed as a mixture of cultural influences from the different people groups that lived and still live in Spain, such as the Christians, Jews, Moors, and Spanish gypsies. Influences from Indian music and dance can also be seen and heard, as the gypsies are thought to have travelled from India before settling in Southern Spain. The evolution of this art form continues to this day with elements of jazz, blues, and classical dance common in today's flamenco.
                </Paragraph>
              </Box>
              <Heading level={2} color={'accent-3'}>Why is flamenco important?</Heading>
              <Paragraph fill={true} size="large">
                Flamenco in its truest form is an expression of human experience and emotion. Displaying joy and sorrow, happiness and even despair, flamenco acts as a beautiful catalyst for human expression.
              </Paragraph>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </div>
  );
}
