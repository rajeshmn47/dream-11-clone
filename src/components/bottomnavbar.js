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
          <HomeOutlinedIcon />
          Home
        </div>
        <div>
          <EmojiEventsOutlinedIcon />
          MyMatches
        </div>
        <div>
          <FeedOutlinedIcon />
          Feed
        </div>
        <div>
          <GroupsOutlinedIcon />
          Groups
        </div>
        <div>
          <MoreHorizOutlinedIcon />
          More
        </div>
      </div>
    </>
  );
};

export default Bottomnav;
