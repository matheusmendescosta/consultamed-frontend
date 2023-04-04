import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import DescriptionIcon from "@mui/icons-material/Description";
import MedicationIcon from "@mui/icons-material/Medication";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BiotechIcon from "@mui/icons-material/Biotech";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  const especialistas = [
    { Nome: "Clínico Geral", Image: <MedicationIcon /> },
    { Nome: "Psiquiatria", Image: <PsychologyAltIcon /> },
    { Nome: "Ginecologia", Image: <FemaleIcon /> },
    { Nome: "Urologia", Image: <MaleIcon /> },
    { Nome: "Pediatria", Image: <ChildCareIcon /> },
    { Nome: "Dermatologia", Image: <BiotechIcon /> },
    { Nome: "Cardiologia", Image: <MonitorHeartIcon /> },
  ];

  const depoimentos = [
    {
      Texto: "O médico que me atendeu é muito bom, super atencioso.",
      Pessoa: "Pamela Silva",
      Localidade: "Santarém -PA",
    },
    {
      Texto: "Excelente! A consulta online judou muito na correria do dia a dia",
      Pessoa: "Cleuma Teixeira",
      Localidade: "Rio de Janeiro - RJ",
    },
  ];

  return (
    <>
      <Head>
        <title>Consultamed</title>
        <meta name="description" content="Agendamento de consultas online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconHome.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              // pt: 8,
              // pb: 6,
            }}
          >
            <Grid container sx={{ height: "100vh" }}>
              <Grid xs={8}>
                <Box
                  sx={{
                    textAlign: "left",
                    justifyContent: "center",
                    marginLeft: 50,
                    marginTop: 8,
                  }}
                >
                  <Box sx={{ fontFamily: "Inter", fontWeight: "bold" }}>
                    <Typography fontFamily="Inter" fontWeight="bold" variant="h5">
                      AGENDE SUA CONSULTA AGORA MESMO!
                    </Typography>
                  </Box>
                  <Box sx={{ fontWeight: "light", typography: "subtitle2", color: "#777777" }}>
                    <Typography variant="strong">
                      Evite filas, salas de espera, custos de deslocamentos.
                      <br /> Aqui você encontra acesso a saúde de qualidade por um preço justo.
                    </Typography>
                  </Box>
                  <Box sx={{ margin: 2, display: { xs: "none", md: "flex", justifyContent: "flex-start" } }}>
                    <Box
                      sx={{
                        backgroundColor: "#3FC1F9",
                        width: 300,
                        height: 220,
                        borderRadius: "16px",
                        margin: 1,
                        boxShadow: 3,
                        "&:hover": {
                          //border: "1px solid blue",
                          //opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: { xs: "none", md: "flex", justifyContent: "center", margin: 60 },
                        }}
                      >
                        <Stack>
                          <AddAlertIcon fontSize="large" sx={{ color: "white" }} />
                          <Typography color="#FFFF">Planos à partir de R$59,99</Typography>
                        </Stack>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#FFFFFF",
                        width: 300,
                        height: 220,
                        borderRadius: "16px",
                        margin: 1,
                        boxShadow: 3,
                        "&:hover": {
                          //border: "1px solid blue",
                          //opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      <Box
                        sx={{
                          textAlign: "center",
                          alignContent: "center",
                          marginTop: 7.5,
                          display: { xs: "none", md: "flex", justifyContent: "center" },
                        }}
                      >
                        <Stack>
                          <DescriptionIcon fontSize="large" sx={{ color: "#3FC1F9" }} />
                          <Typography textAlign="left" color="black">
                            Renovação de Receita <br />à partir de R$ 48,99
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box sx={{ marginTop: 10 }}>
                  <Image src="/headerMed.png" alt="medico recebendo agendamento" width={434.58} height={652.39} />
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{ height: "20vh" }}>
              <Grid xs={8}>
                <Typography variant="h5" fontFamily="Inter" marginLeft={10} fontWeight="bold">
                  AGENDE COM OS NOSSOS ESPECIALISTAS
                </Typography>
                <Typography fontFamily="Inter" fontSize={18} marginLeft={10} color="#777777">
                  Selecione a especialidade que deseja, e o nosso profissional entrará <br /> em contato no horário e
                  data escolhido por você.{" "}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Button
                  sx={{
                    backgroundColor: "#3FC1F9",
                    width: 253,
                    height: 82,
                    fontFamily: "Inter",
                    size: 16,
                    color: "#FFFF",
                  }}
                  size="large"
                  variant="contained"
                >
                  {" "}
                  Todas as especialidades
                </Button>
              </Grid>
            </Grid>
            <Grid container sx={{ height: "30vh" }}>
              <Grid
                xs={12}
                sx={{
                  display: { xs: "none", md: "flex", justifyContent: "space-around" },
                }}
              >
                {especialistas.map((esp) => {
                  return (
                    <Box
                      sx={{
                        backgroundColor: "#FFFFFF",
                        width: 187,
                        height: 157,
                        borderRadius: "16px",
                        margin: 2,
                        boxShadow: 3,
                      }}
                    >
                      <Stack sx={{ color: "#3FC1F9", margin: 2, marginTop: 6 }}>
                        <Typography fontSize="large">{esp.Image}</Typography>
                        <Typography color="black">{esp.Nome}</Typography>
                      </Stack>
                    </Box>
                  );
                })}
              </Grid>
            </Grid>
            <Grid container sx={{ height: "40vh" }}>
              <Grid xs={12} sx={{ display: { xs: "none", md: "flex", justifyContent: "start" }, marginLeft: 5 }}>
                <Typography variant="h5" fontFamily="Inter" fontWeight="bold">
                  O que falam sobre nós ?{" "}
                  <Typography fontFamily="Inter" fontSize={18} color="#777777">
                    Veja a experiência dos nossos usuários
                    <br /> que utilizam a telemedicina para facilitar seu dia a dia
                  </Typography>
                  <Box
                    sx={{
                      margin: 3,
                      backgroundColor: "#3FC1F9",
                      borderRadius: 1,
                      width: 264,
                      height: 82,
                      textAlign: "center",
                      padding: 1,
                    }}
                  >
                    <Button sx={{ color: "white" }}>Consulte-se agora mesmo</Button>
                  </Box>
                </Typography>
                {depoimentos.map((dep) => {
                  return (
                    <Box
                      sx={{
                        backgroundColor: "#FFFFFF",
                        width: 320,
                        height: 270,
                        borderRadius: "16px",
                        margin: 2,
                        boxShadow: 3,
                      }}
                    >
                      <FormatQuoteIcon fontSize="large" sx={{ color: "#3FC1F9" }} />
                      <Typography variant="h6" margin={2} color="#69777F">
                        {dep.Texto}
                      </Typography>
                      <Typography variant="subtitle1" margin={2} color="#69777F">
                        {dep.Pessoa}
                      </Typography>
                      <Typography variant="subtitle1" fontSize={14} margin={2} color="##69777F">
                        {dep.Localidade}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
            </Grid>
            <Grid container sx={{ height: "100vh" }}>
              <Grid xs={6}>
                <Box sx={{ margin: 5 }}>
                  <Image src="/usingmobile.png" width={600} height={670} />
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={{ paddingTop: 18 }}>
                  <Typography variant="h5" fontFamily="Inter" fontWeight="bold">
                    COMO FUNCIONA O AGENDAMENTO DE CONSULTA?
                  </Typography>
                  <Typography variant="subtitle1" margin={2} color="#69777F">
                    Hoje em dia realizar uma teleconsulta está mais rápido e fácil. E com a nossa plataforma você
                    consegue agendar e consultar-se de maneira acessível e prática.{" "}
                  </Typography>
                  <Typography variant="subtitle1" margin={2} color="#69777F">
                    1 - Escolha a sua modalidade de atendimento, plantão 24hrs ou agendamento;
                    <br /> 2- Caso você opte pelo agendamento, escolha o horário que gostaria de ser atendido;
                    <br /> 3- Agora você pode escolher como deseja realizar o pagamento, aceitamos cartão de crédito,
                    débito e pix.
                    <br /> 4- No momento do atendimento, lembre-se de que esteja em um local com bom sinal de internet,
                    com seu microfone e câmera funcionando.{" "}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{ height: "5vh" }}>
              <Grid xs={12}>
                <Box sx={{ marginLeft: 3 }}>
                  <Image src="/iconNavbar.png" width={147} height={83} />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#3FC1F9",
                    width: 1,
                    height: 1,
                  }}
                >
                  <Box sx={{ paddingTop: 2 }}>
                    <Typography sx={{ color: "white", fontFamily: "Open Sans", marginLeft: 6 }}>
                      © 2023 Brasil ConsultaMED - CNPJ: 00.000.000/0001-00 - CREMESP 994707
                      <br /> Desenvolvido por Matheus Mendes
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </main>
      </ThemeProvider>
    </>
  );
}
