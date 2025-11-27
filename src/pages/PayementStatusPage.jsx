import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useParams, useNavigate } from "react-router-dom";

const PaymentStatusPage = () => {
  const { orderId } = useParams(); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(
          `https://dream11-api.insenc.in/payment/status?orderId=${orderId}`
        );
        const data = await res.json();
        setPayment(data);
      } catch (err) {
        setPayment({ status: "failed", message: "Unable to fetch status" });
      }
      setLoading(false);
    }
    fetchStatus();
  }, [orderId]);

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <CircularProgress />
        <Typography mt={2} variant="h6">
          Checking Payment Status...
        </Typography>
      </Box>
    );
  }

  const isSuccess = payment.status === "success";
  const isFailed = payment.status === "failed";
  const isPending = payment.status === "pending";

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
    >
      <Card sx={{ maxWidth: 450, width: "100%", borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center" textAlign="center">
            {/* ICON BASED ON STATUS */}
            {isSuccess && (
              <CheckCircleIcon color="success" sx={{ fontSize: 70 }} />
            )}
            {isFailed && (
              <CancelIcon color="error" sx={{ fontSize: 70 }} />
            )}
            {isPending && (
              <HourglassBottomIcon color="warning" sx={{ fontSize: 70 }} />
            )}

            {/* TITLE */}
            <Typography variant="h5" fontWeight="bold">
              {isSuccess && "Payment Successful"}
              {isFailed && "Payment Failed"}
              {isPending && "Payment Pending"}
            </Typography>

            {/* MESSAGE */}
            <Typography variant="body1" color="text.secondary">
              {payment.message || ""}
            </Typography>

            {/* ORDER DETAILS */}
            <Box mt={2} width="100%">
              <Typography variant="subtitle2" color="text.secondary">
                Order ID:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {orderId}
              </Typography>

              <Typography variant="subtitle2" mt={1} color="text.secondary">
                Amount:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                ₹ {payment.amount || "--"}
              </Typography>
            </Box>

            {/* BUTTONS */}
            <Stack direction="row" spacing={2} mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
              >
                Go to Dashboard
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => window.location.reload()}
              >
                Refresh Status
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentStatusPage;
