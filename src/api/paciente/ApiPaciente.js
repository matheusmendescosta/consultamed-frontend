import axios from "axios";

const paciente = {
  getPacientes: async function () {
    let res = await axios.get("http://localhost:3030/paciente/");
    let { data } = await res;
    console.log(data);
    return data;
  },
};

export default paciente;
