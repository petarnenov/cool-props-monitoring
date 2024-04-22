import { useEffect, useRef, useState } from "react";
import { Monitoring } from "../Monitoring";

const withPropsMonitoring = (Component) => {
  return function ComponentWithPropsMonitoring(props) {
    const [update, setUpdate] = useState(Date.now());

    const propsToMonitoring = useRef(
      Object.keys(props).reduce((acc, key) => {
        acc[key] = { value: props[key], counter: 0 };
        return acc;
      }, {}),
    );

    useEffect(() => {
      Object.keys(propsToMonitoring.current).forEach((key) => {
        if (propsToMonitoring.current[key].value !== props[key]) {
          propsToMonitoring.current[key].counter++;
          propsToMonitoring.current[key].value = props[key];
          setUpdate(() => Date.now());
        }
      });
    }, [props]);

    return (
      <>
        <Monitoring
          id={update}
          propsToMonitoring={propsToMonitoring.current}
          componentName={Component.name}
        />
        <Component {...props} />
      </>
    );
  };
};

export default withPropsMonitoring;
