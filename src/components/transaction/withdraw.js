import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardContent, TextField, Typography, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { URL } from "../../constants/userConstants";
import { API } from "../../actions/userAction";

/* PAGE WRAPPER */
const PageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f9fafb;
  min-height: 100vh;
  padding: 20px;
`;

export default function Withdraw() {
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(true);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [hasBank, setHasBank] = React.useState(false);
  const [bankDetails, setBankDetails] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);

  /* 🔹 Step 1: Load bank details */
  React.useEffect(() => {
    if (user?._id) {
      if (user.accountNumber && user.ifsc) {
        setHasBank(true);
        setBankDetails({
          accountNumber: user.accountNumber,
          ifsc: user.ifsc,
          accountHolder: user.username || "",
        });
        setEditMode(false);
      } else {
        setHasBank(false);
      }
      setLoading(false);
    }
  }, [user]);

  /* 🔹 Validation Schemas */
  const bankSchema = Yup.object().shape({
    accountHolder: Yup.string().required("Account holder name is required"),
    accountNumber: Yup.string()
      .required("Account number is required")
      .min(8, "Invalid account number")
      .max(20, "Invalid account number"),
    ifsc: Yup.string()
      .required("IFSC code is required")
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format"),
  });

  const withdrawSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError("Enter valid amount")
      .required("Amount is required")
      .min(100, "Minimum withdrawal is ₹100"),
  });

  /* 🔹 React Hook Forms */
  const bankForm = useForm({
    resolver: yupResolver(bankSchema),
    defaultValues: bankDetails || {
      accountHolder: "",
      accountNumber: "",
      ifsc: "",
    },
  });

  const withdrawForm = useForm({ resolver: yupResolver(withdrawSchema) });

  /* 🔹 Save or Edit Bank Details */
  const saveBankDetails = async (data) => {
    setSubmitLoading(true);
    try {
      const res = await API.post(`${URL}/auth/save-bank`, {
        ...data,
        userId: user._id,
      });
      setHasBank(true);
      setBankDetails(res.data.data);
      setEditMode(false);
      alert.success(editMode ? "Bank details updated!" : "Bank details saved!");
    } catch (err) {
      console.error(err);
      alert.error("Failed to save bank details");
    } finally {
      setSubmitLoading(false);
    }
  };

  /* 🔹 Withdraw Money */
  const withdrawMoney = async (data) => {
    setSubmitLoading(true);
    try {
      await API.post(`${URL}/payment/withdraw`, {
        ...data,
        userId: user._id,
      });
      alert.success("Withdrawal request sent!");
    } catch (err) {
      console.error(err);
      alert.error("Failed to withdraw");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <CircularProgress />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3, boxShadow: 5, px: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {hasBank ? (editMode ? "Edit Bank Details" : "Withdraw Money") : "Add Bank Details"}
          </Typography>

          {/* 🔹 Bank Form (Add / Edit) */}
          {(editMode || !hasBank) && (
            <form onSubmit={bankForm.handleSubmit(saveBankDetails)} noValidate>
              <TextField
                fullWidth
                label="Account Holder Name"
                margin="normal"
                {...bankForm.register("accountHolder")}
                error={!!bankForm.formState.errors.accountHolder}
                helperText={bankForm.formState.errors.accountHolder?.message}
              />

              <TextField
                fullWidth
                label="Account Number"
                margin="normal"
                {...bankForm.register("accountNumber")}
                error={!!bankForm.formState.errors.accountNumber}
                helperText={bankForm.formState.errors.accountNumber?.message}
              />

              <TextField
                fullWidth
                label="IFSC Code"
                margin="normal"
                {...bankForm.register("ifsc")}
                error={!!bankForm.formState.errors.ifsc}
                helperText={bankForm.formState.errors.ifsc?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={submitLoading}
              >
                {submitLoading ? "Saving..." : editMode ? "Update Bank Details" : "Save Bank Details"}
              </Button>
            </form>
          )}

          {/* 🔹 Withdraw Form (if bank exists and not editing) */}
          {hasBank && !editMode && (
            <>
              <Typography variant="body2" sx={{ mb: 2, mt: 1 }}>
                <strong>Account:</strong> {bankDetails.accountNumber} <br />
                <strong>IFSC:</strong> {bankDetails.ifsc} <br />
                <strong>Name:</strong> {bankDetails.accountHolder}
              </Typography>

              <Button
                variant="outlined"
                onClick={() => setEditMode(true)}
                sx={{ mb: 2 }}
              >
                Edit Bank Details
              </Button>

              <form onSubmit={withdrawForm.handleSubmit(withdrawMoney)} noValidate>
                <TextField
                  fullWidth
                  label="Withdrawal Amount"
                  margin="normal"
                  {...withdrawForm.register("amount")}
                  error={!!withdrawForm.formState.errors.amount}
                  helperText={withdrawForm.formState.errors.amount?.message}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  disabled={submitLoading}
                  style={{ background: "var(--red)" }}
                >
                  {submitLoading ? "Processing..." : "Withdraw"}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
