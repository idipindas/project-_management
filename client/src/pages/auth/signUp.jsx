import React from 'react'
import CustomInput from '../../components/input/CustomInput'
import LoginCard from '../../components/card/LoginCard'
import SignupCard from '../../components/card/SignupCard'

function Signup() {
  return (
    <div>
        
        <div className="row d-flex login-bdy justify-content-center align-items-center  ">

            <div className="col-lg-4" style={{ height:'50%'}}>
                <SignupCard/>
            </div>
        </div>
    </div>
  )
}

export default Signup