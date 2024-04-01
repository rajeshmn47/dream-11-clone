import { Box, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const columns = [
    {
        field: "playerName",
        headerName: "PLAYER NAME",
        width: 180,
        hide: true,
        editable: true
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
        field: "totalScore",
        headerName: "TOTAL SCORE",
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
    const [match, setMatch] = useState(null);
    const { id } = useParams();
    const [allPlayers, setAllplayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dreamTeam, setDreamTeam] = useState([]);
    const [next, setNext] = useState(false);
    return (
        <>
            <Box sx={{ height: 400, width: "100%", color: "#FFFFFF !important" }} className="container">
                <StripedDataGrid
                    loading={loading}
                    rows={players}
                    columns={columns}
                    disableRowSelectionOnClick
                    getRowId={(row) => row.playerId}
                    showCellVerticalBorder
                    showColumnVerticalBorder
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