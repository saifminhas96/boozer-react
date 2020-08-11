const BASE_URL = "http://localhost:3000/api/v1";

const getAllCocktails = () => {
  return fetch(BASE_URL + "/cocktails").then((resp) => resp.json());
};

const getCocktailDetails = (id) => {
  return fetch(BASE_URL + `/cocktails/${id}`).then((resp) => resp.json());
};

export default {
  getAllCocktails,
  getCocktailDetails,
};
