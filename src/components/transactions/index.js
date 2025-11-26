import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { CircularProgress, Button } from "@mui/material";
import { URL } from "./../../constants/userConstants";
import { API } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  @media screen and (min-width: 600px) {
    margin-left: 220px;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const FilterContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* Horizontal scroll if needed */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px; /* ensures table doesn't shrink too much */
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  background-color: #f5f5f5;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const Status = styled.span`
  color: ${(props) =>
        props.status === "success" ? "green" : props.status === "pending" ? "orange" : "red"};
  font-weight: 600;
  text-transform: capitalize;
`;

const TypeButton = styled(Button)`
  && {
    text-transform: none;
    font-weight: 600;
  }
`;

const MyTransactions = () => {
    const { user } = useSelector(state => state.user);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("all");
    const alert = useAlert();

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const res = await API.get(`${URL}/payment/my-transactions/${user._id}`);
            setTransactions(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            alert.error("Failed to fetch transactions");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [user]);

    const filteredTransactions =
        filterType === "all"
            ? transactions
            : transactions.filter((tx) => tx.action.toLowerCase() === filterType);

    return (
        <>
            <Navbar />
            <Sidebar />
            <Container>
                <Card>
                    <Title>My Transactions</Title>

                    <FilterContainer>
                        <TypeButton
                            variant={filterType === "all" ? "contained" : "outlined"}
                            onClick={() => setFilterType("all")}
                        >
                            All
                        </TypeButton>
                        <TypeButton
                            variant={filterType === "deposit" ? "contained" : "outlined"}
                            onClick={() => setFilterType("deposit")}
                            color="success"
                        >
                            Deposit
                        </TypeButton>
                        <TypeButton
                            variant={filterType === "withdraw" ? "contained" : "outlined"}
                            onClick={() => setFilterType("withdraw")}
                            color="error"
                        >
                            Withdraw
                        </TypeButton>
                    </FilterContainer>

                    {loading ? (
                        <CircularProgress />
                    ) : filteredTransactions.length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        <TableWrapper>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>Date</Th>
                                        <Th>Amount</Th>
                                        <Th>Type</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map((tx) => (
                                        <tr key={tx._id}>
                                            <Td>{new Date(tx.createdAt).toLocaleString()}</Td>
                                            <Td>₹ {tx.amount}</Td>
                                            <Td>{tx.action}</Td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </TableWrapper>
                    )}
                </Card>
            </Container>
        </>
    );
};

export default MyTransactions;
