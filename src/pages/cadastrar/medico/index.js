import { useState } from "react";
import ApiMedico from "../../../service/medico/ApiMedico.js";
import Navbar from "@/components/Navbar";
import styled from "@emotion/styled";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box, Container } from "@mui/system";
import { useRouter } from "next/router";

const Item = styled("div")(({}) => ({
  borderRadius: "4px",
  textAlign: "left",
  margin: "10px",
}));

export default function Medico() {
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const router = useRouter(); //router push redirecionar para pagina do paciente https://nextjs.org/docs/api-reference/next/router

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await ApiMedico.postMedico({ nome, email, telefone, especialidade });
      console.log(response); // dados retornados pelo servidor
      router.push(`/medicos`);
      setStatus("Medico cadastrado com sucesso");
    } catch (error) {
      console.error(error);
      setStatus("Error interno medico não cadastrado");
    }
  }
  return (
    <>
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
                    type="text"
                    value={especialidade}
                    onChange={(e) => setEspecialidade(e.target.value)}
                    label="Especialidade"
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
