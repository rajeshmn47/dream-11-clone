import './register.css';
import 'react-phone-number-input/style.css';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { LOGIN_SUCCESS, URL } from '../constants/userConstants';
import Otp from './otp';

const PHONE_REGEX = new RegExp(
    /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gim,
);

const Err = styled.p`
  color: red;
`;

export function Bowler() {
    const {
        user, isAuthenticated, loading, error,
    } = useSelector(
        (state) => state.user,
    );
    const dispatch = useDispatch();
    const alert = useAlert();
    const [err, setErr] = useState();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [team, setTeam] = useState('');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState();
    const [formData, setFormData] = useState({ 'name': '', 'age': '', 'team': '' })
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            alert.error(error);
        }
    }, [user, isAuthenticated, error]);

    console.log(errors, 'errors');
    const onSubmit = async (e) => {
        e.preventDefault()
        const data = await axios.post(`${URL}/test/add-bowler`, {
            ...formData,
        });
        console.log(data);
        if (data.data.success) {
            setErr(data.data.message);
            alert.success(data.data.message);
            //setOpen(true);
        } else {
            alert.error(data.data.message);
            setErr(data.data.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...form })
    }

    return (
        <>
            <div className="registertopbar">
                <ArrowBackIcon
                    style={{ marginRight: '20px' }}
                    onClick={() => navigate(-1)}
                />
                add bowler
            </div>

            <div className="register">
                <Paper style={{ padding: '5px 5px' }}>
                    <form onSubmit={onSubmit} className="registerform">
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            variant="standard"
                            value={formData?.name}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            required
                            id="age"
                            name="age"
                            label="Age"
                            variant="standard"
                            value={formData?.age}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            required
                            id="team"
                            name="team"
                            label="team"
                            variant="standard"
                            value={formData?.team}
                            fullWidth
                            margin="dense"
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            disableElevation
                            style={{ backgroundColor: '#03d47c' }}
                        >
                            Add Bowler
                        </Button>
                    </form>
                </Paper>
            </div>
        </>
    );
}

export default Bowler;