import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';


const drawerWidth = 220;

const Sidebar = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useMediaQuery('(min-width:900px)'); // Only show on desktop

    if (!isDesktop) return null;

    const navItems = [
        {
            label: "Home",
            icon: <HomeOutlinedIcon />,
            path: "/",
            selected: location.pathname === "/",
            onClick: () => navigate("/"),
        },
        {
            label: "My Matches",
            icon: <EmojiEventsOutlinedIcon />,
            path: `/completed/${user?._id}`,
            selected: location.pathname === `/completed/${user?._id}`,
            onClick: () => navigate(`/completed/${user?._id}`),
        },
        {
            label: "My Transactions",
            icon: <EmojiEventsOutlinedIcon />,
            path: `/my-transactions`,
            selected: location.pathname === `/my-transactions`,
            onClick: () => navigate(`/my-transactions`),
        },
        {
            label: "Dreamcricket11 Coins",
            icon: <FeedOutlinedIcon />,
            path: "/gamizocoins",
            selected: location.pathname === "/gamizocoins",
            onClick: () => navigate("/gamizocoins"),
        },
        {
            label: "Refer & Win",
            icon: <GroupsOutlinedIcon />,
            path: "/referwin",
            selected: location.pathname === "/referwin",
            onClick: () => navigate("/referwin"),
        },
        {
            label: "Games",
            icon: <MoreHorizOutlinedIcon />,
            path: "/games",
            selected: location.pathname === "/games",
            onClick: () => navigate("/games"),
        },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: "#fafafa",
                },
            }}
        >
            <List>
                {navItems.map((item) => (
                    <ListItem
                        button
                        key={item.label}
                        selected={item.selected}
                        onClick={item.onClick}
                        sx={{
                            color: item.selected ? "var(--red)" : "inherit",
                            background: item.selected ? "#f5f5f5" : "inherit",
                            "&:hover": { background: "#f0f0f0" },
                        }}
                    >
                        <ListItemIcon sx={{ color: item.selected ? "var(--red)" : "inherit" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{
                            noWrap: true,
                            sx: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: 120,  // prevent overflow
                            },
                        }}
                            primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;