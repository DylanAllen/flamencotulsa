import React from "react";
import { Box, Paragraph, Heading } from 'grommet';
import CarouselBox from '../components/CarouselBox.js';
import ClassSchedule from '../components/ClassSchedule.js';

export default function Classes(props) {
  return (
    <Box>
      <CarouselBox
        image={'dancing-rj.jpg'}
        heading={'Dance'}
        text={'We like to dance!'}
      />
      <Box pad={{ vertical: 'large' }} width="xlarge" alignSelf="center">
        <Paragraph size="large" fill={true} margin={{vertical: 'medium'}}>
          Flamenco Tulsa offers weekly group flamenco dance classes as well as private flamenco guitar classes. You can check out our class schedule and enrollment form below!
        </Paragraph>
        <Paragraph size="large" fill={true} margin={{vertical: 'medium'}}>
          As part of our mission to share the flamenco art form with our Tulsa community we also host yearly workshops with traveling flamenco artists. Keep an eye out for information on these workshops on our website, facebook and twitter! For more information email <a href="mailto:info@reflejosflamencos.com">info@reflejosflamencos.com</a>.
        </Paragraph>
      </Box>
      <Box width="xlarge" alignSelf="center">
        <Heading level="2">Class Info</Heading>
        <ClassSchedule />
      </Box>
    </Box>
  )
}
