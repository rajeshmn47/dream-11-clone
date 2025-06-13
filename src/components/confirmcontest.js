import styled from '@emotion/styled';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Dialog } from '@mui/material';
import * as React from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Main = styled.div`
  width: 320px;
  min-height: 420px;
  padding: 24px 20px 20px 20px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(44, 62, 80, 0.1);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 6px 0;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #f0f0f0;
  margin: 8px 0;
`;

const JoinButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #1fa951 60%, #1fa9a5 100%);
  color: #fff;
  border: none;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
  letter-spacing: 1px;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1fa951 40%, #1fa9a5 100%);
  }
`;

const Para = styled.p`
  text-align: center;
  font-size: 11px;
  color: #888;
  margin: 10px 0 0 0;
  line-height: 1.5;
`;
export default function ConfirmModal({
  open,
  setOpen,
  handleclose,
  modal,
  teamid,
  id,
  contestid,
  loadjoined,
  setSelectedTeam,
}) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const alert = useAlert();
  const handleClose = () => {
    handleclose();
    setOpen(false);
  };
  const join = async () => {
    try {
      const data = await API.get(
        `${URL}/joincontest/${modal._id}?teamid=${teamid}`,
      );
      alert.success('joined contest successfully');
      loadjoined();
      setSelectedTeam(null);
      setOpen(false);
    } catch (e) {
      alert.error(e.response.data.message);
      setOpen(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      PaperProps={{
        style: {
          background: 'rgba(0,0,0,0.08)',
          boxShadow: 'none',
        },
      }}
    >
      {modal && (
        <Main>
          <FlexBox>
            <h4
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: 18,
                color: '#222',
              }}
            >
              Confirm Entry
            </h4>
            <CloseRoundedIcon
              onClick={handleClose}
              style={{
                cursor: 'pointer',
                color: '#888',
                fontSize: 24,
              }}
              aria-label="Close"
              tabIndex={0}
              role="button"
            />
          </FlexBox>
          <Divider />
          <FlexBox>
            <span style={{ color: '#555' }}>Entry</span>
            <span style={{ fontWeight: 600, color: '#1976d2' }}>
              {modal.price / modal.totalSpots}
            </span>
          </FlexBox>
          <FlexBox>
            <span style={{ color: '#555' }}>Apply 25 coupon</span>
            <span style={{ color: '#1976d2' }}>25%</span>
          </FlexBox>
          <FlexBox>
            <span style={{ color: '#555' }}>Usable cash bonus</span>
            <span style={{ color: '#1976d2' }}>0</span>
          </FlexBox>
          <Divider />
          <FlexBox>
            <span style={{ fontWeight: 700, fontSize: 17, color: '#1fa951' }}>
              To Pay
            </span>
            <span style={{ fontWeight: 700, fontSize: 17, color: '#1fa951' }}>
              {modal.price / modal.totalSpots}
            </span>
          </FlexBox>
          <Para>
            By joining this contest, you accept Dream11 T&C's and confirm that
            you are not resident of Andhra Pradesh, Assam, Nagaland, Odisha,
            Sikkim or Telangana. I also agree to be contacted by Dream11 and
            their partners.
          </Para>
          <JoinButton onClick={join}>Join Contest</JoinButton>
        </Main>
      )}
    </Dialog>
  );
}
