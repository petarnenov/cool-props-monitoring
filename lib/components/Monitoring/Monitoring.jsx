import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Monitoring.module.scss";

const Monitoring = ({ propsToMonitoring, componentName }) => {
  const [showMonitoring, setShowMonitoring] = useState(true);

  const onKeyDown = (e) => {
    if (e.ctrlKey && e.code === "KeyM") {
      setShowMonitoring((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleMouseUp = useCallback(
    (key) => () => console.log(`${key}: `, propsToMonitoring[key].value),
    [propsToMonitoring]
  );

  return (
    <>
      {showMonitoring ? (
        <section className={styles.container}>
          <ul>
            <h4>Props Monitoring {componentName}</h4>
            {propsToMonitoring &&
              Object.keys(propsToMonitoring).map((key) => {
                const changed = propsToMonitoring[key].counter > 2;

                return (
                  <li
                    key={key}
                    className={classnames({
                      [styles.changed]: changed,
                    })}
                    onMouseUp={handleMouseUp(key)}
                  >
                    <span>{key}</span>
                    <span>{propsToMonitoring[key].counter}</span>
                  </li>
                );
              })}
          </ul>
        </section>
      ) : null}
    </>
  );
};

Monitoring.propTypes = {
  propsToMonitoring: PropTypes.object,
  componentName: PropTypes.string,
};

export default Monitoring;
