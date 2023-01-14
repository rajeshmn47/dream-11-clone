import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export const Bottomnav = () => {
  return (
    <>
      <div className="bottomnav">
        <div style={{ color: "#C41E22" }}>
          <HomeOutlinedIcon style={{ fontSize: "22px" }} />
          Home
        </div>
        <div>
          <EmojiEventsOutlinedIcon style={{ fontSize: "22px" }} />
          MyMatches
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
    </>
  );
};

export default Bottomnav;
