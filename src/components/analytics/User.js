import { Box, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImgurl } from "../../utils/img_url";
import styled from "@emotion/styled";

const Image = styled.img`
width: 30px;
border-radius:50%;
margin-right:15px;
`;

const columns = [
    {
        field: "playerName",
        headerName: "PLAYER NAME",
        width: 180,
        hide: true,
        editable: true,
        renderCell: User
    },
    {
        field: "teamName",
        headerName: "TEAM NAME",
        width: 180,
        hide: true,
        editable: true
    },
    {
        field: "totalScore",
        headerName: "TOTAL SCORE",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "totalWickets",
        headerName: "TOTAL WICKETS",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "teamName",
        headerName: "TEAM NAME",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "totalFours",
        headerName: "TOTAL FOURS",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "totalSixes",
        headerName: "TOTAL SIXES",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "matches",
        headerName: "TOTAL MATCHES",
        width: 180,
        hide: true,
        editable: true,
    },
];

const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: "#fef4de",
        ".dreamicon": {
            display: "block",
        },
        "&:hover, &.Mui-hovered": {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            "@media (hover: none)": {
                backgroundColor: "transparent",
            },
        },
        "&.Mui-selected": {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
            "&:hover, &.Mui-hovered": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
                ),
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    },
    [`& .${gridClasses.row}.prime`]: {
        backgroundColor: "#fef4de",
        ".dreamicon": {
            display: "block",
        },
        "&:hover, &.Mui-hovered": {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            "@media (hover: none)": {
                backgroundColor: "transparent",
            },
        },
        "&.Mui-selected": {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
            "&:hover, &.Mui-hovered": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
                ),
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    },
    [`& .${gridClasses.row}.sikh`]: {
        ".dreamicon": {
            display: "block",
        },
        "&:hover, &.Mui-hovered": {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            "@media (hover: none)": {
                backgroundColor: "transparent",
            },
        },
        "&.Mui-selected": {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
            "&:hover, &.Mui-hovered": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
                ),
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    },
}));

export function User({ value }) {
    const [match, setMatch] = useState(null);
    const { id } = useParams();
    const [allPlayers, setAllplayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dreamTeam, setDreamTeam] = useState([]);
    const [next, setNext] = useState(false);
    return (
        <>
            <Image src={getImgurl(value?.image, value?.playerName)} alt="" />
            <Link to={`../player/${value?.playerId}`}>{value?.playerName}</Link>
        </>
    );
}

export default User;