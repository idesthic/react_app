import React, { useState,useEffect } from 'react';
import '../App.css';
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

const LaunchDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [launches, setLaunches] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: getLaunchDetails(id) })
    }).then(response => response.json()).then(data => {
      setLaunches(data.data.launch)
      setIsLoaded(true);
    })
  }, [id]);

  if(isLoaded === false) {
    return <div>Loading</div>;
  }
  else {

    const Back = styled(Link)`
      text-decoration: none;
      color: #000000;
      &:hover {
        text-decoration: underline;
        color: #787b80;
      }
    `;

    return (
      <div className="launch-details">
        <Back to="/"><p>&#8592; List of launches</p></Back>
          <table id="launch-details-table">
            <thead>
              <tr>
                <th className="mission-title" colSpan="2">{launches.mission_name}</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <th>Launch ID:</th>
              <td>{launches.id}</td>
            </tr>
            <tr>
              <th>Launch date:</th>
              <td>{launches.launch_date_local}</td>
            </tr>
            <tr>
              <th>Launch site:</th>
              <td>{launches.launch_site.site_name_long}</td>
            </tr>
            <tr>
              <th>Launch success:</th>
              <td>{launches.launch_success}</td>
            </tr>
            <tr>
              <th>Rocket:</th>
              <td>{launches.rocket.rocket_name}</td>
            </tr>
            <tr>
              <th>Ships:</th>
              <td>{launches.ships.name}</td>
            </tr>
            <tr>
              <th>Details:</th>
              <td>{launches.details}</td>
            </tr>
            <tr>
              <th>Link:</th>
              <td><a href={ `${launches.links.video_link}` } target="_blank">{launches.links.video_link}</a></td>
            </tr>
            </tbody>
          </table>
        </div>
      );
  }
};

function getLaunchDetails(x){
  let query = `
{
  launch(id: "${x}") {
    details
    id
    mission_name
    launch_date_local
    launch_site {
      site_name_long
    }
    launch_success
    rocket {
      rocket_name
    }
    ships {
      name
    }
    links {
      video_link
    }
  }
}
`
  return query;
}

export default LaunchDetails;
