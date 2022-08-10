import axios from "axios";
import React, { useState, useEffect } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";
import Images from "../images/imagejson";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import swal from 'sweetalert';



const UserStoryInput = () => {
  let navigate = useNavigate();
  const [userstory, setUserStory] = useState(null);
  const [method, setMethod] = useState("userstory");
  const [error, setError] = useState("");
  const [display, setDisplay] = useState("none");


  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleMethod = (event) => {
    setMethod(event.target.value);
  };

  const handleChange = (event) => {
   
    setUserStory(event.target.value);
    console.log(userstory);
  };

  const handleSubmit = async () => {
        setDisplay("block")
    
          
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/insert/",
      data: { userstory: userstory, method: method },
    }).then((response) => {
      console.log(response);
      console.log(response.data);
      console.log(typeof response.data);

      var resonsejson = JSON.parse(response.data);

      if (resonsejson.status == true) {
        navigate("/spinner");
      } else {
        setDisplay("none")
  
        swal("Format Error", resonsejson.error, "error");
      }
    });
  };
  return (
    <div>
      <div class="alert alert-danger" role="alert" style={{ display: display }}>
       Waiting....
      </div>
      <Navbar />

      <div className="container webformcontainer">
        <h2 className="h2headingplan text-center animate__animated animate__fadeInLeft ">
          <span className="fontblue">Digital is new Default.</span> Every thing
          happens on screen
        </h2>
        <div className="inner text-left">
          <div className="row">
            <div className="col-md-2">
              <div className="flex">
                <img src={Images.userstory.steps} alt="" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="radiobuttons">
                <div className="flex-custom">
                  <div className="item1">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        onClick={handleMethod}
                        value="userstory"
                        type="radio"
                        name="method"
                        id="userstory"
                      />
                      <label class="form-check-label" for="userstory">
                        User Story
                      </label>
                    </div>
                  </div>
                  <div className="item2">
                    <div className="form-check">
                      <input
                        class="form-check-input"
                        onClick={handleMethod}
                        value="vision"
                        type="radio"
                        name="method"
                        id="userstory"
                      />
                      <label class="form-check-label" for="vision">
                        Vision Statement
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="textbox shadow-lg p-3 mb-5 bg-white rounded ">
                <textarea
                  className="userstorytext"
                  name="userstoryname"
                  id="mytextarea"
                  rows="14"
                  cols="80"
                  onChange={handleChange}
                ></textarea>
                <output id="list"></output>
                <div className="part2">
                  <div className="mb-3 px-10">
                    <button
                      id="js-file"
                      type="file"
                      accept=".txt"
                      className="btn btn-primary upload-button"
                    >
                      <FontAwesomeIcon
                        className="historyicon upload"
                        icon={faUpload}
                      />
                      Upload Text file
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="flex">
                <img src={Images.userstory.rightimage} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="buttongroups">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <button type="button" className="btn btn-outline-primary">
                    Back
                  </button>
                </div>

                <div className="col-md-6">
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="cloud" src={Images.home.cloud} alt="" />
    </div>
  );
};

export default UserStoryInput;
