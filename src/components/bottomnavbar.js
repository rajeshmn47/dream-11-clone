import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export function Bottomnav() {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="bottomnav">
      <div
        onClick={() => navigate("/")}
        className={location.pathname == "/" ? "selectedrt" : "notselectedrt"}
      >
        <HomeOutlinedIcon style={{ fontSize: "22px" }} />
        Home
      </div>
      <div
        onClick={() => navigate(`/completed/${user?._id}`)}
        className={
          location.pathname == `/completed/${user._id}`
            ? "selectedrt"
            : "notselectedrt"
        }
      >
        <EmojiEventsOutlinedIcon style={{ fontSize: "22px" }} />
        My Matches
      </div>
      <div>
        <FeedOutlinedIcon style={{ fontSize: "22px" }} />
        Feed
      </div>
      <div>
        <GroupsOutlinedIcon style={{ fontSize: "22px" }} />
        Groups
      </div>
      <div>
        <MoreHorizOutlinedIcon style={{ fontSize: "22px" }} />
        More
      </div>
    </div>
  );
}

export default Bottomnav;
