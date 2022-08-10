import React from "react";
import Images from "../images/imagejson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

sessionStorage.clear();
export default function Home() {
  return (
    <>
      <Navbar title="PRO-VISION" profileID={1426363} user="Kevin Smith" />
      <div className="bodyHome">
        <div className="container contianercenter">
          <div className="card shadow-lg row align-items-center text-center">
            <div className="text-center animate__animated  animate__fadeInDownBig">

              <h2 className="h2headingplan ">
                Choose the plan that works for you!
              </h2>
              <h3 className="subheadplan">
                Wheter it is visualizing your UI ideas or designing entire
                products with your team, <br /> ProVision covers it all
              </h3>
            </div>

            <div className="parentnmain">
              <div className="row">
                <div className="col-md-6 cardcol">
                  <div className="card shadow parentcards align-items-center animate__animated   animate__flipInY">
                    <Link to="/userstory">
                      <div className="rectanglecreatenew">
                        <FontAwesomeIcon
                          className="createnewicon"
                          icon={faPlusCircle}
                        />
                      </div>
                    </Link>
                    <img
                      className="subtractionimages"
                      src={Images.home.subtraction}
                    />
                  </div>
                  <h4 className="h4headingcu animate__animated  animate__zoomIn">Create New</h4>
                </div>
                <div className="col-md-6 cardcol">
                  <div className="card shadow parentcards align-items-center animate__animated   animate__flipInY">
                  <Link to="/updateexisting">
                    <div className="rectangleupdate">
                      <FontAwesomeIcon
                        className="historyicon"
                        icon={faHistory}
                      />
                    </div>
                    </Link>
                    <img
                      className="subtractionimages"
                      src={Images.home.subtraction}
                    />
                  </div>
                  <h4 className="h4headingcu animate__animated  animate__fadeInDown">Update Existing</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="ovalimage  animate__animated  animate__fadeIn" src={Images.home.oval} alt="" />
    </>
  );
}
