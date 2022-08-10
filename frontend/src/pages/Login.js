import React from "react";
import Images from "../images/imagejson"
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate()
  const routerChange = () => {
    navigate('/home');
  }
  return (
    <>
      <div className="parentlogin">
        <div className="row">
          <div className="col-md-7">
            <div className="imagecontain">
              <img
                className="backgoundimage"
                src={Images.login.background}
                alt=""
              />
              <img className="man" src={Images.login.man} alt="" />
            </div>
          </div>
          <div className="col-md-5">
            <form className="animate__animated animate__bounceIn">
              <div
                className="card shadow-lg logincard align-middle"
                style={{ width: "100%" }}
              >
                <div className="card-body text-center logincard">
                  <div className="imagelock text-center">
                    <img className="lockimage" src={Images.login.lock} alt="" />
                  </div>
                  <div className="cardcontent text-center">
                    <h3 className="card-title">Login into Provision</h3>
                    <h6 className="card-subtitle mb-2 text-muted mt-1">
                      Login to Provision to convert your imagination into
                      reality
                    </h6>
                    <div className="inputlogin ">
                      <form>
                        <div className="form-group loginform">
                          <label
                            htmlFor="exampleInputEmail1 "
                            className="labellogin"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control logininput"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="form-group loginform">
                          <label
                            htmlFor="exampleInputPassword1 "
                            className="labellogin"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control logininput"
                            id="exampleInputPassword1"
                            placeholder="Password"
                          />
                        </div>
                        <div className="row">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck1"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                              Remember Me
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          onClick={routerChange}
                          className="btn btn-primary loginbtn"
                        >
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}