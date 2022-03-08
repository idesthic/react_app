import React from "react";
import '../App.css';
import LaunchDetails from "./LaunchDetails";
import { Link } from "react-router-dom";

const PastLaunches = () => {
  const launches = useLaunches();

  return (
      <div className="hero">
        <div className="hero-title">
          <h2>Past Launches</h2>
        </div>
        <div className="hero-border">
        </div>
        <div className="hero-paragraph">
          <p>Click on the link to see more details about past launches:</p>
        </div>
        <ul className="data-list">
          {launches.map((launch, index) => (
            <div key={index}>
              <li className="data-list-item">
                <Link to={`/details/${launch.id}`}>{launch.mission_name}</Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
  );
};

function useLaunches() {
  const [launches, setLaunches] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: getLaunches })
    }).then(response => response.json()).then(data => setLaunches(data.data.launchesPast))
  }, []);

  return launches;
}

const getLaunches = `
{
  launchesPast(limit: 5) {
    details
    mission_name
    launch_date_local
    launch_site {
      site_name_long
    }
    links {
      video_link
    }
    rocket {
      rocket_name
    }
    ships {
      name
    }
    launch_success
    id
  }
}
`

export default PastLaunches;
