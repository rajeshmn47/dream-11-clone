import './App.css';
import 'react-whatsapp-widget/dist/index.css';

import { useEffect, useState } from 'react';
import ReactCanvasConfetti from 'react-confetti';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WhatsAppWidget } from 'react-whatsapp-widget';

import { loadUser } from './actions/userAction';
import Admin from './components/admin/Admin';
import Completed from './components/completed';
import ContestDetail from './components/contestdetail';
import Counter from './components/counter';
import CreateTeam from './components/createteam/createteam';
import Donate from './components/Donate';
import FindPeople from './components/findPeople/FindPeople';
import Football from './components/football/home';
import { ForgotPassword } from './components/forget-password';
import Logingoogle from './components/googlesignin';
import HelpAndSupport from './components/helpAndSupport';
import Home from './components/home/home';
import JoinedContests from './components/joinedcontests';
import Login from './components/login';
import Contests from './components/MatchDetails';
import More from './components/more';
import MyInfo from './components/myinfo/MyInfo';
import NewUsers from './components/newUsers';
import Payment from './components/payment';
import Players from './components/players';
import PrivacyPolicy from './components/privacyPolicy';
import Refund from './components/refund';
import Register from './components/register';
import SavedTeam from './components/savedteam';
import TermsAndConditions from './components/termsAndConditions';
import Test from './components/test';
import TransactionTabs from './components/transaction';
import PlayerDetail from './components/playerDetail';
import SeriesDetails from './components/seriesdetails';
import MatchAnalysis from './components/analytics/matchAnalysis';
import Bowler from './components/Bowler'

function App() {
  const dispatch = useDispatch();
  const { confetti } = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    checkUserToken();
  }, [isLoggedIn]);

  useEffect(() => {
    window.addEventListener('resize', showAnimation);
    return () => {
      window.removeEventListener('resize', showAnimation);
    };
  }, [dimensions]);
  const TRACKING_ID = 'G-YWB7BCRZML';
  ReactGA.initialize(TRACKING_ID);
  const {
    user, isAuthenticated, loading, error,
  } = useSelector(
    (state) => state.user,
  );
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/football" element={<Football />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/completed/:id" element={<Completed />} />
          <Route path="/players" element={<Players />} />
          <Route path="/createteam/:id" element={<CreateTeam />} />
          <Route path="/editTeam/:id" element={<CreateTeam />} />
          <Route path="/contests/:id" element={<Contests />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/savedteam/:id" element={<SavedTeam />} />
          <Route path="/contestdetail/:id" element={<ContestDetail />} />
          <Route path="/joined" element={<JoinedContests />} />
          <Route path="/test" element={<Test />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/googlelogin" element={<Logingoogle />} />
          <Route path="/newusers" element={<NewUsers />} />
          <Route path="/findpeople" element={<FindPeople />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="/transaction" element={<TransactionTabs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/matchanalysis/:id" element={<MatchAnalysis />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/helpAndSupport" element={<HelpAndSupport />} />
          <Route path="/more" element={<More />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/player/:id" element={<PlayerDetail/>} />
          <Route path="/series/:name" element={<SeriesDetails/>} />
          <Route path="/bowler" element={<Bowler/>} />
        </Routes>
      </BrowserRouter>
      {confetti && (
        <ReactCanvasConfetti
          width={dimensions.width - 10}
          height={dimensions.height - 10}
          opacity={0.6}
        />
      )}
      <div className="whatsappwidget">
        <WhatsAppWidget phoneNumber="7259293140" />
      </div>
    </>
  );
}

export default App;
