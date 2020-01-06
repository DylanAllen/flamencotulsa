import "./EnrollmentList.css";
import React from "react";
import { Box } from 'grommet';

export default function EditPost(props) {

  const row = (data) => {

    return (
      <Box key={data['id']} className="enrollRow" pad="small" border={'small'}>
        <Box className={'enrollCell'}>
          {data['Name']}
        </Box>
        <Box className={'enrollCell'}>
          {data['Email']}
        </Box>
        <Box className={'enrollCell'}>
          {data['Phone']}
        </Box>
        <Box className={'enrollCell'}>
          {data['Classes']}
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {props.state.enrollments.map((item) => {
        return (
            row(item)
        )
      })}
    </Box>
  )
}
