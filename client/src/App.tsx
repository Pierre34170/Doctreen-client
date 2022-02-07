import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { User_Interface } from "./interfaces/User.interface";
import { HomeView } from "./views/Home/HomeView";
import { ProfileView } from "./views/Profile/ProfileView";
import { UserView } from "./views/Users/UserView";
import { self } from "./services/user.service";
import { LoginView } from "./views/Login/LoginView";
import { SignUpView } from "./views/Login/SignupView";

interface Props {
  component: React.ComponentType
  path?: string
}

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return <RouteComponent />
  }
  return <Navigate to="/login" />
}


function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User_Interface>();

  useEffect(() => {
    const currentUserId = localStorage.getItem("user");
    if (!!currentUserId) {
      self().then((loggedUser) => {
        setCurrentUser(loggedUser);
      });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeView/>} />
          <Route path="/profile" element={<PrivateRoute component={ProfileView}/> } />
          <Route path="/users" element={<PrivateRoute component={UserView}/> } />
          <Route path="/login" element={!currentUser ? <LoginView/> :  <Navigate to="/home" />} />
          <Route path="/signup" element={!currentUser ? <SignUpView/> : <Navigate to="/home" />} />
          <Route
            path="*"
            element={
              <div>
                <p>404 Error Not Found</p>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
