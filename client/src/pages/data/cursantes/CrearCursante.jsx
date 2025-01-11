import { useState } from "react";
import { API_URL } from "../../../helpers/helpers";

export const CrearCursantes = () => {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellidos: "",
    tituloUniversitario: "",
    fecha_ingreso: "",
    pais: "",
    provincia: "",
    municipio: "",
    telefonoParticular: "",
    correoElectronico: "",
    tema: "",
    linea: "",
    institucion: "",
    programa: "",
    modalidad: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({
    dni: "",
    nombre: "",
    apellidos: "",
    tituloUniversitario: "",
    fecha_ingreso: "",
    pais: "",
    provincia: "",
    municipio: "",
    telefonoParticular: "",
    correoElectronico: "",
    tema: "",
    linea: "",
    institucion: "",
    programa: "",
    modalidad: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.correoElectronico || !validateEmail(formData.correoElectronico)) {
      errors.correoElectronico = "Correo electrónico no válido";
    }
    // Add other validations here if needed
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await API_URL.post("/cursantes", formData);
      setSuccess(true);
      setFormData({
        dni: "",
        nombre: "",
        apellidos: "",
        tituloUniversitario: "",
        fecha_ingreso: "",
        pais: "",
        provincia: "",
        municipio: "",
        telefonoParticular: "",
        correoElectronico: "",
        tema: "",
        linea: "",
        institucion: "",
        programa: "",
        modalidad: ""
      });
    } catch (error) {
      console.error(error);
      setError("Dni Existente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 py-10">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Agregar Cursantes
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              {Object.entries(formData).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-50 p-3 rounded-lg transition duration-150 ease-in-out hover:bg-gray-100"
                >
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </label>
                  {formErrors[key] && (
                    <div className="text-red-600 text-sm mb-2">
                      {formErrors[key]}
                    </div>
                  )}
                  {key === "linea" ? (
                    <select
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out hover:border-indigo-300"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  ) : (
                    <input
                      type={
                        key === "dni" || key === "telefonoParticular"
                          ? "number"
                          : key === "nombre" ||
                            key === "apellidos" ||
                            key === "tituloUniversitario" ||
                            key === "pais" ||
                            key === "provincia" ||
                            key === "municipio" ||
                            key === "telefonoParticular" ||
                            key === "correoElectronico" ||
                            key === "tema"
                          ? "text"
                          : key === "fecha_ingreso"
                          ? "date"
                          : "text"
                      }
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out hover:border-indigo-300"
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Cursante agregado correctamente.
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? "Agregando..." : "Agregar Cursante"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
