import { useState } from "react";
import PropTypes from "prop-types";
import withPropsMonitoring from "../";

import { Button } from "./components";

const ButtonWithPropsMonitoring = withPropsMonitoring(Button);

function App() {
  const [id, setId] = useState(Date.now());
  const [appCounter, setAppCounter] = useState(0);

  // const handleMemoBtnClick  = useCallback(() => {
  //   console.log("Button 2/3 clicked");
  //   setAppCounter((prev) => prev + 1);
  //   setId(Date.now());
  // }, []);

  //every time App renders, different handler is created
  //and ButtonWithPropsMonitoring rerenders
  const handleBtnClick = () => {
    console.log("Button 1 clicked");
    //simulate rerender
    setAppCounter((prev) => prev + 1);
    setId(Date.now());
  };

  return (
    <main id={id}>
      <h1>HOC [withPropMonitoring] playground</h1>
      <h2>App rerender counter {appCounter}</h2>
      <ButtonWithPropsMonitoring
        btnText="Button 1"
        btnType="primary"
        onClick={handleBtnClick}
      />
    </main>
  );
}

App.propTypes = {
  age: PropTypes.number,
};

export default App;
