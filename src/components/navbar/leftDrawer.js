import styled from '@emotion/styled';
import { BoyOutlined } from '@mui/icons-material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../actions/userAction';

const Container = styled.div`
  .MuiTypography-body1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: var(--black);
  }
`;

export const MenuContainer = styled.div`
  background: var(--black);
  border-radius: 6.92308px;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

export const FeedContainer = styled.div`
  background: #3549ff;
  border-radius: 3.75px;
  border-radius: 6.92308px;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Border = styled.div`
  margin-top: 20px;
  border-bottom: 0.5625px solid #c6c6c6;
  height: 0;
`;

export const IconsContainer = styled.div`
  background: #ffffff;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 3px -22.5px 36px rgba(51, 51, 51, 0.1);
`;

export const IconContainer = styled.div`
  background: #f4f8f9;
  border-radius: 3.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 40px;
  height: 40px;
  margin: 5px 0;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

const NewsOrg = styled.img`
  width: 100px;
  margin: 20px 0;
`;

const Category = styled.h3`
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 15px;

  /* identical to box height, or 83% */

  color: var(--black);
  padding-left: 20px;
`;

const ListI = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: center;
  border-bottom:1px solid #fafafa;
  background-color: #ffffff;
  box-shadow:0 0 4px #e0e0e0;
  margin:10px 10px;
  border-radius: 15px;
svg{
  color:#5a5a5a;
}
`;

const Account = styled.div`
  height: 60px;
  background-color: #c00;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DrawerContainer = styled.div`
  .MuiDrawer-paper {
    padding: 0px !important;
  }
  .MuiPaper-root {
    padding: 0 !important;
  }
`;

const Img = styled.img`
  height: 40px;
  display: block;
  margin-left: 10px;
`;

const Name = styled.h6`
  color: #ffffff;
`;
export default function LeftDrawer({
  leftOpen, setLeftOpen, open, setOpen,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user, isAuthenticated, loading, error,
  } = useSelector(
    (state) => state.user,
  );
  const toggleDrawer = () => (event) => {
    setLeftOpen(!leftOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  console.log(user, 'user');

  function ListA(anchor) {
    return (
      <Box
        sx={{ width: 250, cursor: 'pointer', backgroundColor: '#fafafa' }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Account>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ width: '100%', marginLefr: '0', marginTop: '0' }}
          >
            <Grid sm={3} xs={3}>
              <Img
                src={user?.image ? user?.image : 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'}
                alt=""
                style={{ borderRadius: '50%' }}
              />
            </Grid>
            <Grid sm={6} xs={6}>
              <Name>{user && user.username}</Name>
            </Grid>
            <Grid sm={3} xs={3}>
              <ChevronRightOutlinedIcon style={{ color: '#FFFFFF' }} />
            </Grid>
          </Grid>
        </Account>
        <Container>
          <ListI onClick={() => setOpen(true)}>
            <AccountBalanceWalletOutlinedIcon style={{ width: '60px' }} />
            {' '}
            My
            Balance
          </ListI>
          <ListI onClick={() => handleLogout()}>
            <LogoutIcon style={{ width: '60px' }} />
            {' '}
            Logout
          </ListI>
          <ListI onClick={() => navigate('/findpeople')}>
            <BoyOutlined style={{ width: '60px' }} />
            {' '}
            Find People
          </ListI>
          <ListI onClick={() => navigate('/my-info')}>
            <SettingsOutlinedIcon style={{ width: '60px' }} />
            My Info & Settings
          </ListI>
          <ListI onClick={() => navigate('/donate')}>
            <PaidOutlinedIcon style={{ width: '60px' }} />
            Donate
          </ListI>
          <ListI onClick={() => navigate('/termsAndConditions')}>
            <TopicOutlinedIcon style={{ width: '60px' }} />
            Terms & Conditions
          </ListI>
          <ListI onClick={() => navigate('/withdrawpolicy')}>
            <PaidOutlinedIcon style={{ width: '60px' }} />
            Withdrawal Policy
          </ListI>
          <ListI onClick={() => navigate('/privacyPolicy')}>
            <PrivacyTipOutlinedIcon style={{ width: '60px' }} />
            Privacy Policy
          </ListI>
          <ListI onClick={() => navigate('/refund')}>
            <AccountBalanceWalletOutlinedIcon style={{ width: '60px' }} />
            Refund Policy
          </ListI>
          {/* <ListI>
            <MoreHorizOutlinedIcon style={{ width: "60px" }} />
            More
          </ListI> */}
          <ListI onClick={() => navigate('/helpAndSupport')}>
            <HelpOutlineOutlinedIcon style={{ width: '60px' }} />
            Help & Support
          </ListI>
        </Container>
      </Box>
    );
  }

  return (
    <DrawerContainer>
      <Drawer
        open={leftOpen}
        onClose={toggleDrawer(false)}
        style={{ padding: '0 !important' }}
      >
        <ListA />
      </Drawer>
    </DrawerContainer>
  );
}
