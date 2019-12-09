import "./Home.css";
import React from "react";
import { Box, Heading, ResponsiveContext, Text } from 'grommet';
import CarouselBox from '../components/CarouselBox.js';

export default function Home(props) {

  const { state } = props;

  const startChatMarkup = (
    <Box
      tag='div'
      direction='row'
      align='center'
      justify='between'
      width='small'
      alignContent="center"
      alignSelf="center"
      pad={{ vertical: 'small', horizontal: 'medium' }}
    >
    </Box>
  );

  const loginToStartMarkup = <p>Login to get started</p>;

  return (
    <div className="Home">
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box>
            <Box>
              <CarouselBox
                image={'feriapic.jpeg'}
                heading={'Community'}
                text={'FlamencoTulsa is a community of flamenco music and dance fans and aficionados.'}
              />
            </Box>
            <Box className="mainTextContainer">
              <Box>
                <Heading level={3} color={'accent-1'}>Mission</Heading>
                <Text size="large">
                  Flamenco Tulsa's mission is to share the flamenco art form with our Tulsa community. We do this through classes, cultural events, and enrichment opportunities that benefit our community.
                </Text>
              </Box>
              <Box>
                <Heading level={3} color={'brand'}>Contact</Heading>
                <Text size="large">
                  Contact us at <a href="mailto:info@reflejosflamencos.com">info@reflejosflamencos.com</a>
              </Text>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>


      <div className="chat">
        {state.isAuthenticated ? startChatMarkup : loginToStartMarkup}
      </div>
    </div>
  );
}
