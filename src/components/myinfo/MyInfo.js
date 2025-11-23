import './myInfo.css';
import 'react-phone-number-input/style.css';
import dayjs from "dayjs";
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as Yup from 'yup';

import { URL } from '../../constants/userConstants';
import { API } from '../../actions/userAction';

const PHONE_REGEX = new RegExp(
  /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gim,
);

const Err = styled.p`
  color: red;
`;

export function MyInfo() {
  const {
    user, isAuthenticated, loading, error,
  } = useSelector(
    (state) => state.user,
  );
  const alert = useAlert();
  const [err, setErr] = useState();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  useEffect(() => {
    setValue('email', user?.email);
    setValue('username', user?.username);
    setValue('phoneNumber', user?.phonenumber);
    setValue('password', user?.password);
    setValue('dateOfBirth', user?.dateOfBirth || null);

    // Set selected country, state, city as objects
  }, [user, countries, states, cities]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = await Country.getAllCountries();
        let allCountries = result

        setCountries(allCountries);

        if (user?.country) {
          // Try to match user's country name to isoCode
          const foundCountry = allCountries.find(
            (c) => c.name.toLowerCase() === user.country.toLowerCase()
          );
          if (foundCountry) {
            setSelectedCountry(foundCountry);
          }
        } else {
          // fallback to first country
          const [{ isoCode: firstCountry } = {}] = allCountries;
          if (user?.country) {
            let c = countries.find((c) => c.name == user.country);
            setSelectedCountry(c)
          }
          else {
            setSelectedCountry(firstCountry || "");
          }
        }

        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };

    getCountries();
  }, [user]); // re-run when user changes

  useEffect(() => {
    const getStates = async () => {
      if (!selectedCountry) return;
      try {
        const result = await State.getStatesOfCountry(selectedCountry?.isoCode);
        let allStates = result
        setStates(allStates);

        if (user?.state) {
          const foundState = allStates.find(
            (s) => s.name.toLowerCase() === user.state.toLowerCase()
          );
          if (foundState) {
            setSelectedState(foundState);
            return; // exit here so we don't overwrite with firstState
          }
        }

        // fallback to first state
        const [{ isoCode: firstState = "" } = {}] = allStates;
        //setSelectedState(firstState);
      } catch (error) {
        console.log(error, 'what error')
        setStates([]);
        setCities([]);
        setSelectedCity("");
      }
    };

    getStates();
  }, [selectedCountry, user]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode,
        )
        let allCities = [];
        allCities = result
        console.log(result, 'result')
        const [{ name: firstCity = '' } = {}] = allCities;
        if (user?.city) {
          console.log(allCities, 'cities')
          let c = allCities.find((city) => city.name.toLowerCase() == user?.city?.toLowerCase())
          setSelectedCity(c)
        }
        else {
          setSelectedCity(firstCity);
        }
        setCities(allCities);
      } catch (error) {
        setCities([]);
      }
    };
    getCities();
  }, [selectedState, user]);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    phoneInput: Yup.string(),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^[0-9+-]+$/, 'It must be in numbers')
      .min(10, 'Phone Number must be at least 10 characters')
      .max(10, 'Phone Number must not exceed 10 characters'),
    dateOfBirth: Yup.string().optional('Password is required'),
    country: Yup.string().optional('Password is required'),
    state: Yup.string().optional('Password is required'),
    city: Yup.string().optional('Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  console.log(errors, selectedState, 'errors');

  const onSubmit = async (formData) => {
    try {
      console.log(JSON.stringify(formData, null, 2));
      // e.preventDefault();
      setEmail(formData.email);
      const data = await API.put(`${URL}/auth/updateProfile/${user?._id}`, {
        ...formData, country: selectedCountry.name, state: selectedState.name, city: selectedCity.name
      });
      console.log(data);
      setErr(data.data.message);
      alert.success(data.data.message);
      setOpen(true);
    }
    catch (error) {
      alert.error(data.data.message);
      setErr(data.data.message);
    }
  };

  const handleotp = async () => {
    const data = await axios.post(`${URL}/auth/otp`, {
      email,
      otp,
    });
    setErr(data.data.message);
    alert.success(data.data.message);
  };

  return (
    <div className='infoContainer'>
      <div className='infoBody'>
        <div className="myInfoTop">
          <ArrowBackIcon
            style={{ marginRight: '20px' }}
            onClick={() => navigate(-1)}
          />
          My Info and Settings
        </div>
        <div className="myInfo">
          <form onSubmit={handleSubmit(onSubmit)} className="myInfoForm">
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              {...register('email')}
              error={!!errors.email}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.email?.message}
            </Typography>
            <TextField
              required
              id="username"
              name="username"
              label="Name"
              variant="standard"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              {...register('username')}
              error={!!errors.username}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.username?.message}
            </Typography>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              variant="standard"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.phoneNumber?.message}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: "100% !important" }}>
              <DemoContainer components={['DateField']} sx={{ width: "100% !important" }}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  defaultValue={null}
                  sx={{ width: "100% !important" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Date of Birth"
                      value={field.value ? dayjs(field.value) : null}   // ✅ ensure it's a dayjs object
                      onChange={(newValue) => {
                        field.onChange(newValue ? newValue.toISOString() : null); // store ISO string in form
                      }}
                      style={{ width: "100% !important" }}
                      slotProps={{
                        textField: {
                          variant: 'standard',
                          InputLabelProps: { shrink: true },
                          error: !!errors.dateOfBirth,
                          fullWidth: true,
                          helperText: errors.dateOfBirth?.message,
                        },
                      }}
                    />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Typography variant="inherit" color="textSecondary">
              {errors.dateOfBirth?.message}
            </Typography>
            <div className="selectContainer">
              <label className="selectLabel">Select a Country</label>
              <Select
                options={Country.getAllCountries()}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.name}
                value={selectedCountry}
                onChange={(item) => {
                  setSelectedCountry(item);
                }}
                placeholder=""
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: 'none',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    backgroundColor: '#fafafa',
                    borderRadius: '0',
                    textAlign: 'left',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                  }),
                }}
              />
            </div>
            <div className="selectContainer">
              <label className="selectLabel">Select a State</label>
              <Select
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.name}
                value={selectedState}
                onChange={(item) => {
                  setSelectedState(item);
                }}
                placeholder=""
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: 'none',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    backgroundColor: '#fafafa',
                    borderRadius: '0',
                    textAlign: 'left',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                    padding: '0',
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                    padding: '0',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused && 'lightgray',
                    color: state.isFocused && 'red',
                    padding: '0',
                  }),
                }}
              />
            </div>
            <div className="selectContainer">
              <label className="selectLabel">Select a City</label>
              <Select
                options={City.getCitiesOfState(
                  selectedState?.countryCode,
                  selectedState?.isoCode,
                )}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.name}
                value={selectedCity}
                onChange={(item) => {
                  setSelectedCity(item);
                }}
                placeholder=""
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: 'none',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    backgroundColor: '#fafafa',
                    borderRadius: '0',
                    textAlign: 'left',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                    padding: '0',
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                    padding: '0',
                  }),
                }}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              style={{
                backgroundColor: 'var(--red)',
                marginTop: '10px',
                margin: '10px 0',
              }}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyInfo;
