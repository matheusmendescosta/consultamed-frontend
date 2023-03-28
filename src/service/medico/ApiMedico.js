import axios from "axios";

const medico = {
  getMedicos: async function () {
    let res = await axios.get("http://localhost:3030/medico/");
    let { data } = await res;
    return data;
  },
};

export default medico;
