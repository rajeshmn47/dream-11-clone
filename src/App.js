import logo from "./logo.svg";
import axios from "axios";
import { URL } from "./constants/userConstants";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import ReactCanvasConfetti from "react-confetti";
import Home from "./components/home";
import Test from "./components/test";
import Players from "./components/players";
import CreateTeam from "./components/createteam";
import CreateTeamNew from "./components/createnew";
import Completed from "./components/completed";
import Counter from "./components/counter";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, logout } from "./actions/userAction";
import { useState, useEffect } from "react";
import SavedTeam from "./components/savedteam";
import ReactGA from "react-ga";
import Contests from "./components/contests";
import ContestDetail from "./components/contestdetail";
import JoinedContests from "./components/joinedcontests";
import Navbar from "./components/navbar";
import { ForgotPassword } from "./components/forget-password";
import Payment from "./components/payment";
import Cron from "./components/cron";

function App() {
  const dispatch = useDispatch();
  const { confetti } = useSelector((state) => state.user);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const showAnimation = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", showAnimation);
    return () => {
      window.removeEventListener("resize", showAnimation);
    };
  }, [dimensions]);
  const TRACKING_ID = "G-YWB7BCRZML";
  ReactGA.initialize(TRACKING_ID);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(loadUser());
    console.log(user, "or,and");
  }, [dispatch]);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/completed/:id" element={<Completed />} />
          <Route path="/players" element={<Players />} />
          <Route path="/createnew/:id" element={<CreateTeamNew />} />
          <Route path="/contests/:id" element={<Contests />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/savedteam/:id" element={<SavedTeam />} />
          <Route path="/contestdetail/:id" element={<ContestDetail />} />
          <Route path="/joined" element={<JoinedContests />} />
          <Route path="/test" element={<Test />} />
          <Route path="/cron" element={<Cron/>} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
      {confetti && (
        <ReactCanvasConfetti
          width={dimensions.width - 10}
          height={dimensions.height - 10}
          opacity={0.6}
        />
      )}
    </>
  );
}

export default App;
