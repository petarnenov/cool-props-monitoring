import { useEffect, useMemo } from "react";
import { Monitoring } from "../Monitoring";

const withPropsMonitoring = (Component) => {
  return function ComponentWithPropsMonitoring(props) {
    const propsToMonitoring = useMemo(
      () =>
        Object.keys(props).reduce((acc, key) => {
          acc[key] = { value: props[key], counter: 0 };
          return acc;
        }, {}),
      []
    );

    useEffect(() => {
      Object.keys(propsToMonitoring).forEach((k) => {
        if (propsToMonitoring[k].value !== props[k]) {
          propsToMonitoring[k].counter++;
        }
      });
    }, [props]);

    return (
      <>        
          <Monitoring
            propsToMonitoring={propsToMonitoring}
            componentName={Component.name}
          />        
        <Component {...props} />
      </>
    );
  };
};

export default withPropsMonitoring;
