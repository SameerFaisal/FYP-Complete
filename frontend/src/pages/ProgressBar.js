import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Images from "../images/imagejson";
import axios from 'axios';


function ProgressBar() {
    // let navigate = useNavigate();
    // useEffect(() => {
    
    //     getData()
    // }, [])
    // useEffect(() => {
    
    //     getControls()
    // }, [])

    // const getControls = async () => {
    //     let response = await axios.get('/api/getcontrols')
    //         .catch(function (error) {

    //             getControls();

    //         });
    //     if (response != undefined) {
    //         sessionStorage.setItem("contolsdata", JSON.stringify(response.data));
            

    //     }



    // }
    // const getData = async () => {
    //     let response = await axios.get('/api/get')
    //         .catch(function (error) {

    //             getData();

    //         });
    //     if (response != undefined) {
    //         sessionStorage.setItem("processdata", JSON.stringify(response.data));
    //         navigate('/webform')

    //     }



    // }


    return (
        <div className="verticallycenter d-flex flex-column  justify-content-center align-items-center">

           <div className="loadercard card">
               <div className="flex justify-content-center align-items-center">
                   <h4>ProtoType Loading</h4>
                   <img src={Images.loader.bar} alt="" />
                   <span>Processing</span>
               </div>
           </div>

        </div>

    )
}

export default ProgressBar