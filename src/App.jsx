import PropTypes from "prop-types";

import withPropsMonitoring from "../";

function App({age}) {
  return (
    <>
      <h1>Hello Demo</h1>
      <h2>Age: {age}</h2>
    </>
  )
}

App.propTypes={
  age: PropTypes.number
};

const AppWithPropsMonitoring = withPropsMonitoring(App);

export default AppWithPropsMonitoring;
