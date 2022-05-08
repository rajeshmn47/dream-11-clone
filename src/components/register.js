import './register.css'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Register=()=>{
    return(
        <>
        <div className='registertopbar'>
       <ArrowBackIcon style={{marginRight:'2vw'}}/> 
register & play
        </div>

        <div className='register'>
<Paper style={{padding:'2vh 2vw',}}>
<TextField label="fullwidth" id="fullWidth"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
        label="fullwidth" id="fullWidth"
        defaultValue="Hello World"
        variant="standard"
      />
      <TextField
        label="fullwidth" id="fullWidth"
        defaultValue="Hello World"
        variant="standard"
      />
      <TextField
        label="fullwidth" id="fullWidth"
        defaultValue="Hello World"
        variant="standard"
        type='password'
      />
      <Button variant="contained" disableElevation style={{backgroundColor:'#24B937'}}>Register</Button>
      forgot password
</Paper>
<h5>Aleady a user?Log in</h5>
            </div>

        </>
    )
}

export default Register