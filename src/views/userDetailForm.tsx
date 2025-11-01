import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {};

//deifnimos los ttipos de lso datos del formulario
interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

function userDetailForm({}: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  //funcion que se ejecuta al enviar el form
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First name: </label>
        <input
          {...register("firstName", { required: "First name es requerido." })}
        />
        <p className="text-danger">{errors.firstName?.message}</p>
      </div>

      <div>
        <label>Last name</label>
        <input
          {...register("lastName", { required: "Last name es requerido" })}
        />
        <p>{errors.lastName?.message}</p>
      </div>

      <div>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email es requerido",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email no es válido.",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}

export default userDetailForm;
