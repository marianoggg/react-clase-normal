import { useState, useEffect } from "react";

type Props = {};

export function NativeSelect({}: Props) {
  return (
    <div className="d-flex gap-4">
      <span>
        <label htmlFor="frutas">Elige una fruta: </label>
        <select name="frutas" id="frutas">
          <option value="manzana">Manzana</option>
          <option value="banana">Banana</option>
          <option value="naranja">Naranja</option>
        </select>
      </span>

      <span>
        <select name="lenguajes" multiple size={4}>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
          <option value="ts">TypeScript</option>
        </select>
      </span>
    </div>
  );
}

export function VehicleSelect({}: {}) {
  const FORMDATA_INIT = {
    car: "",
    color: "",
  };

  const [formData, setFormData] = useState(FORMDATA_INIT);

  function handleChange(evento: any) {
    const { name, value } = evento.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <div>
      <h6>Configurá tu auto</h6>

      {/* Select de autos */}
      <label>
        Auto:
        <select name={"car"} onChange={handleChange} value={formData.car}>
          <option value="">-- Elegí un auto --</option>
          <option value="toyota">Toyota</option>
          <option value="ford">Ford</option>
          <option value="honda">Honda</option>
          <option value="toto">Toto</option>
        </select>
      </label>

      <br />
      <br />

      {/* Select de colores */}
      <label>
        Color:
        <select name="color" onChange={handleChange} value={formData.color}>
          <option value="">-- Elegí un color --</option>
          <option value="rojo">Rojo</option>
          <option value="azul">Azul</option>
          <option value="negro">Negro</option>
        </select>
      </label>

      <br />
      <br />

      {/* Mostrar objeto  */}
      <pre>{JSON.stringify(formData, null, 2)}</pre>

      {/* Mostrar un mensaje */}
      {formData.car && formData.color && (
        <p>
          Elegiste un <strong>{formData.car}</strong> de color{" "}
          <strong>{formData.color}</strong>
        </p>
      )}
    </div>
  );
}
