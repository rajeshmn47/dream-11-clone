import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BasicTabs from "./tabs";
import CategoryTabs from "./playerscategory";
import "./create.css";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import Bottomnav from "./bottomnavbar";
import Next from "./captain";
import {
  PlaylistAddCheckCircleSharp,
  SendTimeExtension,
  SettingsApplicationsTwoTone,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { URL } from "../constants/userConstants";
import { getrowClass } from "../utils/getrowclass";
import StatsName from "./statsname";

const columns = [
  { field: "playerId", headerName: "ID", width: 0, hide: true, editable: true },
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
    backgroundImage: "url(./google.svg)",
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
    backgroundImage: "url(./google.svg)",
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

export const Stats = ({ matchdata, team }) => {
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllplayers] = useState([]);
  const [dreamTeam, setDreamTeam] = useState([]);
  const [next, setNext] = useState(false);
  console.log(team, "matchdata");
  useEffect(() => {
    let all = [];
    if (team?.length > 0) {
      team.forEach((t) => {
        all.push(...t.players);
      });
    }
    setAllplayers([...all]);
    let ko = allPlayers.find((k) => {
      return k.playerName == "piyush chawla";
    });
    console.log(ko, allPlayers, "ko");
  }, [team]);
  useEffect(() => {
    async function getupcoming() {
      console.log(id, "id");
      if (id) {
        const data = await axios.get(`${URL}/getplayers/${id}`);
        console.log(data);
        let players = data.data.players.teamAwayPlayers
          .concat(data.data.players.teamHomePlayers)
          .map((obj) => ({
            ...obj,
            isSelected: false,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }));
        setPlayers([...players]);
        setDreamTeam([
          ...players.sort((a, b) => b.points - a.points).splice(0, 10),
        ]);
        setMatch(data.data.matchdetails);
      }
    }
    getupcoming();
  }, [id]);

  console.log(players, allPlayers);
  const handleClick = (i) => {
    let po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = true;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleRemove = (i) => {
    let po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = false;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleNext = () => {
    console.log("clicked next");
    setNext(true);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <StripedDataGrid
        rows={players}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row) => row.playerId}
        showCellVerticalBorder={true}
        showColumnVerticalBorder={true}
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
};

export default Stats;
