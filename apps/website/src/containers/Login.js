import React, { useState } from "react";
import { Form, FormField } from "grommet"
import LoaderButton from "../components/LoaderButton";
import "./Login.css";

import { Auth } from "aws-amplify";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = props;

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const signInUser = await Auth.signIn(username, password);
      dispatch({ type: 'setUser', value: signInUser });
      if (signInUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setIsLoading(false);
        props.history.push("/updatepassword");
        return null;
      }
      console.log('User from state', state.user);
      const creds = await Auth.currentCredentials();
      console.log('Creds from login:', creds);
      console.log(signInUser);
      dispatch({ type: 'setCredentials', value: creds });
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
      <Form onSubmit={handleSubmit}>
          <FormField
            autoFocus
            name="username"
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        <LoaderButton
          type="submit"
          primary
          isLoading={isLoading}
          disabled={!validateForm()}
          label={"Submit"}
        />
      </Form>
    </div>
  )
}
