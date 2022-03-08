import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import PastLaunches from "./components/PastLaunches";
import LaunchDetails from "./components/LaunchDetails";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends Component {
  render(){
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Routes>
            <Route exact path="/" element={<PastLaunches />}>
            </Route>
            <Route path="/details/:id" element={<LaunchDetails />}>
            </Route>
          </Routes>
          <Footer />
        </React.Fragment>
      </Router>
    );
   }
  }

export default App;
