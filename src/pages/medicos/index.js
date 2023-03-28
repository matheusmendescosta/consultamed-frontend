import Navbar from "@/components/Navbar";
import { Box, Container } from "@mui/system";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import ApiMedico from "../../service/medico/ApiMedico.js";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import Head from "next/head.js";
import Image from "next/image.js";

export async function getServerSideProps() {
  const medicos = await ApiMedico.getMedicos();
  return {
    props: {
      medicos,
    },
  };
}

const Item = styled(Paper)(({ theme }) => ({
  margin: 10,
  padding: theme.spacing(4),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function Medicos(props) {
  return (
    <>
      <Head>
        <title>Medicos - Consultamed</title>
        <meta name="description" content="Agendamento de consultas online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/medicos.ico" />
      </Head>

      <Navbar />
      <Container maxWidth="xl">
        <CardHeader title="Consultamed" subheader="Conheça nossos medicos e agende sua consulta" />
        {props.medicos.map((item) => {
          return (
            <Box sx={{ width: "100%" }}>
              <Stack spacing={3}>
                <Item sx={{ display: "flex" }}>
                  <Image src="/4136933.jpg" alt="Picture of the author" width={200} height={200} />
                  <Box sx={{ ml: 5 }}>
                    <p>
                      <strong>Doutor:</strong> {item.nome}
                    </p>
                    <p>
                      <strong>Especialidade:</strong> {item.especialidade}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {item.telefone}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                  </Box>
                </Item>
              </Stack>
            </Box>
          );
        })}
      </Container>
    </>
  );
}
