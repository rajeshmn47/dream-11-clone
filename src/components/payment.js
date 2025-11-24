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
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  async function handlePayment(e) {
    e.preventDefault();

    try {
      // Create Paykuber payment request
      const response = await API.post(`${URL}/payment/create`, {
        userId: user._id,
        amount,
      });

      if (!response.data.paymentLink) {
        alert("Unable to generate payment link");
        return;
      }

      // Redirect to payment page
      window.location.href = response.data.paymentLink;

    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment creation failed");
    }
  }

  return (
    <div>
      <Navbar />
      <PageWrapper>
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 3,
            boxShadow: 5,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Add Amount
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Enter the amount you want to add to your wallet.
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
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 700,
                  backgroundColor: "var(--red)",
                  color: "#fff",
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

