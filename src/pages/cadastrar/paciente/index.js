import Footer from "@/components/Footer";
import FormInputDate from "@/components/FormInputDate";
import FormInputText from "@/components/FormInputText";
import Navbar from "@/components/Navbar";
import { Box, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Container } from "@mui/system";
import Head from "next/head";

export default function cadastrarPaciente() {
  return (
    <>
      <Head>
        <title>Cadastrar - Paciente</title>
        <meta name="description" content="Agendamento de consultas online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cadastro.ico" />
      </Head>
      <Navbar />
      <Container maxWidth="xg">
        <Box
          sx={{
            margin: "4rem",
            "& > :not(style)": { m: 1 },
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif ",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Cadastre-se
          </Typography>
          <Typography
            variant="p"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "grey",
              textDecoration: "none",
            }}
          >
            Agendamento simples e fácil
          </Typography>
          <FormInputText labelText="Nome" DescriptioText="Nome Completo" />
          <FormInputDate DescriptionText="Data de Nascimento" />
          <FormInputText labelText="Telefone" DescriptioText="Telefone para contato" />
          <FormInputText labelText="Email" DescriptioText="Email" />
          <Button variant="contained" endIcon={<SendIcon />}>
            Cadastrar
          </Button>
        </Box>
      </Container>
    </>
  );
}
