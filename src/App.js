import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from "./Hoc/Auth";


import Header from "./Component/Header_footer/Header";
import Footer from "./Component/Header_footer/Footer";
import Home from "./Component/Home";
import SignIn from "./Component/Signin"
import TheTeam from "./Component/TheTeam";
import Matches from "./Component/Matches";
import NotFound from "./Component/NotFound/NotFound";

import Dashboard from "./Component/Admin/Dashboard";
import AdminPlayers from "./Component/Admin/Players"
import AddEditPlayers from "./Component/Admin/Players/AddEditPlayers";
import AdminMatches from "./Component/Admin/Matches"
import AddEditMatch from "./Component/Admin/Matches/addEditMatch"




const App = () => {

  // console.log(props);
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        {/* adimin matches pages */}
        <Route path="/admin_matches/edit_match/:matchid" exact element={<AuthGuard><AddEditMatch /></AuthGuard>}></Route>
        <Route path="/admin_matches/add_match" exact element={<AuthGuard><AddEditMatch /></AuthGuard>}></Route>
        <Route path="/admin_matches" exact element={<AuthGuard><AdminMatches /></AuthGuard>}></Route>
        {/* admin players pages */}
        <Route path="/admin_players/edit_player/:playerid" exact element={<AuthGuard><AddEditPlayers /></AuthGuard>}></Route>
        <Route path="/admin_players/add_player" exact element={<AuthGuard><AddEditPlayers /></AuthGuard>}></Route>
        <Route path="/admin_players" exact element={<AuthGuard><AdminPlayers /></AuthGuard>}></Route>
        {/* other pages */}
        <Route path="/dashboard" exact element={<AuthGuard><Dashboard /></AuthGuard>}></Route>
        <Route path="/the_matches" exact element={<Matches />}></Route>
        <Route path="/the_team" exact element={<TheTeam />}></Route>
        <Route path="/sign_in" exact element={<SignIn />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to={"/home"} />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
