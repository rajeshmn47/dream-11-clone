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

export function User({ value }) {
    console.log(value,'value')
    return (
        <>
            <Image src={`https://firebasestorage.googleapis.com/v0/b/dreamelevenclone.appspot.com/o/images%2F${value.playerId}.png?alt=media&token=4644f151-3dfd-4883-9398-4191bed34854`} alt="" />
            <Link to={`../player/${value?.playerId}`}>{value?.playerName}</Link>
        </>
    );
}

export default User;