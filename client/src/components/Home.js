import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import "./Home.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaRegComment } from "react-icons/fa";
// import TelegramIcon from '@mui/icons-material/Telegram';
import { LiaTelegram } from "react-icons/lia";

const Home = () => {
  const [data, setData] = useState([]);
  // console.log(data);

  const [show, setShow] = useState(false);

  const getUserData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      setData(res.data.getUser);
    }
  };

  const dltUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      getUserData();
      setShow(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          User Delete
        </Alert>
      ) : (
        ""
      )}
      <div className="container mt-2">
        <h1 className="text-center mt-2">MERN Image Upload Projects</h1>
        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add User
            </NavLink>
          </Button>
        </div>

        <div className="row d-flex justify-content-between align-iteams-center mt-5">
          {data.length > 0
            ? data.map((el, i) => {
                {
                  {/* console.log("el", el.imgpath); */}
                }
                return (
                  <>
                    <h5 className="smallimg">
                      <img
                        src={`/uploads/${el.imgpath}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "18px",
                          marginLeft: "10px",
                        }}
                      >
                        {el.fname}
                      </p>
                    </h5>
                    <Card className="mb-3 card">
                      <Card.Img 
                        variant="top"
                        // style={{
                        //   width: "34.9rem",
                        //   height: "35rem",
                        //   textAlign: "center",
                        //   margin: "auto",
                        // }}
                        src={`/uploads/${el.imgpath}`}
                        className="mt-2 mainimg"
                      />
                      <Card.Body className="text-center">
                      <FavoriteBorderIcon style={{fontSize:"35", marginRight:"6px", marginTop:"5px"}}/> <FaRegComment style={{fontSize:"30", marginRight:"6px"}}/> <LiaTelegram  style={{fontSize:"35"}}/>
                        <Card.Title className="cardtittle">
                          User Name : {el.fname}
                        </Card.Title>
                        <Card.Text className="cardtittle">
                          Date Added : {moment(el.date).format("L")}
                        </Card.Text>
                        {/* <Card.Text className="cardtittle">
                        Email : {el.email}
                        </Card.Text> */}

                        <Button
                          variant="danger"
                          className="col-lg-6 text-center cardbutton btn btn-primary"
                          // onClick={() => dltUser(el._id)}
                          // onClick={() => dltUser(el._id)}

                        >
                          View Profile
                        </Button>
                      </Card.Body>
                    </Card>
                    {/* <h5 className="like">
                    <FavoriteBorderIcon />
                    </h5> */}
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Home;
