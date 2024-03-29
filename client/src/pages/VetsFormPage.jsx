import { useForm } from "react-hook-form";
import { useVets } from "../context/VetsContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VetFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm();
  const {
    createVet,
    getVet,
    updateVet,
    errors: vetsErrors,
    vetAdd,
  } = useVets();
  const navigate = useNavigate();
  const [resetForm, setResetForm] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function loadHorse() {
      if (params.id) {
        const vet = await getVet(params.id);
        console.log(vet);
        setValue("firstName", vet.firstName);
        setValue("lastName", vet.lastName);
        setValue("age", vet.age);
        setValue("gender", vet.gender);
        setValue("email", vet.email);
        setValue("phone", vet.phone);
      }
    }
    loadHorse();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        updateVet(params.id, data);
        setResetForm(true);
      } else {
        await createVet(data);
        setResetForm(true);
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (resetForm && vetAdd) {
      const timer = setTimeout(() => {
        setResetForm(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resetForm, vetAdd]);

  useEffect(() => {
    if (resetForm && vetAdd) {
      navigate("/vets");
    }
  }, [resetForm, vetAdd, navigate]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" mb-10 p-10 w-full /**/ xl:w-40% lg:w-50% md:w-60%">
        {vetsErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Agregar Veterinario
          </h1>

          <div className="mb-4">
            <label className="font-medium" htmlFor="firstName">
              Nombre:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Nombre"
              autoComplete="firstName"
              autoFocus
              {...register("firstName", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.firstName && (
              <p className="text-red-500 mb-2">El nombre es requerido</p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-medium" htmlFor="lastName">
              Apellido:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Apellido"
              autoComplete="lastName"
              {...register("lastName", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.lastName && (
              <p className="text-red-500 mb-2">El apellido es requerido</p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-medium" htmlFor="age">
              Edad:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Edad"
              autoComplete="age"
              {...register("age", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.age && (
              <p className="text-red-500 mb-2">La edad es requerida</p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-medium" htmlFor="email">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo Electrónico"
              autoComplete="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.email && (
              <p className="text-red-500 mb-2">El email es requerido</p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-medium" htmlFor="phone">
              Teléfono:
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Número de Teléfono"
              autoComplete="phone"
              minLength={10}
              maxLength={10}
              {...register("phone", { required: true })}
              className="w-full px-4 py-2 rounded-2xl mb-2 border border-black"
            />
            {formErrors.phone && (
              <p className="text-red-500 mb-2">El nombre es requerido</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-max bg-[#57ae60] rounded-2xl font-bold py-2 px-4 transition duration-150 ease-in-out hover:bg-[#376e3c] text-white"
            >
              Hecho
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VetFormPage;
