import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faEye,
  faEyeSlash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../../helpers/helpers";

const userRole = sessionStorage.getItem("role");

const useCursantes = ({ searchTerm, sortKey, sortDirection, currentPage, pageSize, navigate }) => {
  const [cursantes, setCursantes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Llamada de cursantes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_URL.get("/cursantes/");
        let filteredCursantes = response.data;
        if (searchTerm) {
          filteredCursantes = response.data.filter(
            (cursante) =>
              String(cursante.dni).toLowerCase().includes(searchTerm.toLowerCase()) ||
              String(cursante.nombre).toLowerCase().includes(searchTerm.toLowerCase()) ||
              String(cursante.apellidos).toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        const sortedCursantes = filteredCursantes.sort((a, b) => {
          const valueA = a[sortKey];
          const valueB = b[sortKey];
          const stringA = typeof valueA === 'string' ? valueA.toLowerCase() : String(valueA).toLowerCase();
          const stringB = typeof valueB === 'string' ? valueB.toLowerCase() : String(valueB).toLowerCase();
          if (stringA < stringB) return sortDirection === "asc" ? -1 : 1;
          if (stringA > stringB) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
        setTotalPages(Math.ceil(sortedCursantes.length / pageSize));
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setCursantes(sortedCursantes.slice(startIndex, endIndex));
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [searchTerm, sortKey, sortDirection, currentPage, pageSize, navigate]);

  return { cursantes, totalPages };
};

const TableHeader = React.memo(({ label, sortKey, sortDirection, onSort }) => {
  const handleClick = () => {
    onSort(label, sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <th
      className="py-3 px-4 text-left cursor-pointer hover:bg-gray-100 transition-colors duration-200"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col">
          <FontAwesomeIcon
            icon={faChevronUp}
            className={`h-2 w-2 ${sortKey === label && sortDirection === "asc" ? "text-indigo-600" : "text-gray-400"}`}
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`h-2 w-2 ${sortKey === label && sortDirection === "desc" ? "text-indigo-600" : "text-gray-400"}`}
          />
        </div>
      </div>
    </th>
  );
});

const CursanteRow = React.memo(({ cursante, onToggleExtraData, onEdit }) => {
  const [showExtraData, setShowExtraData] = useState(false);

  const toggleExtraData = useCallback(() => {
    setShowExtraData(!showExtraData);
    onToggleExtraData(cursante.id);
  }, [showExtraData, cursante.id, onToggleExtraData]);

  const formatDate = useCallback((dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }, []);

  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition-colors duration-200">
        <td className="py-4 px-4">{cursante.dni}</td>
        <td className="py-4 px-4">{cursante.nombre}</td>
        <td className="py-4 px-4">{cursante.apellidos}</td>
        <td className="py-4 px-4 hidden md:table-cell">{cursante.tituloUniversitario}</td>
        <td className="py-4 px-4 hidden lg:table-cell">{formatDate(cursante.fecha_ingreso)}</td>
        <td className="py-4 px-4">
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 mr-2"
            onClick={toggleExtraData}
          >
            <FontAwesomeIcon icon={showExtraData ? faEyeSlash : faEye} />
          </button>
          { userRole !== "usuario" &&
            <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => onEdit(cursante.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>}
        </td>
      </tr>
      {showExtraData && (
        <tr>
          <td colSpan={6}>
            <div className="px-6 py-4 bg-gray-50 rounded-lg my-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <p><span className="font-semibold">País:</span> {cursante.pais}</p>
                <p><span className="font-semibold">Provincia:</span> {cursante.provincia}</p>
                <p><span className="font-semibold">Municipio:</span> {cursante.municipio}</p>
                <p><span className="font-semibold">Teléfono:</span> {cursante.telefonoParticular}</p>
                <p><span className="font-semibold">Correo:</span> {cursante.correoElectronico}</p>
                <p><span className="font-semibold">Tema:</span> {cursante.tema}</p>
                <p><span className="font-semibold">Línea:</span> {cursante.linea}</p>
                <p><span className="font-semibold">Institución:</span> {cursante.institucion}</p>
                <p><span className="font-semibold">Programa:</span> {cursante.programa}</p>
                <p><span className="font-semibold">Modalidad:</span> {cursante.modalidad}</p>
                <p><span className="font-semibold">Taller 1:</span> {cursante.tallere_1}</p>
                <p><span className="font-semibold">Taller 2:</span> {cursante.tallere_2}</p>
                <p><span className="font-semibold">Taller 3:</span> {cursante.tallere_3}</p>
                <p><span className="font-semibold">Taller 4:</span> {cursante.tallere_4}</p>
                <p><span className="font-semibold">Publicaciones:</span> {cursante.publicaciones}</p>
                <p><span className="font-semibold">Eventos Científicos:</span> {cursante.eventos_cientificos}</p>
                <p><span className="font-semibold">Clases Pegrado:</span> {cursante.clases_pegrado}</p>
                <p><span className="font-semibold">Clases Posgrado:</span> {cursante.clases_posgrado}</p>
                <p><span className="font-semibold">Tesis Maestría:</span> {cursante.tesis_maestria}</p>
                <p><span className="font-semibold">Trabajo Diploma:</span> {cursante.trabajo_diploma}</p>
                <p><span className="font-semibold">Redes Académicas:</span> {cursante.redes_academicas}</p>
                <p><span className="font-semibold">Contenidos Comunes:</span> {cursante.contenidos_comunes}</p> 
                <p><span className="font-semibold">Contenidos Accionales:</span> {cursante.contenidos_accionales}</p>
                <p><span className="font-semibold">Taller 5:</span> {cursante.tallere_5}</p>
                <p><span className="font-semibold">Predefensa:</span> {cursante.predefensa}</p>          
                <p><span className="font-semibold">Dictamen Positivo Señalamientos:</span> {cursante.dictamenPositivoSeñalamientos}</p>
                <p><span className="font-semibold">Edición Tesis PDF:</span> {cursante.edicionTesisPDF}</p>
                <p><span className="font-semibold">Defensa:</span> {cursante.defensa}</p>
                <p><span className="font-semibold">Total de créditos:</span> {cursante.totalCreditos}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </> 
  );
});

export const TablaCursantes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("dni");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const { cursantes, totalPages } = useCursantes({
    searchTerm,
    sortKey,
    sortDirection,
    currentPage,
    pageSize,
    navigate
  });

  const handleEdit = useCallback((id) => {
    navigate(`/update-cursante/${id}`);
  }, [navigate]);

  const handleSort = useCallback((key, direction) => {
    setSortKey(key);
    setSortDirection(direction);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const handleToggleExtraData = useCallback((id) => {
    console.log(`Toggled extra data for cursante with id: ${id}`);
  }, []);

  return (
    <div className="bg-indigo-100 shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-300 to-indigo-600 py-4 px-6">
        <h2 className="text-2xl font-bold text-white text-center">Lista de Cursantes</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative">
            <input
              type="text"
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Buscar cursantes..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="pageSize" className="text-gray-700">
              Mostrar:
            </label>
            <select
              id="pageSize"
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <TableHeader
                  label="DNI"
                  sortKey="dni"
                  sortDirection={sortKey === "dni" ? sortDirection : null}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Nombre"
                  sortKey="nombre"
                  sortDirection={sortKey === "nombre" ? sortDirection : null}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Apellidos"
                  sortKey="apellidos"
                  sortDirection={sortKey === "apellidos" ? sortDirection : null}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Título"
                  sortKey="tituloUniversitario"
                  sortDirection={sortKey === "tituloUniversitario" ? sortDirection : null}
                  onSort={handleSort}
                  className="hidden md:table-cell"
                />
                <TableHeader
                  label="Fecha Ingreso"
                  sortKey="fecha_ingreso"
                  sortDirection={sortKey === "fecha_ingreso" ? sortDirection : null}
                  onSort={handleSort}
                  className="hidden lg:table-cell"
                />
                <th className="py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursantes.map((cursante) => (
                <CursanteRow
                  key={cursante.id}
                  cursante={cursante}
                  onToggleExtraData={handleToggleExtraData}
                  onEdit={handleEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-700 mb-4 sm:mb-0">
            Mostrando {(currentPage - 1) * pageSize + 1} a{" "}
            {Math.min(currentPage * pageSize, cursantes.length)} de{" "}
            {cursantes.length} resultados
          </p>
          <div className="flex flex-wrap justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md mb-2 ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
