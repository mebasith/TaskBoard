import React from 'react';
import { connect } from 'react-redux';
import { fetchRobots, deleteRobot } from '../redux/robots';
import { Link } from 'react-router-dom';
import RobotForm from './RobotForm';

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {
  componentDidMount() {
    this.props.getRobots();
  }

  render() {
    const robots = this.props.robots;
    return (
      <div className="TextCenter">
        <h3>Add a Robot to Staff:</h3>
        <RobotForm />
        <h2>Robots on Duty:</h2>
        <div className="Allcards">
        {robots.map((robot) => (
          <div key={robot.id} className="Card">
            <h3>
              <div className="Card-title">
              <Link to={`/robots/${robot.id}`}>{robot.name}</Link>
              </div>
              <span>
                <button
                  type="button"
                  onClick={() => this.props.removeRobot(robot)}
                >
                  ❌
                </button>
              </span>
            </h3>
            <Link to={`/robots/${robot.id}`}>
              <div className="Card-image PicLink">
              <img src={robot.imageUrl} alt={robot.name} />
              </div>
            </Link>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    robots: state.robots,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getRobots: () => dispatch(fetchRobots()),
    removeRobot: (robot) => dispatch(deleteRobot(robot)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AllRobots);
