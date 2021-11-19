import decode from "jwt-decode";

// hooks
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import useStyles from "./App.styles";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
// import { useTheme } from "@mui/styles";

// components
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "./components/Home/Home.component";
import Auth from "./components/Auth/Auth.component";
import Dashboard from "./components/Dashboard/Dashboard.component";
import Toolbar from "./components/Toolbar/Toolbar.component";
import MovementForm from "./components/Movement/MovementForm/MovementForm.component";
import Movements from "./components/Movement/Movements/Movements.component";
import MovementDetails from "./components/Movement/MovementDetails/MovementDetails.component";
import PlanForm from "./components/Plan/PlanForm/PlanForm.component";
import Plans from "./components/Plan/Plans/Plans.component";
import PlanDetails from "./components/Plan/PlanDetails/PlanDetails.component";
import SessionForm from "./components/Session/SessionForm/SessionForm.component";
import Sessions from "./components/Session/Sessions/Sessions.component";
import SessionDetails from "./components/Session/SessionDetails/SessionDetails.component";
import Goals from "./components/Goal/Goals/Goals.component";
import GoalForm from "./components/Goal/GoalForm/GoalForm.component";
import Perform from "./components/Perform/Perform.component";
import Status from "./components/Status/Status.component";
import Connections from './components/Connections/Connections.component';
import Footer from "./components/Footer/Footer.component";

const AppWrapper = () => {
  // this wrapper allows App.jsx to use react-router-dom context so useHistory() doesn't return undefined

  // hooks

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // console.log(`(prefers-color-scheme: dark): ${prefersDarkMode}`);
  const [darkMode, setDarkMode] = useState(prefersDarkMode || true);
  // console.log(`darkMode: ${darkMode}`);
  const theme = React.useMemo(
    () =>
      createTheme({
        spacing: 8,
        palette: {
          mode: darkMode ? "dark" : "light",
          // type: "dark",
        },
        components: {
          MuiAppBar: {
            defaultProps: {
              enableColorOnDark: true,
            },
          },
        },
      }),
    [darkMode]
  );

  // check if browser light/dark mode preference changes
  useEffect(() => {
    if (prefersDarkMode) {
      // console.log('AppWrapper component useEffect setting darkMode to true');
      setDarkMode(true);
    } else {
      // console.log('AppWrapper component useEffect setting darkMode to false');
      setDarkMode(false);
    }
  }, [prefersDarkMode]);

  const handleDarkModeToggle = (e) => {
    e.preventDefault();
    // console.log(`handleDarkModeToggle invoked. setDarkMode(${!darkMode})`);
    setDarkMode(!darkMode);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {" "}
          {/* set context */}
          <App handleDarkModeToggle={handleDarkModeToggle} />{" "}
          {/* now app has access to context  */}
        </Router>
      </ThemeProvider>
    </>
  );
};

const App = ({ handleDarkModeToggle }) => {
  // hooks

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  // state

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.user
  );

  // event handlers

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/home");
    setUser(null);
  };

  // lifecycle

  // when location changes, check for token. if token exists, set user state to localStorage user
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (token?.length < 500) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    } else {
      // check google oauth token expiry?
    }
    // setUser
    setUser(JSON.parse(localStorage.getItem("profile"))?.user);
  }, [location]);

  // render

  return (
    <Switch>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Route path="/">
        <Toolbar
          user={user}
          handleLogout={handleLogout}
          handleDarkModeToggle={handleDarkModeToggle}
        />
        <main className={classes.main}>
          <Route exact path="/">
            {
              user ? (
                <Dashboard user={user} />
              ) : (
                <Home />
              )
            }
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard user={user} />
          </Route>
          <Route exact path="/movements/create">
            <MovementForm />
          </Route>
          <Route exact path="/movements">
            <Movements />
          </Route>
          <Route path="/movements/:id">
            <MovementDetails />
          </Route>
          <Route exact path="/workouts/create">
            <PlanForm />
          </Route>
          <Route exact path="/plans">
            <Plans />
          </Route>
          <Route path="/plans/:id">
            <PlanDetails />
          </Route>
          <Route exact path="/sessions/create/plan/:id">
            <SessionForm />
          </Route>
          <Route exact path="/sessions">
            <Sessions />
          </Route>
          <Route exact path="/sessions/:id">
            <SessionDetails />
          </Route>
          <Route exact path="/sessions/:id/perform">
            <Perform />
          </Route>
          <Route exact path="/status">
            <Status />
          </Route>
          <Route exact path="/goals">
            <Goals />
          </Route>
          <Route exact path="/goals/create">
            <GoalForm />
          </Route>
          <Route exact path="/connections/">
            <Connections />
          </Route>
          <Route path="/">
            <Footer styles={{ marginTop: "auto" }} />
          </Route>
        </main>
      </Route>
    </Switch>
  );
};

export default AppWrapper;
