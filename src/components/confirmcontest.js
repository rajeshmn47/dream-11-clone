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
  width: 260px;
  height: 400px;
  padding: 0 5px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const JoinButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green);
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  margin: 0 auto;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const Para = styled.p`
  text-align: center;
  font-size: 10px;
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
      style={{ height: '400px' }}
    >
      {modal && (
        <Main>
          <FlexBox>
            <h5>Confirmation</h5>
            <h5>
              <CloseRoundedIcon
                onClick={() => handleClose()}
                style={{ cursor: 'pointer' }}
              />
            </h5>
          </FlexBox>
          <FlexBox>
            <h6>Entry</h6>
            <h6>{modal.price / modal.totalSpots}</h6>
          </FlexBox>
          <FlexBox>
            <h6>Apply 25 coupon</h6>
            <h6>25%</h6>
          </FlexBox>
          <FlexBox>
            <h6>usable cash bonus</h6>
            <h6>0</h6>
          </FlexBox>
          <FlexBox>
            <h3>To Pay</h3>
            <h3>{modal.price / modal.totalSpots}</h3>
          </FlexBox>

          <Para>
            By joining this contest, you accept Dream11 T&C's and confirm that
            you are not resident of Andhra Pradesh, Assam, Nagaland, Odisha,
            Sikkim or Telangana. I also agree to be contacted by Dream11 and
            their partners.
          </Para>
          <JoinButton onClick={() => join()}>join contest</JoinButton>
        </Main>
      )}
    </Dialog>
  );
}
