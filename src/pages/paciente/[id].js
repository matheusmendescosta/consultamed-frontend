import Navbar from "@/components/Navbar/index.js";
import { useRouter } from "next/router";
import ApiPaciente from "../../api/paciente/ApiPaciente.js";

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

export default function paciente(props) {
  const router = useRouter();
  const { pid } = router.query;
  console.log(props.pacientes);
  return (
    <>
      <Navbar />
      <h1> aaaaaa {props.pacientes.map((elemt) => elemt.nome)}</h1>
    </>
  );
}
