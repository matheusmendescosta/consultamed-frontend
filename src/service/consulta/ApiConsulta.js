import axios from "axios";

const consulta = {
  getConsultas: async function () {
    let res = await axios.get("http://localhost:3030/consulta?pacienteId=2");
    let { data } = await res;
    return data;
  },

  getHistoricoConsultas: async function () {
    let res = await axios.get("http://localhost:3030/historicoConsultas");
    let { data } = await res;
    return data;
  },

  postConsulta: async function (dados) {
    try {
      let res = await axios.post("http://localhost:3030/consulta", dados);
      return res.data;
    } catch (error) {
      throw new Error(error.res.data);
    }
  },
};

export default consulta;
