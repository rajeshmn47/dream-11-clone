import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Confirmation from "./Confirmation";
import { useNavigate } from 'react-router-dom';

import { API } from '../actions/userAction';
import { URL } from '../constants/userConstants';

const Wrapper = styled.div`
  font-family: system-ui !important;
  line-height: 1.2;
  background: #fff;
  margin-bottom: 20px;
  padding-top: 35px;
  padding-bottom: 39px;
  div {
    // border: 1px solid red;
  }
`;

const Logo = styled.div`
  left: -35px;
  width: 0px;
  height: 0px;
  background-color: #282c3f;
  box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
  top: -10px;
  padding: 0px !important;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #282c3f;
  text-align: center;
  margin-bottom: 5px;
`;

const Wallet = styled.img`
  height: 50px;
  width: 50px;
  vertical-align: inherit;
  box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
`;

const WarningText = styled.p`
  font-size: 13px;
  color: #93959f;
  margin-bottom: 8px;
  font-weight: 300;
  line-height: 16px;
  overflow: hidden;
  border: 1px dashed #60b246;
  padding-right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  margin-top: 50px;
`;

function Payment() {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState();
  const Total = 0;
  const cartItems = [];
  async function handlePayment(e) {
    // console.log(Total);
    e.preventDefault();
    const API_URL = `${URL}/payment/createpayment/${amount}`;
    const orderUrl = `${API_URL}order/${Total}`;
    const response = await API.get(API_URL);
    const { data } = response;
    console.log('rajesh');
    console.log(response);
    const options = {
      key: 'rzp_test_3FLuLisPuowtZP',
      name: 'RazorPay',
      description: 'Integration of Razorpay',
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${URL}/payment/capture/${paymentId}/${amount}`;
          const captureResponse = await API.post(url, {});
          const successObj = JSON.parse(captureResponse.data);
          const { captured } = successObj;
          if (captured) {
            console.log('success');
          }
        } catch (err) {
          console.log(err);
        } finally {
          handleData();
          navigate('/');
        }
      },
      theme: {
        color: '#e46d47',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  const data = {
    id: user._id,
    amount,
  };
  const handleData = () => {
    const config = {
      method: 'patch',
      url: `${URL}/payment/addamount/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    API(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <Container>
      <Title>Add Amount</Title>
      <TextField
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="amount to be added"
        size="small"
      />
      <button className="paybtn" onClick={handlePayment}>
        Pay
      </button>
    </Container>
  );
}

export default Payment;
