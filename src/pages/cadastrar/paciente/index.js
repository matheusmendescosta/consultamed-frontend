import * as React from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { Alert, Box, Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Container } from "@mui/system";
import Head from "next/head";
import ApiPaciente from "../../../service/paciente/ApiPaciente.js";
import styled from "@emotion/styled";
import Image from "next/image.js";

const Item = styled("div")(({}) => ({
  borderRadius: "4px",
  textAlign: "left",
  margin: "10px",
}));

function blobToDataURL(blob, callback) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}

export default function cadastrarPaciente() {
  const [status, setStatus] = React.useState("");
  const [checkedAlergia, setCheckedAlergia] = React.useState(false);
  const [checkedDoencaCronica, setCheckedDoencaCronica] = React.useState(false);
  const [checkedMedicacaoContinua, setCheckedMedicacaoContinua] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [imgPerfil, setImgPerfil] = React.useState("");
  const router = useRouter(); //router push redirecionar para pagina do paciente https://nextjs.org/docs/api-reference/next/router

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Fechar
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const [eventSave, updateEventSave] = React.useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      nome: "",
      dataNascimento: "",
      telefone: "",
      email: "",
      altura: "",
      peso: "",
      rua: "",
      bairro: "",
      municipio: "",
      estado: "",
      numero: "",
      cep: "",
    }
  );

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await ApiPaciente.postPaciente({
        nome: eventSave.nome,
        email: eventSave.email,
        telefone: eventSave.telefone,
        dataNascimento: eventSave.dataNascimento,
        altura: eventSave.altura,
        peso: eventSave.peso,
        rua: eventSave.rua,
        bairro: eventSave.bairro,
        municipio: eventSave.municipio,
        estado: eventSave.estado,
        numero: eventSave.numero,
        cep: eventSave.cep,
        alergia: checkedAlergia,
        tipo_alergia: eventSave.tipoAlergia,
        doenca_cronica: checkedDoencaCronica,
        tipo_doenca_cronica: eventSave.tipoDoencaCronica,
        medicacao_continua: checkedDoencaCronica,
        tipo_medicacao_continua: eventSave.tipoMedicacaoContinua,
        image_perfil: imgPerfil,
      });
      console.log(response); // dados retornados pelo servidor
      router.push(`/paciente/${response.id}`);
      setStatus("Paciente cadastrado com sucesso");
    } catch (error) {
      console.error(error);
      setStatus("Error interno paciente não cadastrado");
    }
  }

  const handleChange = (event) => {
    setCheckedAlergia(event.target.checked);
  };

  const handleChangeDoencaCronica = (event) => {
    setCheckedDoencaCronica(event.target.checked);
  };

  const handleChangeMedicacaoContinua = (event) => {
    setCheckedMedicacaoContinua(event.target.checked);
  };
  console.log("image perfil", eventSave.imagePerfil);

  const handleChangeImgFile = (event) => {
    blobToDataURL(event.target.files[0], function (dataURL) {
      updateEventSave({ imagePerfil: event.target.value });
      setImgPerfil(dataURL);
    });
    //console.log(event.target.files[0]);
  };
  //console.log("img teste", imgPerfil);
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
          <Box sx={{ display: { xs: "none", md: "flex", justifyContent: "center" } }}>
            <Image src="/cadastroImage.png" width={180} height={100} alt="logo_consultamed" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", justifyContent: "center" },
              fontFamily: "Inter",
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CRIE SUA CONTA
          </Typography>
          <Typography
            variant="p"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", justifyContent: "center" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "grey",
              textDecoration: "none",
            }}
          >
            Suas informações estão seguras e são necessárias para prescrição digital
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container xs={12}>
              <Box sx={{ width: 1 }}>
                <Typography
                  variant="p"
                  noWrap
                  sx={{
                    display: { xs: "none", md: "flex", alignItems: "center", justifyContent: "center" },
                    textAlign: "center",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "grey",
                  }}
                >
                  Informações Pessoais
                </Typography>
                <Box sx={{ padding: 4 }}>
                  <Grid item={true} xs={12}>
                    <Item item={true}>
                      <label>Escolha uma foto para o perfil</label>
                      <TextField
                        fullWidth
                        type="file"
                        value={eventSave.imagePerfil}
                        onChange={handleChangeImgFile}
                        variant="outlined"
                      />
                    </Item>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <Item item={true}>
                      <TextField
                        fullWidth
                        type="text"
                        value={eventSave.nome}
                        onChange={(e) => updateEventSave({ nome: e.target.value })}
                        //id="nome"
                        label="Nome"
                        variant="outlined"
                      />
                    </Item>
                  </Grid>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid item={true} xs={6}>
                      <Item>
                        <TextField
                          type="date"
                          value={eventSave.dataNascimento}
                          onChange={(e) => updateEventSave({ dataNascimento: e.target.value })}
                          fullWidth
                          id="dataNascimento"
                        />
                      </Item>
                    </Grid>
                    <Grid item={true} xs={6}>
                      <Item>
                        <TextField
                          type="number"
                          value={eventSave.telefone}
                          min="10"
                          max="100"
                          onChange={(e) => updateEventSave({ telefone: e.target.value })}
                          fullWidth
                          label="Telefone"
                          id="telefone"
                        />
                      </Item>
                    </Grid>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid item={true} xs={6}>
                      <Item>
                        <TextField
                          type="number"
                          value={eventSave.altura}
                          onChange={(e) => updateEventSave({ altura: e.target.value })}
                          fullWidth
                          id="peso"
                          label="Altura"
                        />
                      </Item>
                    </Grid>
                    <Grid item={true} xs={6}>
                      <Item>
                        <TextField
                          type="number"
                          value={eventSave.peso}
                          onChange={(e) => updateEventSave({ peso: e.target.value })}
                          fullWidth
                          label="peso"
                          id="Peso"
                        />
                      </Item>
                    </Grid>
                  </Box>
                  <Grid item={true} xs={12}>
                    <Item>
                      <TextField
                        type="email"
                        value={eventSave.email}
                        onChange={(e) => updateEventSave({ email: e.target.value })}
                        fullWidth
                        label="Email"
                        id="email"
                      />
                    </Item>
                  </Grid>
                </Box>
                <Typography
                  variant="p"
                  noWrap
                  sx={{
                    display: { xs: "none", md: "flex", alignItems: "center", justifyContent: "center" },
                    textAlign: "center",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "grey",
                  }}
                >
                  Endereço
                </Typography>
                <Box sx={{ padding: 4 }}>
                  <Grid item={true} xs={12}>
                    <Item>
                      <TextField
                        type="text"
                        value={eventSave.rua}
                        onChange={(e) => updateEventSave({ rua: e.target.value })}
                        fullWidth
                        label="Rua"
                        id="rua"
                      />
                    </Item>
                  </Grid>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid item={true} xs={4}>
                      <Item>
                        <TextField
                          type="text"
                          value={eventSave.bairro}
                          onChange={(e) => updateEventSave({ bairro: e.target.value })}
                          fullWidth
                          id="bairro"
                          label="Bairro"
                        />
                      </Item>
                    </Grid>
                    <Grid item={true} xs={4}>
                      <Item>
                        <TextField
                          type="text"
                          value={eventSave.municipio}
                          onChange={(e) => updateEventSave({ municipio: e.target.value })}
                          fullWidth
                          label="Municipio"
                          id="municipio"
                        />
                      </Item>
                    </Grid>
                    <Grid item={true} xs={4}>
                      <Item>
                        <TextField
                          type="text"
                          value={eventSave.estado}
                          onChange={(e) => updateEventSave({ estado: e.target.value })}
                          fullWidth
                          label="Estado"
                          id="estado"
                        />
                      </Item>
                    </Grid>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid item={true} xs={6}>
                      <Item>
                        <TextField
                          type="number"
                          value={eventSave.numero}
                          onChange={(e) => updateEventSave({ numero: e.target.value })}
                          fullWidth
                          id="numero"
                          label="Numero"
                        />
                      </Item>
                    </Grid>
                    <Grid item={true} xs={6}>
                      <Item>
                        <TextField
                          type="number"
                          value={eventSave.cep}
                          onChange={(e) => updateEventSave({ cep: e.target.value })}
                          fullWidth
                          label="Cep"
                          id="cep"
                        />
                      </Item>
                    </Grid>
                  </Box>
                </Box>
                <Box sx={{ padding: 4 }}>
                  <Typography
                    variant="p"
                    noWrap
                    sx={{
                      display: { xs: "none", md: "flex", alignItems: "center", justifyContent: "center" },
                      textAlign: "center",
                      fontWeight: 700,
                      letterSpacing: ".1rem",
                      color: "grey",
                    }}
                  >
                    Sobre sua saúde
                  </Typography>
                  <Grid item={true} xs={12}>
                    <Item>
                      <Typography
                        variant="p"
                        noWrap
                        sx={{
                          textAlign: "center",
                          fontWeight: 500,
                          color: "black",
                        }}
                      >
                        Você possui algum tipo de alergia?
                      </Typography>{" "}
                      <br />
                      <Checkbox
                        checked={checkedAlergia}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Item>
                  </Grid>
                  {checkedAlergia && (
                    <Grid item={true} xs={12}>
                      <Item>
                        <TextField
                          type="text"
                          value={eventSave.tipoAlergia}
                          onChange={(e) => updateEventSave({ tipoAlergia: e.target.value })}
                          fullWidth
                          label="Tipo de alergia"
                          id="tipoAlergia"
                        />
                      </Item>
                    </Grid>
                  )}
                  <Grid item={true} xs={12}>
                    <Item>
                      <Typography
                        variant="p"
                        noWrap
                        sx={{
                          textAlign: "center",
                          fontWeight: 500,
                          color: "black",
                        }}
                      >
                        Você toma algum tipo de medicação continua?
                      </Typography>{" "}
                      <br />
                      <Checkbox
                        checked={checkedMedicacaoContinua}
                        onChange={handleChangeMedicacaoContinua}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Item>
                  </Grid>
                  {checkedMedicacaoContinua && (
                    <Grid item={true} xs={12}>
                      <Item>
                        <TextField
                          type="text"
                          value={eventSave.tipoMedicacaoContinua}
                          onChange={(e) => updateEventSave({ tipoMedicacaoContinua: e.target.value })}
                          fullWidth
                          label="Tipo de medicação continua"
                          id="tipoMedicacaoContinua"
                        />
                      </Item>
                    </Grid>
                  )}
                  <Grid item={true} xs={12}>
                    <Item>
                      <Typography
                        variant="p"
                        noWrap
                        sx={{
                          textAlign: "center",
                          fontWeight: 500,
                          color: "black",
                        }}
                      >
                        Você possui algum tipo de doença crônica?
                      </Typography>{" "}
                      <br />
                      <Checkbox
                        checked={checkedDoencaCronica}
                        onChange={handleChangeDoencaCronica}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Item>
                  </Grid>
                  {checkedDoencaCronica && (
                    <Grid item={true} xs={12}>
                      <Item>
                        <TextField
                          type="text"
                          value={eventSave.tipoDoencaCronica}
                          onChange={(e) => updateEventSave({ tipoDoencaCronica: e.target.value })}
                          fullWidth
                          label="Tipo de doença crônica"
                          id="tipoDoencaCronica"
                        />
                      </Item>
                    </Grid>
                  )}
                </Box>
              </Box>
              <Box sx={{ textAlign: "right", marginTop: 5, margin: 1 }}>
                <Button onClick={handleClick} endIcon={<SendIcon />} variant="contained" type="submit">
                  Cadastrar
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={status} action={action} />
              </Box>
            </Grid>
          </form>
          {/* {status && <Alert severity="success">{status}</Alert>} */}
        </Box>
      </Container>
    </>
  );
}
