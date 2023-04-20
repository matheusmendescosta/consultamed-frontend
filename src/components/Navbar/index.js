import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "inherit" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Inter",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#000000",
              textDecoration: "none",
            }}
          >
            <Image src={"/iconNavbar.png"} width={100} height={60} alt="icone_navbar" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", justifyContent: "flex-end" } }}>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontFamily: "Inter",
                  textTransform: "lowercase",
                }}
                href="/medicos"
              >
                Medicos
              </Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontFamily: "Inter",
                  textTransform: "lowercase",
                }}
                href="/paciente"
              >
                Paciente
              </Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontFamily: "Inter",
                  textTransform: "lowercase",
                }}
                href="#"
              >
                Agendamento
              </Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontFamily: "Inter",
                  textTransform: "lowercase",
                }}
                href="#"
              >
                Renovação de Receita
              </Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontFamily: "Inter",
                  textTransform: "lowercase",
                }}
                href="#"
              >
                Login
              </Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, backgroundColor: "#3FC1F9", display: "block" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontFamily: "Inter",
                  textTransform: "lowercase",
                }}
                href="#"
              >
                Cadastrar
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
