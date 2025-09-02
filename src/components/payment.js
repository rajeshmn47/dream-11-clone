import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../actions/userAction";
import { URL } from "../constants/userConstants";
import Navbar from "./navbar";
import Bottomnav from "./navbar/bottomnavbar";

const PageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f9fafb;
  min-height: 100vh;
  padding: 20px;
`;

function Payment() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  async function handlePayment(e) {
    e.preventDefault();
    const API_URL = `${URL}/payment/createpayment/${amount}`;
    const response = await API.get(API_URL);
    const { data } = response;

    const options = {
      key: "rzp_test_3FLuLisPuowtZP",
      name: "RazorPay",
      description: "Secure Payment Gateway",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${URL}/payment/capture/${paymentId}/${amount}`;
          const captureResponse = await API.post(url, {});
          const successObj = JSON.parse(captureResponse.data);
          if (successObj.captured) {
            console.log("Payment success ✅");
          }
        } catch (err) {
          console.error(err);
        } finally {
          handleData();
          navigate("/");
        }
      },
      theme: { color: "#24b937" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const data = { id: user._id, amount };

  const handleData = () => {
    const config = {
      method: "patch",
      url: `${URL}/payment/addamount/`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    };
    API(config).catch((error) => console.error(error.response?.data));
  };

  return (
    <div>
      <Navbar />
      <PageWrapper>
        <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3, boxShadow: 5 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Add Amount
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Enter the amount you want to add to your wallet and proceed securely
              via Razorpay.
            </Typography>

            <form onSubmit={handlePayment}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                margin="normal"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                size="large"
                sx={{ mt: 2, borderRadius: 2, py: 1.5 }}
                style={{
                  marginTop: 18,
                  fontSize: 16,
                  borderRadius: 8,
                  fontWeight: 700,
                  width: "100%",
                  background: "var(--red)",
                  color: "#fff"
                }}
              >
                Pay Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </PageWrapper>
      <Bottomnav />
    </div>
  );
}

export default Payment;

