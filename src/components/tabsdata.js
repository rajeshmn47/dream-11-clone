import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Grid } from "@mui/material";
import Slider from "@mui/material/Slider";

const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
`;
const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: #ec1801;
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  table {
    width: 100%;
  }
  tr {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-bottom-color: currentcolor;
    border-color: rgba(0, 0, 0, 0.12);
  }
  th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    font-family: "Open Sans";
    width: 100px;
  }
  td {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    font-family: "Open Sans";
    text-align: center;
    width: 100px;
  }
  width: 100%;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
  }
`;

const FreeButton = styled.button`
  background-color: #008a36;
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SliderContainer = styled.div``;
const SpotsLeft = styled.div``;

const SpotsRight = styled.div``;

const Last = styled.div`
  background-color: #f6f6f6;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  color: #888;
`;
const Paragraph = styled.p`
  padding: 10px 15px;
  color: rgba(0, 0, 0, 0.6);
`;
const Left = styled.div``;

const Right = styled.div``;

const LastPanel = styled.div``;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((t, index) => (
            <Tab label={t.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ContestsContainer container item sm={12} xs={12}>
          <First>
            <table>
              <tr>
                <th>Rank</th>
                <th>Winnings</th>
              </tr>
              <tr>
                <td>1</td>
                <td>₹17,850</td>
              </tr>
              <tr>
                <td>1</td>
                <td>₹17,850</td>
              </tr>
            </table>
          </First>
        </ContestsContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paragraph>View all the teams after contest deadline</Paragraph>
        <LastPanel></LastPanel>
      </TabPanel>
    </Box>
  );
}