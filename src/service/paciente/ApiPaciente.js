import axios from "axios";

const paciente = {
  getPacientes: async function () {
    let res = await axios.get("http://localhost:3030/paciente/");
    let { data } = await res;
    console.log(data);
    return data;
  },

  getPaciente: async function (id) {
    let res = await axios.get("http://localhost:3030/paciente/", { params: { id } });
    let { data } = await res;
    return data;
  },

  postPaciente: async function (dados) {
    try {
      const res = await axios.post("http://localhost:3030/paciente/", dados);
      return res.data;
    } catch (error) {
      throw new Error(error.res.data);
    }
  },
};

export default paciente;
