import { Box, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "./User";

const columns = [
    {
        field: "player",
        headerName: "PLAYER NAME",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return (<User value={params.row} />);
        },
        sortComparator: (v1, v2) => v1.playerName.localeCompare(v2.playerName)
    },
    {
        field: "totalScore",
        headerName: "TOTAL SCORE",
        width: 100,
        hide: true,
        editable: true,
        type: "number"
    },
    {
        field: "totalWickets",
        headerName: "TOTAL WICKETS",
        width: 100,
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
        width: 100,
        hide: true,
        editable: true,
    },
    {
        field: "totalSixes",
        headerName: "TOTAL SIXES",
        width: 100,
        hide: true,
        editable: true,
    },
    {
        field: "matches",
        headerName: "TOTAL MATCHES",
        width: 140,
        hide: true,
        editable: true,
    },
    {
        field: "average",
        headerName: "AVERAGE",
        width: 140,
        hide: true,
        editable: true,
        type: "number"
    },
    {
        field: "strikeRate",
        headerName: "STRIKE RATE",
        width: 140,
        hide: true,
        editable: true,
        type: "number"
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

export function PlayersTable({ players }) {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Box sx={{ marginTop: '15px', height: 500, width: "100%", boxSizing: "border-box", color: "#FFFFFF !important" }} className="container">
                <DataGrid
                    loading={loading}
                    rows={players}
                    columns={columns}
                    disableRowSelectionOnClick
                    getRowId={(row) => row.playerId}
                    columnHeaderHeight={42}
                    rowHeight={42}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                // Hide columns status and traderName, the other columns will remain visible
                                playerId: false,
                            },
                        },
                    }}
                />
            </Box>
        </>
    );
}

export default PlayersTable;