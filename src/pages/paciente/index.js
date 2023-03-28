import Navbar from "@/components/Navbar/index.js";
import ApiPaciente from "../../service/paciente/ApiPaciente.js";

export async function getServerSideProps({ params }) {
  const pacientes = await ApiPaciente.getPacientes();

  if (!pacientes) {
    return {
      paciente: true,
    };
  }
  return {
    props: {
      pacientes,
    },
  };
}

export default function pacientes(props) {
  return (
    <>
      <Navbar />
      <h1> aaaaaa {props.pacientes.map((elemt) => elemt.nome)}</h1>
    </>
  );
}
