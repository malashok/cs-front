import './App.css'
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import {useState} from "react";

function App() {
  const [authUser, setAuthUser] = useState(false);
  return (
      <div className="app">
          <Header />
      <div className="content">
          <Outlet />
        </div>
      </div>
  )
}

export default App