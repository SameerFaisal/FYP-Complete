import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import PropTypes from "prop-types";

export default function UpdateLoader(props) {
    let navigate = useNavigate();
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        getControls()
    }, [])

    const getControls = async () => {
        let response = await axios.get('/api/controls/'+props.id)
            .catch(function (error) {
                getControls();
            });
        if (response != undefined) {
            sessionStorage.setItem("contolsdata", JSON.stringify(response.data));
        }



    }
    const getData = async () => {
        let response = await axios.get('/api/screens/'+props.id)
            .catch(function (error) {
                getData();

            });
        if (response != undefined) {
            sessionStorage.setItem("processdata", JSON.stringify(response.data));
            navigate('/webform')

        }



    }


    return (
        <div className="verticallycenter d-flex flex-column  justify-content-center align-items-center">

            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div className="message">
                Processing the UserStory....
            </div>

        </div>

    )
}

UpdateLoader.propTypes = {
    id: PropTypes.number,
 
  };