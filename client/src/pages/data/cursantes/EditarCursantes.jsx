import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/helpers";
import Swal from "sweetalert2";

export const EditarCursantes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cursante, setCursante] = useState({
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
    modalidad: "",
    tallere_1: "",
    tallere_2: "",
    tallere_3: "",
    tallere_4: "",
    publicaciones: "",
    eventos_cientificos: "",
    clases_pegrado: "",
    clases_posgrado: "",
    tesis_maestria: "",
    trabajo_diploma: "",
    redes_academicas: "",
    contenidos_comunes: "", 
    contenidos_accionales: "",
    tallere_5: "",
    predefensa: "",
    dictamenPositivoSeñalamientos: "",  
    edicionTesisPDF: "",
    defensa: "",
    totalCreditos: "0"
  });

  useEffect(() => {
    const fetchCursante = async () => {
      try {
        const response = await API_URL.get(`/cursantes/${id}`);
        const cursanteData = response.data;
        
        console.log("Datos recibidos:", cursanteData);
        Object.keys(cursante).forEach(key => {
          if (cursanteData[key] === undefined || cursanteData[key] === null) {
            cursanteData[key] = "";
          }
         
        });
        
        setCursante(cursanteData);
      } catch (error) {
        console.error("Error fetching cursante data:", error);
        Swal.fire({
          icon: "error",
          title: "Error al cargar los datos del cursante.",
          text: "Por favor, intente nuevamente.",
          confirmButtonText: "Aceptar"
        });
      }
    };

    fetchCursante();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCursante((prevState) => {
      const updatedState = { ...prevState, [id]: value.toString() };
      const creditFields = ['tallere_1', 'tallere_2', 'tallere_3', 'tallere_4', 'publicaciones', 'eventos_cientificos', 'clases_pegrado', 'clases_posgrado', 'tesis_maestria', 'trabajo_diploma', 'trabajo_diploma', 'redes_academicas', 'contenidos_comunes', 'contenidos_accionales', 'tallere_5', 'predefensa', 'dictamenPositivoSeñalamientos', 'edicionTesisPDF'];

      if (creditFields.includes(id)) {
        const totalCreditos = creditFields.reduce((sum, field) =>
          sum + parseInt(field === id ? value : updatedState[field] || "0", 10), 0);
        updatedState.totalCreditos = totalCreditos.toString();
      }

      return updatedState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API_URL.put(`/cursantes/${id}`, cursante);
      Swal.fire({
        icon: "success",
        title: "Cursante actualizado correctamente.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Dni Existente",
        text: "El DNI ingresado ya existe en la base de datos.",
        confirmButtonText: "Aceptar"
      });
    }
  };

  const handleCancel = () => {
    navigate("/allcursantes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Editar Cursante
            </h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {[
                  { id: "dni", label: "DNI", type: "number", required: true },
                  {
                    id: "nombre",
                    label: "Nombre",
                    type: "text",
                    required: true
                  },
                  {
                    id: "apellidos",
                    label: "Apellidos",
                    type: "text",
                    required: true
                  },
                  {
                    id: "tituloUniversitario",
                    label: "Título Universitario",
                    type: "text",
                    required: true
                  },
                  {
                    id: "fecha_ingreso",
                    label: "Fecha de Ingreso",
                    type: "date",
                    required: true
                  },
                  { id: "pais", label: "País", type: "text", required: true },
                  {
                    id: "provincia",
                    label: "Provincia",
                    type: "text",
                    required: true
                  },
                  {
                    id: "municipio",
                    label: "Municipio",
                    type: "text",
                    required: true
                  },
                  {
                    id: "telefonoParticular",
                    label: "Teléfono Particular",
                    type: "number",
                    required: true
                  },
                  {
                    id: "correoElectronico",
                    label: "Correo Electrónico",
                    type: "email",
                    required: true
                  },
                  { id: "tema", label: "Tema", type: "text", required: true },
                  {
                    id: "linea",
                    label: "Línea",
                    type: "select",
                    options: ["1", "2"],
                    required: true
                  },
                  {
                    id: "institucion",
                    label: "Institución",
                    type: "text",
                    required: true
                  },
                  {
                    id: "programa",
                    label: "Programa",
                    type: "text",
                    required: true
                  },
                  {
                    id: "modalidad",
                    label: "Modalidad",
                    type: "text",
                    required: true
                  },
                  {
                    id: "tallere_1",
                    label: "Taller 1",
                    type: "number",
                    required: true
                  },
                  {
                    id: "tallere_2",
                    label: "Taller 2",
                    type: "number",
                    required: true
                  },
                  {
                    id: "tallere_3",
                    label: "Taller 3",
                    type: "number",
                    required: true
                  },
                  {
                    id: "tallere_4",
                    label: "Taller 4",
                    type: "number",
                    required: true
                  },
                  { id: "publicaciones", label: "Publicaciones", type: "number", required: true },
                  { id: "eventos_cientificos", label: "Eventos Científicos", type: "number", required: true },
                  { id: "clases_pegrado", label: "Clases Pegrado", type: "number", required: true },
                  { id: "clases_posgrado", label: "Clases Posgrado", type: "number", required: true },
                  { id: "tesis_maestria", label: "Tesis Maestría", type: "number", required: true },
                  { id: "trabajo_diploma", label: "Trabajo Diploma", type: "number", required: true },
                  { id: "redes_academicas", label: "Redes Académicas", type: "number", required: true },
                  { id: "contenidos_comunes", label: "Contenidos Comunes", type: "number", required: true },
                  { id: "contenidos_accionales", label: "Contenidos Accionales", type: "number", required: true },
                  {
                    id: "tallere_5",
                    label: "Taller 5",
                    type: "number",
                    required: true
                  },
                  {
                    id: "predefensa",
                    label: "Predefensa",
                    type: "number",
                    required: true
                  },
                  { id: "dictamenPositivoSeñalamientos", label: "Dictamen Positivo Señalamientos", type: "number", required: true },
                  { id: "edicionTesisPDF", label: "Edición Tesis PDF", type: "number", required: true },
                  {
                    id: "defensa",
                    label: "Defensa",
                    type: "text",
                    required: true
                  },
                ].map(({ id, label, type, required, options }) => (
                  <div key={id} className="relative">
                    <label
                      htmlFor={id}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {label}:
                    </label>
                    {type === "select" ? (
                      <select
                        id={id}
                        value={cursante[id]}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
                        required={required}
                      >
                        <option value="">Seleccione una opción</option>
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        id={id}
                        value={cursante[id]}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
                        required={required}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="pt-5">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
              
              <div className="pt-5">
                <div className="relative">
                  <label
                    htmlFor="totalCreditos"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Créditos:
                  </label>
                  <input
                    type="number"
                    id="totalCreditos"
                    value={cursante.totalCreditos}
                    readOnly
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

