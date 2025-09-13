import React from "react";
import {
  NativeSelect,
  VehicleSelect,
} from "../components/Selects/NativeSelect/NativeSelect";
import VehicleReactSelect from "../components/Selects/ReactSelect/VehicleReactSelect";

type Props = {};

function Select({}: Props) {
  return (
    <>
      <div className="m-5 p-3 border rounded">
        <h5>Native select</h5>
        <h6>Ej. sin React</h6>
        <NativeSelect />
        <h6>Ej. con React</h6>
        <VehicleSelect />
      </div>

      <div className="m-5 p-3 border rounded">
        <h5>React select</h5>
        <h6>Ej. simple</h6>
        <VehicleReactSelect />
      </div>
    </>
  );
}

export default Select;
