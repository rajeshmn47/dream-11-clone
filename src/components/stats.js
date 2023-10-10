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

const columns = [
  {
    field: "playerId",
    headerName: "ID",
    width: 0,
    hide: true,
    editable: true,
  },
  {
    field: "playerName",
    headerName: "PLAYERS",
    flex: 0.5,
    width: 180,
    editable: true,
    renderCell: StatsName,
  },
  {
    field: "points",
    headerName: "POINTS",
    flex: 0.5,
    width: 180,
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

export function Stats({ matchdata, team }) {
  const [match, setMatch] = useState(null);
  const { id } = useParams();
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
      if (id) {
        setLoading(true);
        const data = await axios.get(`${URL}/getplayers/${id}`);
        setLoading(false);
        const playersdata = data.data.players.teamAwayPlayers
          .concat(data.data.players.teamHomePlayers)
          .map((obj) => ({
            ...obj,
            isSelected: false,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }));
        setPlayers([...playersdata]);
        setDreamTeam([
          ...playersdata.sort((a, b) => b.points - a.points).splice(0, 11),
        ]);
        setMatch(data.data.matchdetails);
      }
    }
    getupcoming();
  }, [id]);
  const handleClick = (i) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = true;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleRemove = (i) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = false;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleNext = () => {
    setNext(true);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
        getRowClassName={(params) =>
          getrowClass(allPlayers, dreamTeam, params.row.playerName)
        }
      />
    </Box>
  );
}

export default Stats;
