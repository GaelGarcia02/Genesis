import { useForm } from "react-hook-form";
import { useUsers } from "../context/UsersContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm();
  const {
    createUser,
    getUser,
    updateUser,
    errors: usersErrors,
    userAdd,
  } = useUsers();
  const navigate = useNavigate();
  const [resetForm, setResetForm] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
        setValue("username", user.username);
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("password", user.password);
        setValue("typeUser", user.typeUser);
      }
    }
    loadUser();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateUser(params.id, data);
        setResetForm(true);
      } else {
        await createUser(data);
        setResetForm(true);
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (resetForm && userAdd) {
      const timer = setTimeout(() => {
        setResetForm(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resetForm, userAdd]);

  useEffect(() => {
    if (resetForm && userAdd) {
      navigate("/users");
    }
  }, [resetForm, userAdd, navigate]);

  return (
    <div className="bg-white w-full p-10 rounded-lg mb-10 /**/ h-auto lg:mb-0 sm:max-w-85% xl:max-w-70%">
      {usersErrors.map((error, i) => (
        <div className="bg-red-500 p-2 mb-4 text-white text-center" key={i}>
          {error}
        </div>
      ))}
      <h1 className="text-2xl lg:mb-6 mb-4 text-center font-extrabold">
        Registro
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <label className="font-medium" htmlFor="username">
            Nombre de Usuario:
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            placeholder="Ej: NombreDeUsuario"
            id="username"
          />
          {formErrors.username && (
            <p className="text-red-500">El nombre de usuario es requerido</p>
          )}
        </div>
        <div className="mb-2">
          <label className="font-medium" htmlFor="name">
            Nombre:
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            placeholder="Ej: Sergio Amador"
            id="name"
          />
          {formErrors.name && (
            <p className="text-red-500">El nombre es requerido</p>
          )}
        </div>
        <div className="mb-2">
          <label className="font-medium" htmlFor="email">
            Correo Electrónico:
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            placeholder="Ej: example@gmail.com"
            id="email"
          />
          {formErrors.email && (
            <p className="text-red-500">El email es requerido</p>
          )}
        </div>
        <div className="mb-2">
          <label className="font-medium" htmlFor="password">
            Contraseña:
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            placeholder="**************"
            id="password"
          />
          {formErrors.password && (
            <p className="text-red-500">La contraseña es requerida</p>
          )}
        </div>
        <div className="mb-2">
          <label className="font-medium" htmlFor="typeUser">
            Tipo de Usuario:
          </label>
          <select
            type="typeUser"
            {...register("typeUser", { required: true })}
            className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            placeholder="Seleccione el tipo de usuario"
            id="typeUser"
          >
            <option value="">--Seleccione el tipo de usuario--</option>
            <option value="common">Usuario Normal</option>
            <option value="manager">Usuario Encargado</option>
          </select>
          {formErrors.typeUser && (
            <p className="text-red-500">El tipo de usuario es requerido</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="my-4 w-full bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserFormPage;
