import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import "./App.css";
import Dash from "./components/Dash";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import Footer from "./components/Footer";
import Updateprofile from "./components/Updateprofile";
// import Sidebar from "./components/Sidebar";
// {
//   /* The following line can be included in your src/index.js or App.js file */
// }
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  ///
  // const current_theme = localStorage.getItem("current_theme");
  // const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  // useEffect(()=>{
  //     localStorage.setItem('current_theme', theme)
  // }, [theme])
  ////
  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    // localStorage.setItem("current_theme", theme);
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  function Content() {
    return <div></div>;
  }

  return (
    <>
      {/* <div
        className={`container ${theme}`}
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   flex: 1,
        //   height: "100vh",
        //   backgroundColor: "#ced8ff",
        // }}
      >
        <Navbar theme={theme} setTheme={setTheme} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            margin: "15px",
          }}
        >
          <SideMenu theme={theme}/>
          <Content />
        </div>
        ,
        <Footer />
      </div> */}
      {data ? (
        <>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Updateprofile" element={<Updateprofile />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route
              path="/forgotpassword/:id/:token"
              element={<ForgotPassword />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
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
    </>
  );
}

export default App;
