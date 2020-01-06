import "./ClassSchedule.css";
import React, { useEffect } from "react";
import { Box, Text, Accordion, AccordionPanel, Heading, Paragraph } from 'grommet';
import ClassForm from './ClassForm.js';

const classData = [
  {name: 'Tulsa Kids Dance (Ages 4-11)', day: 'Wednesdays', time: '5:30 - 6pm', dates: 'Starting Jan 29, 2020, 14 week session', cost: '$157 for all 14 classes, $12 drop in', prereq: 'No Dance Experience Required / Closed-toe shoes with hard soles, boys wear comfortable exercise clothes with hard soles shoes, girls wear knee length or ankle length skirt; No tennis shoes! Hair pulled back from face.', loc: 'Destiny Dance Studio (81st & Sheridan)' },
  {name: 'Adult Int. Dance', day: 'Wednesdays', time: '6pm - 7pm', dates: 'Starting Jan 29, 2020, 14 week session', cost: '$185 for all 4 classes, $15 per class drop in', prereq: 'Flamenco Experience Required / For women, wear character shoes or flamenco shoes, fitted top or leotard, ankle length skirt or yoga pants', loc: 'Destiny Dance Studio (81st & Sheridan)' },
  {name: 'Adult Beginning Dance', day: 'Wednesdays', time: '7pm - 8pm', dates: 'Starting Jan 29, 2020, 14 week session', cost: '$180 for all 4 classes, $15 per class drop in', prereq: 'No Flamenco Dance Experience Required / Women wear character shoes or flamenco shoes, fitted top or leotard, ankle length skirt or yoga pants; Men wear exercise attire with flamenco boots or hard soled dress shoe', loc: 'Destiny Dance Studio (81st & Sheridan)' }
]

const classDataTitles = {
  name: 'Class Name',
  day: 'Day',
  time: 'Time',
  dates: 'Dates',
  cost: 'Cost',
  prereq: 'Prerequisite/What to wear',
  loc: 'Location'
}

const classObjToList = (classObj) => {
  let list = [];
  Object.keys(classObj).map((key) => {
    if (key === 'day' || key === 'time' || key === 'name') {
      return null;
    }
    list.push({
      key: classDataTitles[key],
      value: classObj[key]
    })
    return key;
  })
  return list;
}

export default function ClassSchedule(props) {

  const list = []

  useEffect(() => {
    classData.map((classOb) => {
      return list.push(`${classOb.name} | ${classOb.time}`)
    })
    console.log('Setting classlist', list);
  },[])

  let i = 0;

  return (
    <Box pad={{vertical: 'medium'}}>
      <Accordion elevation="medium" margin={{vertical: "small"}}>
        {
          classData.map((classOb) => {

            let bgval = (i%2 === 0) ? 'light-1' : '#eaeaea';
            i++;
            return (
              <AccordionPanel
                label={<Text size="large">{classOb.day} {classOb.time} | {classOb.name}</Text>}
                key={classOb.name}
                background={bgval}
                pad="medium"
              >
                <Box pad={{horizontal: 'medium', bottom: 'medium'}} background={bgval}>
                  {
                    classObjToList(classOb).map((info) => {
                      return (
                        <Box key={info.key} border={"bottom"} pad={{vertical: 'medium'}}>
                          <Heading level="3" margin={{vertical: 'xsmall'}}>{info.key}</Heading>
                          <Text size="large">{info.value}</Text>
                        </Box>
                      )
                    })
                  }
                </Box>
              </AccordionPanel>
            )
          })
        }
      </Accordion>
      <Paragraph fill={true}>
        <strong>Class Location:</strong><br/>
        Destiny Dance Studio - 81st & Sheridan , Tulsa, OK , Next to Perry's Meat Market<br/>
        For more information contact: <a href="mailto:lexi@reflejosflamencos.com">lexi@reflejosflamencos.com</a>.
      </Paragraph>
        <ClassForm classList={list}  />
    </Box>
  )
}
