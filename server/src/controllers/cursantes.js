
const { connectDB } = require("../config");

// Insertar registro de cursante
const createCursante = async (req, res) => {
  const {
    dni,
    nombre,
    apellidos,
    tituloUniversitario,
    fecha_ingreso,
    pais,
    provincia,
    municipio,
    telefonoParticular,
    correoElectronico,
    tema,
    linea,
    institucion,
    programa,
    modalidad
  } = req.body;

  try {
    const connection = await connectDB();
    const [results] = await connection.query(
      "INSERT INTO cursante (dni, nombre, apellidos, tituloUniversitario, fecha_ingreso, pais, provincia, municipio, telefonoParticular, correoElectronico, tema, linea, institucion, programa, modalidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        dni,
        nombre,
        apellidos,
        tituloUniversitario,
        fecha_ingreso,
        pais,
        provincia,
        municipio,
        telefonoParticular,
        correoElectronico,
        tema,
        linea,
        institucion,
        programa,
        modalidad
      ]
    );
    await connection.end();
    res.json({
      message: "Cursante agregado correctamente.",
      id: results.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Obtener los registros de todos cursantes
const getCursante = async (req, res) => {
  try {
    const connection = await connectDB();
    const [results] = await connection.query("SELECT * FROM cursante");
    await connection.end();
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Obtener registros de un cursante por ID
const getCursanteById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const [results] = await connection.query(
      "SELECT * FROM cursante WHERE id = ?",
      [id]
    );
    await connection.end();
    if (results.length === 0) {
      return res.status(404).json({ message: "Cursante no encontrado." });
    }
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Actualizar registro de un cursante por ID
const updateCursante = async (req, res) => {
  const { id } = req.params;
  const {
    dni,
    nombre,
    apellidos,
    tituloUniversitario,
    fecha_ingreso,
    pais,
    provincia,
    municipio,
    telefonoParticular,
    correoElectronico,
    tema,
    linea,
    institucion,
    programa,
    modalidad,
    tallere_1,
    tallere_2,
    tallere_3,
    tallere_4,
    publicaciones,
    eventos_cientificos,
    clases_pegrado,
    clases_posgrado,
    tesis_maestria,
    trabajo_diploma,
    redes_academicas,
    contenidos_comunes,
    contenidos_accionales,
    tallere_5,
    predefensa,
    dictamenPositivoSeñalamientos,
    edicionTesisPDF,
    totalCreditos,
    defensa
  } = req.body;

  try {
    const connection = await connectDB();
    const [results] = await connection.query(
      "UPDATE cursante SET dni = ?, nombre = ?, apellidos = ?, tituloUniversitario = ? , fecha_ingreso = ?, pais = ?, provincia = ?, municipio = ?, telefonoParticular = ?, correoElectronico = ?, tema = ?, linea = ?, institucion = ?, programa = ?, modalidad = ?, tallere_1 = ?, tallere_2 = ?, tallere_3 = ?, tallere_4 = ?, publicaciones = ?, eventos_cientificos = ?, clases_pegrado = ?, clases_posgrado = ?, tesis_maestria = ?, trabajo_diploma = ?, redes_academicas = ?, contenidos_comunes = ?, contenidos_accionales = ?, tallere_5 = ?, predefensa = ?, dictamenPositivoSeñalamientos = ?, edicionTesisPDF = ?, totalCreditos = ?, defensa = ? WHERE id = ?",
      [
        dni || null,
        nombre || null,
        apellidos || null,
        tituloUniversitario || null,
        fecha_ingreso || null,
        pais || null,
        provincia || null,
        municipio || null,
        telefonoParticular || null,
        correoElectronico || null,
        tema || null,
        linea,
        institucion || null,
        programa || null,
        modalidad || null,
        tallere_1,
        tallere_2,
        tallere_3,
        tallere_4,
        publicaciones,
        eventos_cientificos,
        clases_pegrado,
        clases_posgrado,
        tesis_maestria,
        trabajo_diploma,
        redes_academicas,
        contenidos_comunes,
        contenidos_accionales,
        tallere_5,
        predefensa || null,
        dictamenPositivoSeñalamientos || null,
        edicionTesisPDF || null,
        totalCreditos || null,
        defensa || null,
        id
      ]
    );
    await connection.end();
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Cursante no encontrado." });
    }
    res.json({
      message: "Cursante actualizado correctamente."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Eliminar registro un cursante por ID
const deleteCursante = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const [results] = await connection.query(
      "DELETE FROM cursante WHERE id = ?",
      [id]
    );
    await connection.end();
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Cursante no encontrado." });
    }
    res.json({
      message: "Cursante eliminado correctamente."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = {
  getCursante,
  getCursanteById,
  createCursante,
  updateCursante,
  deleteCursante
};
