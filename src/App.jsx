import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import withPropsMonitoring from "../lib/main";

import { Button } from "./components";

const ButtonWithPropsMonitoring = withPropsMonitoring(Button);

function App() {
  const [id, setId] = useState(Date.now());
  const [appCounter, setAppCounter] = useState(0);

  //every time App renders, different handler is created
  //and ButtonWithPropsMonitoring rerenders
  const handleBtn1Click = () => {
    console.log("Button 1 clicked");
    //simulate rerender
    setAppCounter((prev) => prev + 1);
    setId(Date.now());
  };

  const getBtnText1 = (<>
    <span>Hello World</span>
    <span>!</span>
  </>)

  const handleBtn2Click = useCallback(() => {
    console.log("Button 2/3 clicked");
    setAppCounter((prev) => prev + 1);
    setId(Date.now());
  }, []);

  const getBtnText2 = useMemo(() => (<>
    <span>Hello World</span>
    <span>!</span>
  </>), [])

  return (
    <main id={id}>
      <h1>HOC [withPropMonitoring] playground</h1>
      <h2>App rerender counter {appCounter}</h2>
      <ButtonWithPropsMonitoring
        btnText={getBtnText1}
        btnType="primary"
        onClick={handleBtn1Click}
      />
      <ButtonWithPropsMonitoring
        btnText={getBtnText2}
        btnType="secondary"
        onClick={handleBtn2Click}
      />
      <ButtonWithPropsMonitoring
        btnText="Simple Success Button"
        btnType="success"
        onClick={()=>console.log("Button 3 clicked")}
      />
    </main>
  );
}

App.propTypes = {
  age: PropTypes.number,
};

export default App;
