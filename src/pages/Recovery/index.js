import React from "react"
import './styles.scss';
import  AuthWrapper from '../../components/AuthWrapper'
import Button from "../../components/forms/Button"
import FormInput from "../../components/forms/FormInput"
import EmailPassword from "../../components/EmailPassword"


const Recovery = (props) => {

    return(
        <div className="main">
            <EmailPassword/>
            
        </div>
    )
}

export default Recovery;