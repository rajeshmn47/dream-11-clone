import { Box, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import User from "./User";
import RecentForm from "./RecentForm";
import GetDate from "./GetDate";

const batcolumns = [
    {
        field: "teamHomeName",
        headerName: "Match",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return (<Link to={`/matchanalysis/${params.row.matchId}`}>vs {params.row.oppTeam}</Link>);
        }
    },
    {
        field: "date",
        headerName: "Date",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return (<GetDate value={params.row.date} />);
        }
    },
    {
        field: "runs",
        headerName: "Runs",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return (`${params.row.runs}(${params.row.balls})`);
        }
    },
    {
        field: "balls",
        headerName: "Action",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return ('action');
        }
    }
];

const bowcolumns = [
    {
        field: "oppTeam",
        headerName: "Match",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return (`vs ${params.row.oppTeam}`);
        }
    },
    {
        field: "date",
        headerName: "Date",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return (<GetDate value={params.row.date} />);
        }
    },
    {
        field: "wickets",
        headerName: "Score",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return (`${params.row.wickets}-${params.row.runsConceded}`);
        }
    },
    {
        field: "runsConceded",
        headerName: "Action",
        width: 180,
        hide: true,
        editable: true,
        renderCell: function actions(params) {
            return ('action');
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

export function PlayerStatsTable({ matches, batting }) {
    const [match, setMatch] = useState(null);
    const { id } = useParams();
    const [allPlayers, setAllplayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dreamTeam, setDreamTeam] = useState([]);
    const [next, setNext] = useState(false);
    console.log(matches, 'all matches');
    return (
        <>
            {batting ? <Box sx={{ height: 500, width: "100%", boxSizing: "border-box", color: "#FFFFFF !important" }} className="container">
                <DataGrid
                    loading={loading}
                    rows={matches}
                    columns={batcolumns}
                    disableRowSelectionOnClick
                    getRowId={(row) => row?._id}
                    columnHeaderHeight={42}
                    rowHeight={42}
                />
            </Box> : <Box sx={{ height: 500, width: "100%", boxSizing: "border-box", color: "#FFFFFF !important" }} className="container">
                <DataGrid
                    loading={loading}
                    rows={matches}
                    columns={bowcolumns}
                    disableRowSelectionOnClick
                    getRowId={(row) => row?._id}
                    columnHeaderHeight={42}
                    rowHeight={42}
                />
            </Box>}
        </>
    );
}

export default PlayerStatsTable;