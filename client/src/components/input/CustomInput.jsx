import React from 'react'
import TextField from '@mui/material/TextField';

function CustomInput({placeholder,className,onChange}) {
  return (
    <div>
      <TextField className={className} onChange={onChange} id="outlined-basic" label={placeholder} variant="outlined" fullWidth size='40' />

        
    </div>
  )
}

export default CustomInput