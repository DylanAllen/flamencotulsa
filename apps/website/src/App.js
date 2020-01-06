import React, { useEffect, useReducer } from "react";
import { withRouter, Link } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import MainMenu from './components/MainMenu.js';
import { Grommet, Heading, Box, ResponsiveContext, Text, Anchor } from 'grommet';
import { FacebookOption } from 'grommet-icons';
import { authReducer, initReducer } from './reducers/authReducer';
import { theme } from './theme';

const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  user: null,
  sessionId: null,
  credentials: null,
  isChatStarted: false,
  isStartingChat: false,
  contactId: null,
  transcript: [],
  blogData: [],
  activeBlog: {
    title: '',
    slug: '',
    content: '',
    excerpt: ''
  },
  enrollments: []
};

function App(props) {
  const [state, dispatch] = useReducer(authReducer, initialState, initReducer);

  async function onLoad() {
    try {
      await Auth.currentSession();
      const authUser = await Auth.currentAuthenticatedUser();
      dispatch({type: 'setUser', value: authUser });
      dispatch({ type: 'userHasAuthenticated', value: true });
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
      dispatch({ type: 'setIsAuthenticating', value: false });
      return
    }

    try {
      const creds = await Auth.currentCredentials();
      dispatch({ type: 'setCredentials', value: creds });
    } catch(err) {
      console.log('Error getting credentials', err);
    }
    dispatch({ type: 'setIsAuthenticating', value: false });
  }

  useEffect(() => {
    onLoad();
  }, []);


  async function handleLogout() {
    await Auth.signOut();

    dispatch({ type: 'userHasAuthenticated', value: false });

    props.history.push("/login");
  }

  return (
    !state.isAuthenticating && (
      <Grommet theme={theme}>
        <ResponsiveContext.Consumer>
          {(size) => (
            <div className="App container">
              <Box
                id={"mainhead"}
                tag={"header"}
                border="bottom"
                className={(size === 'small') ? 'mobile' : ''}
              >
                <div>
                  <Heading responsive={true} level={2} margin={{vertical: 'small'}}>
                    <Link to="/">
                      <img src={`${process.env.PUBLIC_URL}/FlamencoTulsaLogoSM.png`} className="logo" alt="Voice Foundry" />
                    </Link>
                  </Heading>
                </div>
                <MainMenu
                  size={ size }
                  handleLogout={ handleLogout }
                  history={ props.history }
                  state={ state }
                />
              </Box>
              <Routes appProps={{ state, dispatch }} />

            </div>
          )}
        </ResponsiveContext.Consumer>
        <Box id="footer" background="brand" pad="medium">
          <div className="container footcontainer">
            <Text size="large">
              &copy; FlamencoTulsa 2019
            </Text>
            {
              state.isAuthenticated && <Box pad={{horizontal: 'small'}}>
              <Anchor onClick={() => {props.history.push('/admin');}} label="Admin" />
            </Box>
            }
            <span className="floatright">
              <a href="https://www.facebook.com/Flamenco-Tulsa-107974785905865/">
                <FacebookOption />
              </a>
            </span>
          </div>
        </Box>
      </Grommet>
    )
  );
}
export default withRouter(App);

// <Menu
//   className="hamburgerMenu"
//   a11yTitle="Main menu button"
//   alignSelf={'center'}
//   alignText={'center'}
//   label=""
//   icon={<MenuIcon />}
//   items={menuList()}
// />
