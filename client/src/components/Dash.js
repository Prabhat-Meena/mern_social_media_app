import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import "./Dash.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Home from "./Home";
// import Card from 'react-bootstrap/Card';
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import { useState } from "react";
import Header from "./Header";
import axios from "axios";

import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Dash() {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);
  // console.log("login",logindata.ValidUserOne.imgpath)
  console.log("login: ", logindata)

  const history = useNavigate();

  const DashboardValid = async () => {
      let token = localStorage.getItem("usersdatatoken");

      const res = await fetch("/validuser", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });

      const data = await res.json();

      if (data.status == 401 || !data) {
          history("*");
      } else {
          console.log("user verify");
          setLoginData(data)
          history("/dash");
      }
  }


  useEffect(() => {
      setTimeout(() => {
          DashboardValid();
          setData(true)
      }, 5000)

  }, [])


  //users data and image
  function Content() {
        return(
          <Home />
        )
  }

  useEffect(() => {
    setTimeout(() => {
        DashboardValid();
        setData(true)
    }, 2000)

}, [])

  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <>
      <div
        className={`container ${theme}`} style={{}}
      >
        <Navbar theme={theme} setTheme={setTheme} />
        {/* <Header /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            // margin: "15px",
          }}
        >
          <SideMenu theme={theme} />
          <Content  />
        {data ? (
          <div className="rightsidebar"
            
          >
            {/* <img
              src="./man.png"
              style={{ width: "20px", marginTop: 20 }}
              alt=""
            /> */}
            <h4 className="sidecardname"><img
              src={`/uploads/${logindata.ValidUserOne.imgpath}`}
              // style={{ width: "70px", height:"70px", marginTop: 20, border:"3px solid black", borderRadius:"50%", marginRight:"15px", marginBottom:"10px"}}+
              alt="hello"
            className="sideimg" />{logindata ? logindata.ValidUserOne.fname : ""},  {logindata ? logindata.ValidUserOne.email : ""}</h4>
            <div><input type="file"/></div>
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            Loading... &nbsp;
            <CircularProgress />
          </Box>
        )}
        </div>
      </div>
    </>
  );
}


export default Dash;
