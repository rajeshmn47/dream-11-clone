import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import './home.css'
import Steppr from './stepper'

export const Home=()=>{
    return(
        <>
           <div className='logintopbar'>
       <EmojiEventsOutlinedIcon style={{marginRight:'1vw'}}/> 
Dream 11
        </div>
        <div className='stepper'>
        <Steppr/>
            </div>
        <div className='hometop'>
        <div className='hometopicon selectgame'>
            <SportsCricketIcon style={{color:'#C41E22'}}/>
            <h5>Cricket</h5>
            </div>
            <div className='hometopicon'>
            <SportsSoccerIcon/>
            <h5>Football</h5>
            </div>
            <div className='hometopicon'>
            <SportsBasketballIcon />
            <h5>Basketball</h5>
            </div>
            <div className='hometopicon'>
            <SportsHockeyIcon />
            <h5>Hockey</h5>
            </div>
        </div>
  
        </>
    )
}

export default Home