import React, { useState, useReducer, useEffect } from "react";
import Images from "../images/imagejson";
// import "./custom.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { faWarning, faEye } from "@fortawesome/free-solid-svg-icons";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PropTypes from "prop-types";
import axios from "axios";
let rendercount = 1;
let screendetail = {}
let combodic = {}
export default function WebFormDetails(props) {


  let [first, setfirst] = useState(0)

  var combodic = {}
  const preview = async () => {
    let screenDetail = {}
    screenDetail['title'] = document.getElementById("title").value;
    if (txtlst.length !== 0) {
      screenDetail['TextBoxes'] = txtlst;
    }
    if (btnlst.length !== 0) {
      screenDetail['BUTTONS'] = btnlst;
    }
    if (checklst.length !== 0) {
      screenDetail['CheckBoxes'] = checklst;
    }
    if (cmbolst.length !== 0) {
      // let dic = {}
      // console.log(combolst)
      // if (sessionStorage.getItem("Screen"+rendercount.toString()+"Combo") !== undefined) {

      //   console.log(combolst)
      //   combolst.map(function (val, index) {
      //     console.log(Object.values(combolst[index]))
      //     dic[Object.keys(combolst[index]).toString()] = Object.values(combolst[index])
      //     console.log(Object.values(combolst[index]))
      //     console.log();
      //     if (typeof dic[Object.keys(combolst[index]).toString()][0] !== "string") {
      //       dic[Object.keys(combolst[index]).toString()] = dic[Object.keys(combolst[index]).toString()][0]

      //     } 
      //   })
      //   screenDetail['comboboxes'] = dic
      //   console.log(screenDetail)
      // }
      if (sessionStorage.getItem("Screen" + rendercount.toString() + "Combo") != undefined) {

        screenDetail['ComboBoxes'] = JSON.parse(sessionStorage.getItem("Screen" + rendercount.toString() + "Combo"));
      }
      console.log(combolst)
      console.log(screenDetail)



    }
    if (datepcklst.length !== 0) {
      screenDetail['DatePicker'] = datepcklst;

    }
    if (rdiolst.length !== 0) {
      screenDetail['RadioButton'] = rdiolst;
    }
    console.log(screenDetail)
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/onescreengenrate/",
      data: { "onescreen": screenDetail }
    }).then((response) => {
      console.log(response);
    });

  }
  let screenJson = JSON.parse(sessionStorage["Screen Details"])
  console.log(screenJson)
  let [dupcount, setdupcount] = useState(2)

  useEffect(() => {
    let element = document.getElementById("comboitems1");

    var clone = element.cloneNode(true); // "deep" clone
    let input = clone.getElementsByTagName("input")[0];
    let label = clone.getElementsByTagName("label")[0];
    label.innerHTML = "Option" + dupcount
    input.setAttribute('id', 'option' + dupcount);
    clone.id = "comboitem" + dupcount; // there can only be one element with an ID
    // event handlers are not cloned
    element.parentNode.appendChild(clone)


  }, [dupcount])
  useEffect(() => {

    if (first !== 0) {
      console.log("here")
      let element = document.getElementsByClassName('comboinput');
      let title = document.getElementsByClassName('combotitle')[0].value;
      console.log(title)
      let lst = []
      for (let i = 0; i < element.length; i++) {
        if (element[i].value !== "") {

          lst.push(element[i].value);
        }
      }
      console.log(title)
      if (title !== "") {

        console.log(combodic);
        if (sessionStorage["Screen" + rendercount.toString() + "Combo"] === undefined) {
          sessionStorage.setItem("Screen" + rendercount.toString() + "Combo", '{}')
          let combodic = {}
          combodic[title] = lst;

          sessionStorage["Screen" + rendercount.toString() + "Combo"] = JSON.stringify(combodic)
        }
        else {
          let combodic = JSON.parse(sessionStorage.getItem("Screen" + rendercount.toString() + "Combo"))
          combodic[title] = lst
          sessionStorage["Screen" + rendercount.toString() + "Combo"] = JSON.stringify(combodic)

        }

        console.log(combodic)
        document.getElementById("modalbox").style.display = "none"
        comboCount(combocount + 1)
        setComboLst(combolst)
        combolst.push(title)
      }

    }

  }, [first])



  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  var contdata = JSON.parse(JSON.parse(sessionStorage['contolsdata']))
  // var contdata = require("./control.json");
  console.log(contdata)
  var scrdata = JSON.parse(JSON.parse(sessionStorage['processdata']))
  // var scrdata = require("./json.json"); 
  console.log(scrdata)

  let btnobj = scrdata["BUTTONS"]["Screen".concat(rendercount)];

  let navigate = useNavigate();
  try {
    var textlst =
      contdata["Screen".concat(rendercount).toString()]["TextBoxes"] !== undefined
        ? contdata["Screen".concat(rendercount).toString()]["TextBoxes"]
        : [];
    var chklst =
      contdata["Screen".concat(rendercount).toString()]["CheckBoxes"] !==
        undefined
        ? contdata["Screen".concat(rendercount).toString()]["CheckBoxes"]
        : [];
    var combolst =
      contdata["Screen".concat(rendercount).toString()]["ComboBoxes"] !==
        undefined
        ? contdata["Screen".concat(rendercount).toString()]["ComboBoxes"]
        : [];
    var radiolst =
      contdata["Screen".concat(rendercount).toString()]["RadioButtons"] !==
        undefined
        ? contdata["Screen".concat(rendercount).toString()]["RadioButtons"]
        : [];
    var buttonlst =
      scrdata["BUTTONS"]["Screen".concat(rendercount)] !== undefined
        ? scrdata["BUTTONS"]["Screen".concat(rendercount)]
        : [];
    var datepicker =
      contdata["Screen".concat(rendercount).toString()]["DatePicker"] !== undefined
        ? contdata["Screen".concat(rendercount).toString()]["DatePicker"]
        : [];
  }
  catch {
    var textlst = [];
    var chklst = [];
    var combolst = [];
    var radiolst = [];
    var buttonlst = [];
    var datepicker = [];
  }



  let settitle = screenJson["Screen".concat(rendercount.toString())]
  var scrcontroldata = contdata["Screen".concat(rendercount).toString()];
  let [txtlst, setTxtLst] = useState([]);
  let [btnlst, setBtnLst] = useState([]);
  let [datepcklst, setDatePcklst] = useState([]);
  let [checklst, setChkLst] = useState([]);
  let [cmbolst, setComboLst] = useState([]);
  let [rdiolst, setRadioLst] = useState([]);
  let [data, setData] = useState('');

  let handleButtonText = (lst, e, index) => {

    lst[index] = e.target.value
    console.log(lst)

  }


  useEffect(() => {

    if (contdata["Screen".concat(rendercount).toString()] != undefined) {
      Object.keys(scrcontroldata).forEach(function (key) {
        if (key == "TextBoxes") {
          for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
            txtlst.push(Object.values(scrcontroldata[key])[i]);
          }
        } else if (key == "CheckBoxes") {
          for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
            // checkCount(chkcount+1)
            checklst.push(Object.values(scrcontroldata[key])[i]);
          }
        } else if (key == "ComboBoxes") {
          for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
            // comboCount(combocount+1)
            cmbolst.push(Object.values(scrcontroldata[key])[i]);
            if (sessionStorage["Screen" + rendercount.toString() + "Combo"] === undefined) {
              sessionStorage.setItem("Screen" + rendercount.toString() + "Combo", '{}')
              //
              let dic = {}
              if (sessionStorage.getItem("Screen" + rendercount.toString() + "Combo") !== undefined) {

                console.log(combolst)
                combolst.map(function (val, index) {
                  console.log(Object.values(combolst[index]))
                  dic[Object.keys(combolst[index]).toString()] = Object.values(combolst[index])
                  console.log(Object.values(combolst[index]))
                  console.log();
                  if (typeof dic[Object.keys(combolst[index]).toString()][0] !== "string") {
                    dic[Object.keys(combolst[index]).toString()] = dic[Object.keys(combolst[index]).toString()][0]

                  }
                })
               
              }
              //

              sessionStorage["Screen" + rendercount.toString() + "Combo"] = JSON.stringify(dic)
            }
          }
        } else if (key == "RadioButton") {
          for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
            // radioCount(radiocount+1)
            rdiolst.push(Object.values(scrcontroldata[key])[i]);
          }

        }
        else if (key == "DatePicker") {
          for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
            // radioCount(radiocount+1)
            datepcklst.push(Object.values(scrcontroldata[key])[i]);
          }
        }
      });
    }



    if (buttonlst !== undefined) {
      setBtnLst(buttonlst);
    }
    combodic = {}

  }, [rendercount]);
  const back = () => {
    navigate("/newform");
  };

  const handletxtChange = (event) => {
    textCount(txtcount);
    textCount(event.target.value);
  };
  function confirmNextScreen() {
    let screenDetail = {}
    screenDetail['title'] = document.getElementById("title").value;
    if (txtlst.length !== 0) {
      screenDetail['TextBoxes'] = txtlst;
    }
    if (btnlst.length !== 0) {
      screenDetail['BUTTONS'] = btnlst;
    }
    if (checklst.length !== 0) {
      screenDetail['CheckBoxes'] = checklst;
    }
    if (cmbolst.length !== 0) {
      if (sessionStorage.getItem("Screen" + rendercount.toString() + "Combo") != undefined) {

        screenDetail['ComboBoxes'] = JSON.parse(sessionStorage.getItem("Screen" + rendercount.toString() + "Combo"));
      }
    }
    if (datepcklst.length !== 0) {
      screenDetail['DatePicker'] = datepcklst;

    }
    if (rdiolst.length !== 0) {
      screenDetail['RadioButton'] = rdiolst;
    }
    console.log(screenDetail)
    setTxtLst([])
    setBtnLst([])
    screendetail["Screen".concat(rendercount.toString())] = screenDetail
    if (rendercount < parseInt(sessionStorage['No Of Screen'])) {
      rendercount = rendercount + 1;

      setTxtLst([]);
      setComboLst([])
      setBtnLst([])
      setChkLst([])
      setRadioLst([]);
      setDatePcklst([]);
      forceUpdate();
    } else {
      if(sessionStorage['projectID'] != undefined)
      {
        screenDetail['projectID'] = sessionStorage['projectID'];
      }
      sessionStorage.setItem("Screen Details", JSON.stringify(screendetail));
      sessionStorage.setItem("contolsdata", JSON.stringify(contdata));

      newscreen();
      navigate(`/progress`);
    }
  }

  const newscreen = async () => {
    if(sessionStorage['projectID'] === undefined)
    {
      var data = { "screendetails": JSON.parse(sessionStorage['Screen Details'])}

    }
    else{
      var data = {
        "screendetails": JSON.parse(sessionStorage['Screen Details']), 'projectID': parseInt(sessionStorage['projectID'])}
    }
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/wireframe/",
     
      data: data,
    }).then((response) => {
      console.log(response);
    });

  }

  function handleClick() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui shadow-lg p-3 mb-5 bg-white rounded'>
            <div className="row">
              <div className="col-md-2">


                <FontAwesomeIcon className="warningicon" icon={faWarning} />
              </div>
              <div className="col-md-10 msgcontent">

                <h1>Are you Sure about screen details?</h1>
                <p className="pmsg">You cant change the title of screens in next steps. <br /> Please make sure your screen titles.</p>

              </div>
              <div className="buttonsec">
                <button className="btn btn-primary btn-sm msgbtn" onClick={onClose}>No</button>
                <button className="btn btn-primary btn-sm msgbtn"
                  onClick={() => {
                    confirmNextScreen()
                    onClose();
                  }}
                >
                  Yes, Continue!
                </button>
              </div>

            </div>

          </div>
        );
      }
    });


  }

  const handleSelect = () => {
    let elem = document.getElementById("modalbox");
    let lst = elem.getElementsByTagName('input');
    for (let i = 0; i < lst.length; i++) {
      lst[i].value = "";
    }
    elem.style.display = "block";


  }


  const [txtcount, textCount] = useState(textlst.length);
  const [chkcount, checkCount] = useState(chklst.length);
  const [combocount, comboCount] = useState(combolst.length);
  const [btncount, btnCount] = useState(buttonlst.length);

  let [datecount, dateCount] = useState(datepcklst.length);
  datecount = datepcklst.length

  const [radiocount, radioCount] = useState(radiolst.length);


  return (
    <>
      <div id="modalbox" className="card modalbox shadow-lg ">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-3">
              <h4 className="text-center">ComboBox Details</h4>
              <input className="form-control mt-3 mb-3 combotitle" placeholder="Give Title of new Combo Boxes" type="text" />
            </div>
            <div id="comboitems1" className="col-md-12"
              h1>
              <div className="col-md-8">
                <div class="input-group input-group-sm mb-3">
                  <label className="form-label">Option 1</label>

                  <input id="option1" type="text" class="form-control mx-3 comboinput" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                  <button onClick={() => {
                    setdupcount(dupcount + 1)
                  }} className="btn btn-primary addoption">+</button>
                </div>
              </div>
            </div>

          </div>


        </div>
        <div className="buttongroup">
          <button className="btn btn-outline-primary" onClick={() => {
            document.getElementById("modalbox").style.display = "none"

          }}>Close</button>
          <button className="btn btn-primary" onClick={() => {
            setfirst(first + 1)
          }}>Save Changes</button>
        </div>
      </div>
      <Navbar title="PRO-VISION" profileID={1426363} user="Kevin Smith" />
      <div className="container webformcontainer">
        <h2 className="h2headingplan text-center">
          <span className="fontblue">Digital is new Default.</span> Every thing
          happens on screen
        </h2>
        <div className="inner text-left">
          <div className="row">
            <div className="col-md-2">
              <div className="flex">
                <img src={Images.home.leftimage} alt="" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="relativerectangle">
                <div className="mainformcard rounded-left shadow-lg card px-0 pt-4 pb-0 mt-3 mb-3">
                  <div className="innerform">
                    {/* form start */}
                    <div className="innerformcomp1 tilescreen">
                      <h5 className="h5form1 scrtitlehead">
                        Screen Title {rendercount}
                      </h5>
                      <input
                        className="shadow p-3 form-control scrititle"
                        type="text"
                        id="title"
                        value={settitle}
                        placeholder="Default input"
                      />
                    </div>
                    <div className="innerformcomp1">
                      <div className="controlsection">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                TextBoxes
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {txtcount == 0
                                  ? textlst.map((textlst, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"


                                        aria-label=".form-control-sm example"
                                        defaultValue={textlst}
                                      />
                                    </li>
                                  ))
                                  : txtlst.map((txtindex, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        onChange={e => handleButtonText(txtlst, e, index)}
                                        aria-label=".form-control-sm example"
                                        defaultValue={txtindex}
                                      />
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  textCount(txtcount - 1);
                                  txtlst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  txtcount == 0

                                    ? (contdata.Screen + rendercount.toString().TextBoxes == undefined ? contdata.Screen + rendercount.toString().TextBoxes.length : 0)
                                    : txtlst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  textCount(txtcount + 1);
                                  txtlst.push("textbox");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                ComboBoxes
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {combocount == 0
                                  ? combolst.map((combolst, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        aria-label=".form-control-sm example"
                                        defaultValue={Object.keys(combolst)[index].toString() + "herre"}
                                      />
                                    </li>
                                  ))
                                  : combolst.map((combolst, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        // onChange={e => handleButtonText(cmbolst, e, index)}

                                        aria-label=".form-control-sm example"
                                        defaultValue={Object.keys(combolst)[index].toString()}
                                      />



                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                data-control="combo"
                                className="minus controlcc"
                                onClick={() => {
                                  comboCount(cmbolst - 1);
                                  cmbolst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  combocount == 0
                                    ? (contdata.Screen + rendercount.toString().ComboBoxes == undefined ? contdata.Screen + rendercount.toString().ComboBoxes.length : 0)
                                    : cmbolst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                class="plus controlcc"
                                onClick={(e) => handleSelect(e)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                CheckBoxes
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {chkcount == 0
                                  ? chklst.map((chklst, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        aria-label=".form-control-sm example"
                                        defaultValue={chklst}
                                      />
                                    </li>
                                  ))
                                  : checklst.map((checkindex, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        onChange={e => handleButtonText(checklst, e, index)}

                                        aria-label=".form-control-sm example"
                                        defaultValue={checkindex}
                                      />
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  checkCount(chkcount - 1);
                                  checklst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  chkcount == 0
                                    ? (contdata.Screen + rendercount.toString().CheckBoxes == undefined ? contdata.Screen + rendercount.toString().CheckBoxes.length : 0)

                                    : checklst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  checkCount(chkcount + 1);
                                  checklst.push("checkbox");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                RadioButtons
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {radiocount == 0
                                  ? radiolst.map((radiolst, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        aria-label=".form-control-sm example"
                                        defaultValue={radiolst}
                                      />
                                    </li>
                                  ))
                                  : rdiolst.map((radioindex, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        onChange={e => handleButtonText(rdiolst, e, index)}
                                        aria-label=".form-control-sm example"
                                        defaultValue={radioindex}
                                      />
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  radioCount(radiocount - 1);
                                  rdiolst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  radiocount == 0
                                    ? (contdata.Screen + rendercount.toString().RadioButtons == undefined ? contdata.Screen + rendercount.toString().RadioButtons.length : 0)

                                    : rdiolst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  radioCount(radiocount + 1);
                                  rdiolst.push("radiobox");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Buttons
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {btncount == 0

                                  ? buttonlst.map((btnlst, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        id={index}

                                        aria-label=".form-control-sm example"
                                        defaultValue={btnlst}
                                      />
                                    </li>
                                  ))
                                  : btnlst.map((btnindex, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        // onKeyPress={handleInputChange}
                                        id={"btnlst".concat(index.toString())}
                                        onChange={e => handleButtonText(btnlst, e, index)}

                                        aria-label=".form-control-sm example"
                                        defaultValue={btnindex}
                                      />
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  btnCount(btncount - 1);
                                  btnlst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  btncount == 0
                                    ? (scrdata["BUTTONS"]["Screen" + rendercount.toString()] == undefined ? scrdata["BUTTONS"]["Screen" + rendercount.toString()] : 0)

                                    : btnlst.length

                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  btnCount(btncount + 1);
                                  btnlst.push("button");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                DatePicker
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {datecount == 0
                                  ? datepicker.map((datepicker, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        aria-label=".form-control-sm example"
                                        defaultValue={datepicker}
                                      />
                                    </li>
                                  ))
                                  : datepcklst.map((dateindex, index) => (
                                    <li>
                                      <input
                                        className="dropdown-item form-control form-control-sm"
                                        type="text"
                                        onChange={e => handleButtonText(datepcklst, e, index)}

                                        aria-label=".form-control-sm example"
                                        defaultValue={dateindex}
                                      />
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  checkCount(datecount - 1);
                                  datepcklst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  datecount == 0
                                    ? (contdata.Screen + rendercount.toString().DatePicker == undefined ? contdata.Screen + rendercount.toString().DatePicker.length : 0)

                                    : datepcklst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  dateCount(datecount + 1);
                                  datepcklst.push("datepicker");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-md-3">
              <div className="flex">
                <img src={Images.home.rightimage} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="buttongroups">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">

                  <button className="btn btn-dark w-100 hover" onClick={preview}>
                    <FontAwesomeIcon className="eyeicon" icon={faEye} />Preview</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    onClick={back}
                    className="btn btn-outline-primary"
                  >
                    Back
                  </button>
                </div>

                <div className="col-md-6">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="btn btn-primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="cloud" src={Images.home.cloud} alt="" />
    </>
  );
}
WebFormDetails.propTypes = {
  count: PropTypes.number,
};
WebFormDetails.defaultProps = {
  count: 0,
};
