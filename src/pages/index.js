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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
  return (
    <>
      <Head>
        <title>Consultamed</title>
        <meta name="description" content="Agendamento de consultas online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Image src="/5138237.jpg" alt="Picture of the author" width={500} height={500} />
              <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                Consultamed
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                A plataforma <strong>consultamed</strong> é a solução ideal para médicos, clínicas e pacientes.
              </Typography>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                <Link href="/auth/login">
                  <Button variant="contained">Faça seu login</Button>
                </Link>
                <Link style={{}} href="/auth/cadastrar">
                  <Button variant="outlined">Cadastre-se gratuitamente</Button>
                </Link>
              </Stack>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    </>
  );
}
