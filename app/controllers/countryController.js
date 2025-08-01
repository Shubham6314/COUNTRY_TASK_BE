const axios = require("axios");
const ApiError = require("../utils/apiError.js");

exports.getCountries = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return next(new ApiError(400, "Country name is required."));
  }

  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${name}`
    );

    const data = response.data.map((country) => ({
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      cca2: country.cca2,
      cca3: country.cca3,
    }));

    return res.status(200).json(data);
  } catch (error) {
    if (error.response?.status === 404) {
      return next(
        new ApiError(404, "No countries found matching your search.")
      );
    }

    console.error("Unexpected error:", error.message);
    return next(new ApiError(500, "Error fetching countries data."));
  }
};

exports.getCountryDetail = async (req, res) => {
  const { code } = req.params;

  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const country = response.data[0];

    const detail = {
      name: country.name.common,
      capital: country.capital?.[0] || "N/A",
      region: country.region,
      subregion: country.subregion,
      population: country.population,
      languages: country.languages ? Object.values(country.languages) : [],
      flag: country.flags.svg,
    };

    res.json(detail);
  } catch (error) {
    throw new ApiError(500, "Error fetching country details");
  }
};
