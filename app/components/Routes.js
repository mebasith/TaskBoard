import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AllRobots from './AllRobots';
import AllProjects from './AllProjects';
import SingleRobot from './SingleRobot';
import SingleProject from './SingleProject';
import RobotForm from './RobotForm';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-item">
          <Link to="/">HOME</Link>
          </div>
          <div className="nav-item">
          <Link to="/robots">ROBOTS</Link>
          </div>
          <div className="nav-item">
          <Link to="/projects">PROJECTS</Link>
          </div>
        </nav>
        <main>
          <h1>
            Welcome to StackBot Project Management
          </h1>
        </main>
        <Switch>
          <Route exact path="/" component={AllRobots} />
          <Route exact path="/" component={RobotForm} />
          <Route exact path="/robots" component={AllRobots} />
          <Route path="/robots/:robotId" component={SingleRobot} />
          <Route exact path="/projects" component={AllProjects} />
          <Route path="/projects/:projectId" component={SingleProject} />
          <Route render = {() => <p>Sorry this page does not exist</p>} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
