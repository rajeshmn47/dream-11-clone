import logo from "./logo.svg";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import Players from "./components/players";
import CreateTeam from "./components/createteam";
import CreateTeamNew from "./components/createnew";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";
import { useState, useEffect } from "react";
import SavedTeam from "./components/savedteam";
import Contests from "./components/contests";
import ContestDetail from "./components/contestdetail";
import JoinedContests from "./components/joinedcontests";
import Navbar from "./components/navbar";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(loadUser());
    console.log(user, "or");
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/players" element={<Players />} />
          <Route path="/createnew/:id" element={<CreateTeamNew />} />
          <Route path="/contests/:id" element={<Contests />} />
          <Route path="/savedteam/:id" element={<SavedTeam />} />
          <Route path="/contestdetail/:id" element={<ContestDetail />} />
          <Route path="/joined" element={<JoinedContests />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
