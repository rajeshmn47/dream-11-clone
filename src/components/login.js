import './register.css'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

export const Login=()=>{
    return(
        <>
        <div className='logintopbar'>
       <EmojiEventsOutlinedIcon style={{marginRight:'1vw'}}/> 
Dream 11
        </div>

        <div className='register'>
<Paper style={{padding:'2vh 2vw',}}>
    <h5>LOG IN & PLAY</h5>
    <div style={{display:'flex',width:'100%',justifyContent:'space-evenly'}}>
<Button variant="contained"  style={{backgroundColor:'#FFFFFF',color:'black',
width:'50%',marginRight:'1vw',}}
 >Facebook</Button>
<Button variant="contained" elevation='2' style={{backgroundColor:'#FFFFFF',
color:'black',width:'50%'}} >Google</Button>
</div>
<TextField  id="fullWidth"
          defaultValue="Hello World"
          variant="standard"
          placeholder='Email'
        />
     
      <TextField
         id="fullWidth"
        defaultValue="Hello World"
        variant="standard"
        type='password'
        placeholder='Password'
      />
      <Button className='itseveryday' variant="contained" disableElevation style={{backgroundColor:'#24B937'}}>Log in</Button>
      Forgot Password
</Paper>

            </div>

        </>
    )
}

export default Login