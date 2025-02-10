import { Box, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImgurl } from "../../utils/img_url";
import styled from "@emotion/styled";
import { URL } from "../../constants/userConstants";

const Image = styled.img`
width: 30px;
border-radius:50%;
margin-right:15px;
`;

const W = styled.div`
width:20px;
height:20px;
border-radius:50%;
color:green;
margin-right:5px;
font-size:14px;
display:flex;
justify-content:center;
align-items:center;
text-transform:uppercase;
border:1px solid green;
`

const L = styled.div`
width:20px;
height:20px;
border-radius:50%;
font-size:14px;
color:red;
margin-right:5px;
display:flex;
justify-content:center;
align-items:center;
text-transform:uppercase;
border:1px solid red;
`

export function RecentForm({ value }) {
    console.log(value, 'recent form')
    return (
        <>
            {value ? (value?.split('').map((fo) => fo == "w" ? <W>{fo}</W> : <L>{fo}</L>)) : ''}
        </>
    );
}

export default RecentForm;