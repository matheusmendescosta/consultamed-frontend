import axios from "axios";

const medico = {
  getMedicos: async function () {
    let res = await axios.get("http://localhost:3030/medico/");
    let { data } = await res;
    return data;
  },

  postMedico: async function (dados) {
    try {
      const res = await axios.post("http://localhost:3030/medico/", dados);
      return res.data;
    } catch (error) {
      throw new Error(error.res.data);
    }
  },
};

export default medico;
