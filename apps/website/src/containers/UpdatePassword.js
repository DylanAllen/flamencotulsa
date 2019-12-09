import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./UpdatePassword.css";

import { Auth } from "aws-amplify";

export default function UpdatePassword(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { state, dispatch } = props;

  function validateForm() {
    return password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const updatePass = await Auth.completeNewPassword(state.user, password);
      console.log(updatePass);
      dispatch({ type: 'userHasAuthenticated', value: true });
      props.history.push("/");
    } catch (e) {
      console.log(e);
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>New Password</ControlLabel>
          <FormControl
            key="newpassword"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Update Password
        </LoaderButton>
      </form>
    </div>
  )
}
