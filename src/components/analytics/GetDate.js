import { Box, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImgurl } from "../../utils/img_url";
import styled from "@emotion/styled";
import { URL } from "../../constants/userConstants";
import { getDisplayDate } from "../../utils/dateformat";

const Image = styled.img`
width: 30px;
border-radius:50%;
margin-right:15px;
`;

export function GetDate({ value }) {
    console.log(value, 'value')
    return (
        <>
            {getDisplayDate(value, 'i')}
        </>
    );
}

export default GetDate;