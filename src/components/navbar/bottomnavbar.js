import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export function Bottomnav() {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="bottomnav">
      <div
        onClick={() => navigate('/')}
        className={location.pathname == '/' ? 'selectedrt' : 'notselectedrt'}
      >
        <HomeOutlinedIcon style={{ fontSize: '20px' }} />
        Home
      </div>
      <div
        onClick={() => navigate(`/completed/${user?._id}`)}
        className={
          location.pathname == `/completed/${user._id}`
            ? 'selectedrt'
            : 'notselectedrt'
        }
      >
        <EmojiEventsOutlinedIcon style={{ fontSize: '20px' }} />
        My Matches
      </div>
      <div
        onClick={() => navigate('/gamizocoins')}
        className={
          location.pathname === '/gamizocoins' ? 'selectedrt' : 'notselectedrt'
        }
      >
        <FeedOutlinedIcon style={{ fontSize: '20px' }} />
        GamizoCoins
      </div>
      <div
        onClick={() => navigate('/referwin')}
        className={
          location.pathname === '/referwin' ? 'selectedrt' : 'notselectedrt'
        }
      >
        <GroupsOutlinedIcon style={{ fontSize: '20px' }} />
        Refer & Win
      </div>
      <div
        onClick={() => navigate('/games')}
        className={location.pathname === '/games' ? 'selectedrt' : 'notselectedrt'}
      >
        <MoreHorizOutlinedIcon style={{ fontSize: '20px' }} />
        Games
      </div>
    </div>
  );
}

export default Bottomnav;
