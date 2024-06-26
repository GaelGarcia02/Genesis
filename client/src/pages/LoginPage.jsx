import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { handleSuccess, handleError } from "../utils/sweetAlerts.js";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { register, handleSubmit } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signin(data);
    } catch (error) {}
  });

  useEffect(() => {
    if (signinErrors && signinErrors.length > 0) {
      handleError("Credenciales incorrectas. Inténtelo de nuevo.");
    }
  }, [signinErrors]);

  useEffect(() => {
    if (isAuthenticated) {
      handleSuccess("Inicio de sesión exitoso");
      navigate("/verification");
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center overflow-scroll h-screen  /**/  lg:flex-row lg:overflow-hidden ">
      <aside className="flex justify-center items-center w-4/12 max-h-60% min-h-20% /**/ lg:max-h-full lg:w-7/12 lg:h-full">
        <img
          src={logo}
          alt="logo"
          className="max-w-90% mb-6 h-auto w-full /**/ lg:max-w-45% lg:mb-0 aspect-auto"
        />
      </aside>
      <main className="bg-[#448dc9] w-12/12 p-8 flex flex-col  /**/ lg:h-screen lg:justify-center lg:w-5/12 lg:mb-0 sm:items-center">
        <h1 className="text-5xl mb-10 font-extrabold text-white text-center">
          ¡Bienvenido!
        </h1>
        <div className="bg-white w-full max-w-full p-10 rounded-lg mb-10 /**/ lg:mb-0 sm:max-w-85% xl:max-w-70%">
          <h1 className="text-2xl lg:mb-8 mb-4 text-center font-extrabold">
            Inicio de Sesión
          </h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="font-medium" htmlFor="email">
                Correo Electrónico:
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
                placeholder="example@example.com"
                id="email"
              />
            </div>
            <div className="mb-4">
              <label className="font-medium" htmlFor="password">
                Contraseña:
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
                placeholder="**********"
                id="password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!formData.email || !formData.password}
                className={`my-4 w-max rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out ${
                  !formData.email || !formData.password
                    ? "bg-[#274f70] cursor-not-allowed"
                    : "bg-[#448dc9] hover:bg-[#346c99] text-white"
                }`}
              >
                ENTRAR
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
