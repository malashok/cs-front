import './App.css'
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import {useState} from "react";
import LoginForm from "./loginForm/LoginForm";

function App() {
  const [authUser, setAuthUser] = useState('');
  return (
      <div className="app">
          <LoginForm authUser={authUser} setAuthUser={setAuthUser}></LoginForm>
          <Header user={authUser}/>
      <div className="content">
          <Outlet />
        </div>
      </div>
  )
}

export default App;
