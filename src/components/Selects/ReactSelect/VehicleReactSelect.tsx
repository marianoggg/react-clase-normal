import { useState, useEffect } from "react";
import Select from "react-select";

type Props = {};

function VehicleReactSelect({}: Props) {
  const carOptions = [
    { value: "toyota", label: "Toyota" },
    { value: "ford", label: "Ford" },
    { value: "honda", label: "Honda" },
  ];

  const colorOptions = [
    { value: "rojo", label: "Rojo" },
    { value: "azul", label: "Azul" },
    { value: "negro", label: "Negro" },
  ];

  const FORMDATA_INIT = {
    car: "",
    color: "",
  };

  const [formData, setFormData] = useState(FORMDATA_INIT);

  function handleChangeCar(evento: any) {
    setFormData((prev) => {
      return { ...prev, car: evento?.value };
    });
  }

  function handleChangeColor(evento: any) {
    setFormData((prev) => {
      return { ...prev, color: evento?.value };
    });
  }

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <>
      <h6>Configurá tu auto</h6>

      {/* Select de autos */}
      <label>Auto:</label>
      <Select
        options={carOptions}
        value={carOptions.find((os) => os.value === formData.car) || null}
        onChange={handleChangeCar}
        placeholder="Elegí un auto"
        isClearable
      />

      {/* Select de colores */}
      <label>Color:</label>
      <Select
        options={colorOptions}
        value={colorOptions.find((os) => os.value === formData.color) || null}
        onChange={handleChangeColor}
        placeholder="Elegí un color"
        isClearable
      />
    </>
  );
}

export default VehicleReactSelect;
