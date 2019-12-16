import "./ClassForm.css";
import React, { useReducer, useEffect, useState } from "react";
import { Box, Button, Heading } from 'grommet';
import FormInput from './FormInput.js';
import { formReducer, initFormReducer } from '../reducers/formReducer.js';
import config from '../config.js';

const formData = {
  Name: {
    value: '',
    label: 'Name',
    required: true
  },
  Email: {
    value: '',
    label: 'Email',
    required: true,
    type: 'email'
  },
  Phone: {
    value: '',
    label: 'Phone',
    required: true
  },
  Classes: {
    value: [],
    label: 'Class(es)',
    required: true,
    options: [],
    type: 'select'
  },
  Parent: {
    value: '',
    label: `Parent's Name (if applicable)`,
    required: false
  },
  Birthday: {
    value: '',
    label: 'Birthday',
    required: false
  },
  Comments: {
    value: '',
    label: 'Comments or Questions',
    required: false,
    type: 'textarea'
  },
  release1: {
    value: false,
    label: 'I, the undersigned, hereby release Reflejos Flamencos, all agents and assistants from any and all injuries and causes of action which I may sustain while training, practicing, performing, or during any event or activity. agree that I am responsible for my own health and accident insurance, and any medical costs incurred due to an injury.',
    required: true,
    type: 'checkbox'
  },
  release2: {
    value: false,
    label: 'I, the undersigned, hereby give Refejos Flamencos, its nominees, and agents permission to use, publish, or republish in furtherance of its work, reproductions of my photographic likeness, with or without use of my name.',
    required: true,
    type: 'checkbox'
  },
  signature: {
    value: '',
    label: "E-Signature (Parent's signature if student is under the age of 18)",
    required: true
  }
}

const submitEnrollment = async (data) => {
  const response = await fetch(`${config.apiGateway.URL}/enroll`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: btoa(JSON.stringify(data))
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}


const handleSubmit = async (state, setFormSubmitted) => {
  const resp = {};
  let errors = false;

  Object.keys(state).map((key) => {
    if (!state[key].value && state[key].required) {
      errors = true;
      return null;
    }
    if (state[key].value) {
      return resp[key] = state[key].value;
    }
    return null;
  })

  if (errors) {
    alert('Please fill in all required fields and check the release checkboxes.');
    return null;
  }

  const submission = await submitEnrollment(resp);
  console.log(submission);
  if (submission.message === 'Enrollment Submitted!') {
    return setFormSubmitted(true);
  } else {
    alert(`Form submission error: ${submission.message}`);
  }
}

const AllFormInputs = (props) => {
  const { state, dispatch } = props;
  return (
    Object.keys(state).map((key) => {
      const item = formData[key];
      return (
        <FormInput data={item} key={key} keyName={key} dispatch={dispatch} state={state} />
      )
    })
  )
}

export default function ClassForm(props) {

  const { classList } = props;

  const [state, dispatch] = useReducer(formReducer, formData, initFormReducer)
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    dispatch({type: 'setOptions', value: classList, key: 'Classes'})
  },[])

  return (
    <Box pad="medium" elevation="medium" margin={{vertical: 'medium'}} width="xlarge" alignSelf="center">
      <Heading level="2">Enrollment Form</Heading>
      {
        formSubmitted && <Heading level="3">Enrollment form submitted!</Heading>
      }
      {
        !formSubmitted && <AllFormInputs state={state} dispatch={dispatch} />
      }
      {
        !formSubmitted && <Button label="Submit" onClick={() => {handleSubmit(state, setFormSubmitted);}} />
      }
    </Box>
  )
}
