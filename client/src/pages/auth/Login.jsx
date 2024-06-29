import React from 'react'
import CustomInput from '../../components/input/CustomInput'
import LoginCard from '../../components/card/LoginCard'

function Login() {
  return (
    <div>
        
        <div className="row d-flex login-bdy justify-content-center align-items-center  ">

            <div className="col-lg-4" style={{ height:'50%'}}>
                <LoginCard/>
            </div>
        </div>
    </div>
  )
}

export default Login