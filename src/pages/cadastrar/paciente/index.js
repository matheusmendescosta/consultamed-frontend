import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Container } from "@mui/system";
import Head from "next/head";
import ApiPaciente from "../../../service/paciente/ApiPaciente.js";
import styled from "@emotion/styled";

const Item = styled("div")(({}) => ({
  borderRadius: "4px",
  textAlign: "left",
  margin: "10px",
}));

export default function cadastrarPaciente() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter(); //router push redirecionar para pagina do paciente https://nextjs.org/docs/api-reference/next/router

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await ApiPaciente.postPaciente({ nome, email, telefone, dataNascimento });
      console.log(response); // dados retornados pelo servidor
      router.push(`/paciente/${response.id}`);
      setStatus("Paciente cadastrado com sucesso");
    } catch (error) {
      console.error(error);
      setStatus("Error interno paciente não cadastrado");
    }
  }

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
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item={true} xs={12}>
                <Item item={true}>
                  <TextField
                    fullWidth
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    id="nome"
                    label="Nome"
                    variant="outlined"
                  />
                </Item>
              </Grid>
              <Grid item={true} xs={6}>
                <Item>
                  <TextField
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    fullWidth
                    id="dataNascimento"
                  />
                </Item>
              </Grid>
              <Grid item={true} xs={6}>
                <Item>
                  <TextField
                    type="number"
                    value={telefone}
                    min="10"
                    max="100"
                    onChange={(e) => setTelefone(e.target.value)}
                    fullWidth
                    label="Telefone"
                    id="telefone"
                  />
                </Item>
              </Grid>
              <Grid item={true} xs={12}>
                <Item>
                  <TextField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    label="Email"
                    id="email"
                  />
                </Item>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "right", marginTop: 5, margin: 1 }}>
              <Button endIcon={<SendIcon />} variant="contained" type="submit">
                Cadastrar
              </Button>
            </Box>
          </form>
          {status && <Alert severity="success">{status}</Alert>}
        </Box>
      </Container>
    </>
  );
}
