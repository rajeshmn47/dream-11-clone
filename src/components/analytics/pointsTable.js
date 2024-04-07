import { Box, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "./User";
import RecentForm from "./RecentForm";

const columns = [
    {
        field: "teamName",
        headerName: "TEAM NAME",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "played",
        headerName: "PLAYED",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "won",
        headerName: "WON",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "lost",
        headerName: "LOST",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "points",
        headerName: "POINTS",
        width: 180,
        hide: true,
        editable: true,
    },
    {
        field: "form",
        headerName: "RECENT FORM",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return (<RecentForm value={params.row.form} />);
          }
    }
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

export function PointsTable({ allteams }) {
    const [match, setMatch] = useState(null);
    const { id } = useParams();
    const [allPlayers, setAllplayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dreamTeam, setDreamTeam] = useState([]);
    const [next, setNext] = useState(false);
    return (
        <>
            <Box sx={{ height: 500, width: "100%", boxSizing: "border-box", color: "#FFFFFF !important" }} className="container">
                <DataGrid
                    loading={loading}
                    rows={allteams}
                    columns={columns}
                    disableRowSelectionOnClick
                    getRowId={(row) => row?.id}
                    columnHeaderHeight={42}
                    rowHeight={42}
                />
            </Box>
        </>
    );
}

export default PointsTable;