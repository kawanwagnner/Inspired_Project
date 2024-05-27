const locationModel = require("../model/locationModel.js");

exports.getAllLocation = async (req, res) => {
  try {
    const location = await locationModel.getAllLocation();
    // console.log(location);
    res.render("listLocation", { location: location });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

exports.getContact = async (req, res) => {
  try {
    res.render("contact");
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

exports.getForm = async (req, res) => {
  try {
    res.render("forms");
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

exports.newDataForm = async (req, res) => {
  try {
    const { cidade, sigla, bairro } = req.body;

    const locations = await locationModel.getAllLocation();
    const isExisting = locations.some(
      (location) =>
        location.cidade === cidade &&
        location.sigla === sigla &&
        location.bairro === bairro
    );

    if (isExisting) {
      return res.redirect("/error?errorMessage=Local já cadastrado");
    }

    locations.push({ cidade, sigla, bairro });
    await locationModel.writeLocationToFile(locations);

    // Redirecionar para a página inicial com mensagem de sucesso
    res.redirect("/listLocation");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a solicitação" });
  }
};

exports.getHome = async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};
