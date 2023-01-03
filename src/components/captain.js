import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import './home.css'
import Steppr from './stepper'
import {useEffect,useState} from 'react'
import axios from 'axios'
import Bottomnav from './bottomnavbar'
import { SettingsApplicationsTwoTone } from '@mui/icons-material';
import { style } from '@mui/system';
import styled from '@emotion/styled';

const CaptainSelector=styled.div`
`
const Player=styled.div`
display:flex;
justify-content:space-evenly;
align-items:center;
margin:10px 0;
h1{
    font-size:16px;
    font-family:'Open Sans';
    width:100px;
    text-transform:capitalize;
}`

const CaptainC=styled.button`
border:2px solid #cccccc;
border-radius:50%;
background-color:#FFFFFF;
font-weight:700;
color:#cccccc;
width:30px;
font-size:16px;
height:30px;
display:flex;
justify-content:center;
align-items:center;
`

const ViceCaptain=styled.button`
border:2px solid #cccccc;
border-radius:50%;
background-color:#FFFFFF;
color:#cccccc;
font-weight:700;
font-size:16px;
width:30px;
height:30px;
display:flex;
justify-content:center;
align-items:center;
`
const Name=styled.div`
display:flex;
width:200px;
align-items:center;
img{
    width:50px !important;
    height:50px !important;
    border-radius:50%;
    margin-right:10px;
    object-fit:cover;
}
h1{
 white-space: nowrap;
}
`
export const Captain=({players})=>{
const [upcoming,setUpcoming]=useState([])
const[selectedPlayers,setSelectedPlayers]=useState([])
const [live,setLive]=useState([])
const [past,setPast]=useState([])
useEffect(()=>{
let pl = players.map(obj => ({ ...obj, isCaptain: false,isViceCaptain:false }))
setSelectedPlayers([...pl])
},[])
    return(
        <>
           <CaptainSelector>
            {selectedPlayers.map((p)=>
            <Player>
                <Name>
                    <img src={p.image} alt=''/>
<h1>
    {p.name.charAt(0).toUpperCase()+' '+p.lastname}
</h1>
</Name>
<CaptainC>
    c
</CaptainC>
<ViceCaptain>
    vc
</ViceCaptain>
            </Player>
            )}
           </CaptainSelector>
        </>
    )
}

export default Captain;