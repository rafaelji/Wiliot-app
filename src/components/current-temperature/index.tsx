import React, { FC } from "react";
import { CurrentTemperatureProps } from "../../common/types";

import "./style.css";

const CurrentTemperature: FC<CurrentTemperatureProps> = ({
  id,
  temperature,
}) => {
  return (
    <div className={"id-temperature"}>
      <p className={"id-temperature-title"}>ID {id}</p>
      <p className={"id-temperature-value"}>Temp: {temperature} C</p>
    </div>
  );
};

export default CurrentTemperature;
