import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { List, ListItem } from "@mui/material";
import Image from "next/image";

//const pages = ["Pacientes", "Medicos", "Clinicas"];
const settings = ["Cadastrar-se", "Login"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#000000"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box> */}
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
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir informações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="I" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <List>
                  <ListItem>
                    <button onClick={handleCloseNavMenu}>
                      <Link
                        style={{
                          color: "black",
                        }}
                        href="/auth/cadastrar"
                      >
                        Cadastrar
                      </Link>
                    </button>
                  </ListItem>
                  <ListItem>
                    <button onClick={handleCloseNavMenu}>
                      <Link
                        style={{
                          color: "black",
                        }}
                        href="/auth/login"
                      >
                        Login
                      </Link>
                    </button>
                  </ListItem>
                </List>
              </MenuItem>
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
