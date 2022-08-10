import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import Navbar from "../components/Navbar";
import Images from "../images/imagejson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery';
import axios from 'axios';


import { Link } from "react-router-dom";

export default function UpdateExisting(props) {
  let [projects, projectState] = useState([]);
  let [title, setTitle] =  useState("")
  let [customer, setCustomer] =  useState("Hamdan")
  let [noofscreen, setNoofScreens] = useState("")
  let [projectID,setProjectID] = useState(0)
  let [date, setDate] = useState("")
  let navigate = useNavigate();


  useEffect(() => {
    getProjects();
  }, []);
  const getControls = async () => {
    sessionStorage["projectID"] = projectID;
    let response = await axios.get('/api/controls/'+projectID.toString())
        .catch(function (error) {

            getControls();

        });
    if (response != undefined) {
        sessionStorage.setItem("contolsdata", JSON.stringify(response.data));
        getData()
        

    }



}
const getData = async () => {
    let response = await axios.get('/api/screens/'+projectID.toString())
        .catch(function (error) {
            getData();
        });
    if (response != undefined) {
        sessionStorage.setItem("processdata", JSON.stringify(response.data));
        navigate('/webform');
    }



}

  let getProjects = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/projects/");
    let projects = await response.json();
    console.log(projects);
    projectState(projects);
  };
  $(document).ready(function() {
    $('.projectli').click(function(){
      var id = $(this).data('id');
      setTitle(projects[id]['projectTitle']);
      setDate(projects[id]['projectDate'])
      setProjectID(projects[id]['id'])

    })
  })
  console.log(projects);
  return (
    <>
      <Navbar title="PRO-VISION" profileID={1426363} user="Kevin Smith" />
      <img className="cloud" src={Images.home.cloud} alt="" />
      <div className="d-flex fullheight">
        <div class="d-flex flex-column flex-shrink-0 p-3 sidebar">
          <div className="whitesidebar fullheight">
            <div className="d-flex">
              <FontAwesomeIcon
                className="desktopicon"
                icon={faDesktop}
              ></FontAwesomeIcon>{" "}
              <h5>Project</h5>
            </div>
            <ul className="projectul">
              {projects.map((projects, index) => (
                <li>
                  <span className="projectli"  data-id={index}>{projects.projectTitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div class="d-flex w-100 greyback">
          <div className="container">
            <h2>{title}</h2>

            <div className="card updateprojectcard">
              <div className="row">
                <div className="col-md-6">
                  <label className="paralabel" for="">
                    Project Title: 
                  </label>
                  <span className="updatepara">{title}</span>
                </div>
                <div className="col-md-6">
                  <label className="paralabel" for="">
                    Customer Name:
                  </label>
                  <span className="updatepara">{customer}</span>
                </div>
                <hr />
                <div className="col-md-6">
                  <label className="paralabel" for="">
                    No of Screens:
                  </label>
                  <span className="updatepara">{noofscreen}</span>
                </div>
                <div className="col-md-6">
                  <label className="paralabel" for="">
                    Date Created:
                  </label>
                  <span className="updatepara">{date}</span>
                </div>
                <hr />

                <div className="spacebutton"></div>
                <div className="col-md-12">
                  <button onClick={getControls} className="btn btn-primary float-right">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
