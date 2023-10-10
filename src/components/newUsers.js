import "./create.css";

import {
  PlaylistAddCheckCircleSharp,
  SendTimeExtension,
  SettingsApplicationsTwoTone,
} from "@mui/icons-material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Box, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { URL } from "../constants/userConstants";
import { getrowClass } from "../utils/getrowclass";
import Bottomnav from "./navbar/bottomnavbar";
import Next from "./captain";
import BasicTabs from "./MatchTabs";
import CategoryTabs from "./createteam/playerscategory";
import StatsName from "./statsname";
import Steppr from "./stepper";
import MatchesJoined from "./matchesjoined";
import CreatedAt from "./createdat";

const columns = [
  {
    field: "email",
    headerName: "EMAIL",
    width: 180,
    hide: true,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "CREATED AT",
    width: 180,
    editable: true,
    renderCell: CreatedAt,
  },
  {
    field: "matchIds",
    headerName: "MATCHES JOINED",
    width: 90,
    editable: true,
    renderCell: MatchesJoined,
  },
  {
    field: "wallet",
    headerName: "BALANCE",
    width: 100,
    editable: true,
  },
  {
    field: "numberOfContestJoined",
    headerName: "CONTESTS JOINED",
    width: 90,
    editable: true,
  },
  {
    field: "numberOfTeamsCreated",
    headerName: "TEAMS CREATED",
    width: 90,
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
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
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
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
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
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
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

export function NewUsers({ matchdata, team }) {
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllplayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dreamTeam, setDreamTeam] = useState([]);
  const [next, setNext] = useState(false);
  useEffect(() => {
    const all = [];
    if (team?.length > 0) {
      team.forEach((t) => {
        all.push(...t.players);
      });
    }
    setAllplayers([...all]);
  }, [team]);
  useEffect(() => {
    async function getupcoming() {
      setLoading(true);
      const data = await axios.get(`${URL}/getallusers`);
      console.log(data.data.data, "data");
      setUsers(data.data.data);
      setLoading(false);
    }
    getupcoming();
  }, [id]);

  return (
    <Box
      sx={{ height: 400, width: "100%", color: "#FFFFFF !important" }}
      className="container"
    >
      <StripedDataGrid
        loading={loading}
        rows={users}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
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
        getRowClassName={(params) =>
          getrowClass(allPlayers, dreamTeam, params.row.playerName)
        }
      />
    </Box>
  );
}

export default NewUsers;
