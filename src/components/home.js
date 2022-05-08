import {SportsCricketIcon,SportsSoccerIcon,SportsBasketballIcon,SportsHockeyIcon} from '@mui/icons-material';

export const Home=()=>{
    return(
        <>
        <div className='hometop'>
        <div className='hometopicon'>
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