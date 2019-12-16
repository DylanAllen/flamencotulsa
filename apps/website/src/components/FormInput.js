import "./FormInput.css";
import React from "react";
import { Box, FormField, TextInput, CheckBox, Select } from 'grommet';


export default function ClassForm(props) {

  const { keyName, dispatch, state } = props;

  const data = state[keyName];

  if (!data) {
    return null;
  }

  const options = [
    {
      lab: 'This',
      val: 'other'
    },
    {
      lab: 'who',
      val: 'is'
    },
    {
      lab: 'and',
      val: 'how'
    },
  ];

  if (data.type === 'checkbox') {
    return (
      <FormField key={keyName}>
        <Box key={keyName}  pad="medium">
          <CheckBox
            checked={data.value}
            required={data.required}
            label={data.label}
            onChange={event => {
              dispatch({type: 'setValue', key: keyName, value: event.target.checked })
            }}
          />
        </Box>
      </FormField>
    )
  } else if (data.type === 'select') {
    const label = (data.required) ? `${data.label}*` : data.label;
    console.log('select data', data);
    return (
      <Box key={keyName}>
        <FormField label={label}>
          {
            data.options.map((option) => {
              return (
                <Box pad="small" key={option}>
                  <CheckBox
                    checked={data.value.includes(option)}
                    required={false}
                    label={option}
                    onChange={event => {
                      dispatch({type: 'setClassValue', className: option, key: keyName, value: event.target.checked })
                    }}
                  />
                </Box>
              )
            })
          }
        </FormField>
      </Box>
    )

  } else {
    const label = (data.required) ? `${data.label}*` : data.label;
    return (
      <Box key={keyName}>
        <FormField label={label}>
            <TextInput
              value={data.value}
              required={data.required}
              onChange={event => {
                dispatch({type: 'setValue', key: keyName, value: event.target.value })
              }}
            />
        </FormField>
      </Box>
    )
  }
}
