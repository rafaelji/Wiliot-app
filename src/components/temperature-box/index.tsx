import React, { FC, useEffect, useState } from "react";
import CurrentTemperature from "../current-temperature";
import { TemperatureBoxProps } from "../../common/types";

import "./style.css";

const TemperatureBox: FC<TemperatureBoxProps> = ({ data }) => {
  const [id1Data, setId1Data] = useState<{ id: number; temperature: number }>();
  const [id2Data, setId2Data] = useState<{ id: number; temperature: number }>();

  useEffect(() => {
    const list = data.filter((item) => item.id === 1);
    setId1Data(list[list.length - 1]);
  }, [data]);

  useEffect(() => {
    const list = data.filter((item) => item.id === 2);
    setId2Data(list[list.length - 1]);
  }, [data]);

  return (
    <div className={"temperature-box"}>
      {id1Data && (
        <CurrentTemperature id={id1Data.id} temperature={id1Data.temperature} />
      )}
      {id2Data && (
        <CurrentTemperature id={id2Data.id} temperature={id2Data.temperature} />
      )}
    </div>
  );
};

export default TemperatureBox;
