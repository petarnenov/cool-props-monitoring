import { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Monitoring.module.scss";

const Monitoring = ({ propsToMonitoring, componentName, id }) => {
  const [showMonitoring, setShowMonitoring] = useState(true);
  const [root, setRoot] = useState(null);

  useEffect(() => {
    let root = document.getElementById("metrics-monitoring");
    if (!root) {
      root = document.createElement("div");
      root.id = "metrics-monitoring";
      root.className = styles.root;
      document.body.appendChild(root);
    }
    setRoot(root);
  }, []);

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

  const renderMonitoring = useMemo(() => (<>
    {showMonitoring ? (
      <section className={styles.container} id={id}>
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
  ), [propsToMonitoring, showMonitoring, handleMouseUp, componentName, id]);

  return (<>
    {root ?
      ReactDOM.createPortal(renderMonitoring, document.getElementById("metrics-monitoring"))
      : null}
  </>)
}

Monitoring.propTypes = {
  propsToMonitoring: PropTypes.object,
  componentName: PropTypes.string,
  id: PropTypes.number,
};

export default Monitoring;
