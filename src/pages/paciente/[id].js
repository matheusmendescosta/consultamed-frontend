import * as React from "react";
import moment from "moment";
import ApiPaciente from "../../service/paciente/ApiPaciente.js";
import ApiMedico from "../../service/medico/ApiMedico.js";
import ApiConsulta from "../../service/consulta/ApiConsulta.js";
import Navbar from "@/components/Navbar/index.js";
import styled from "@emotion/styled";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import Image from "next/image.js";
import { Box } from "@mui/system";
import Head from "next/head.js";
import "moment/locale/pt-br";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import List from "@mui/material/List";

import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Footer from "@/components/Footer/index.js";

const style = {
  padding: 7,
  width: "100%",
  maxWidth: 1,
  bgcolor: "background.paper",
};

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export async function getServerSideProps({ params }) {
  const pacientes = await ApiPaciente.getPaciente(params);
  const medicos = await ApiMedico.getMedicos(params);
  const consultas = await ApiConsulta.getConsultas(params);
  const historicoConsultas = await ApiConsulta.getHistoricoConsultas(params);

  if (!consultas) {
    return {
      consultas: true,
    };
  }

  if (!medicos) {
    return {
      medicos: true,
    };
  }
  if (!pacientes) {
    return {
      paciente: true,
    };
  }
  return {
    props: {
      pacientes,
      medicos,
      consultas,
      historicoConsultas,
    },
  };
}

export default function paciente(props) {
  const [medicoSelecionado, setMedicoSelecionado] = React.useState("");
  const [data, setData] = React.useState("");
  const [hora, setHora] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const router = useRouter();
  const paciente_id = router.query.id;

  const informacoesPaciente = props.pacientes.find((pacient) => pacient.id == paciente_id);

  const historicoConsultaPaciente = props.historicoConsultas.filter(
    (pacient) => pacient.consulta.pacienteId == paciente_id
  );

  const proximasConsultas = props.consultas.filter((proximaConsulta) => proximaConsulta.pacienteId == paciente_id);

  // const consultasSemHistorico = consultas.filter(consulta => {
  //   const consultaId = consulta.id;
  //   const hasHistorico = historico_consulta.find(historico => historico.consultaId === consultaId);
  //   return !hasHistorico;
  // });

  const consultasSemHistorico = props.consultas.filter((consulta) => {
    if (consulta.pacienteId == paciente_id) {
      const temHistoricoConsulta = props.historicoConsultas.some((historico) => historico.consultaId === consulta.id);
      return !temHistoricoConsulta;
    }
  });

  console.log("consulta sem historico", consultasSemHistorico);

  const tituloPagina = `Paciente ${informacoesPaciente.nome}`;

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

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

  const handleChange = (event) => {
    setMedicoSelecionado(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await ApiConsulta.postConsulta({
        data: data,
        hora: hora,
        medicoId: medicoSelecionado,
        pacienteId: parseInt(paciente_id),
      });
      // setData("");
      // setMedicoSelecionado("");
      router.reload();
      console.log(response); // dados retornados pelo servidor
      setStatus("Consulta cadastrado com sucesso");
    } catch (error) {
      console.error(error);
      setStatus("Error interno consulta não cadastrado");
    }
  }

  return (
    <>
      <Head>
        <title>{tituloPagina}</title>
        <meta name="description" content="Agendamento de consultas online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/medicos.ico" />
      </Head>
      <Navbar />
      <Grid container sx={{ marginBottom: 10 }}>
        <Grid item xs={8}>
          <Box
            sx={{
              display: { xs: "none", md: "flex", justifyContent: "flex-start", margin: 50 },
            }}
          >
            <Image src={"/profiledefault.png"} width={275} height={250} alt="Imagem do perfil de ususario" />
            <Box sx={{ margin: 2 }}>Bem vindo {informacoesPaciente.nome}</Box>
          </Box>
          <Box>
            <List sx={style} component="nav">
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
                Suas informações pessoais
              </Typography>
              <ListItem>
                <strong>Nome: </strong> {informacoesPaciente.nome}
              </ListItem>
              <Divider />
              <ListItem divider>
                {" "}
                <strong>Data de nascimento: </strong> {informacoesPaciente.dataNascimento}
              </ListItem>
              <ListItem>
                {" "}
                <strong>Telefone: </strong> {informacoesPaciente.telefone}
              </ListItem>
              <Divider light />
              <ListItem>
                {" "}
                <strong>email: </strong> {informacoesPaciente.email}
              </ListItem>
              <Divider light />
              <ListItem>
                {" "}
                <strong>altura: </strong> {informacoesPaciente.altura}
              </ListItem>
              <Divider light />
              <ListItem>
                {" "}
                <strong>peso: </strong> {informacoesPaciente.peso}
              </ListItem>{" "}
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
                Seu Endereço
              </Typography>
              <ListItem>
                {" "}
                <strong>Rua: </strong> {informacoesPaciente.rua}
              </ListItem>
              <Divider />
              <ListItem divider>
                {" "}
                <strong>Bairro: </strong> {informacoesPaciente.bairro}
              </ListItem>
              <ListItem>
                {" "}
                <strong>Municipio: </strong> {informacoesPaciente.municipio}
              </ListItem>
              <Divider light />
              <ListItem>
                {" "}
                <strong>Estado: </strong> {informacoesPaciente.estado}
              </ListItem>
              <Divider light />
              <ListItem>
                {" "}
                <strong>Cep: </strong> {informacoesPaciente.cep}
              </ListItem>
              <Divider light />
              <ListItem>
                {" "}
                <strong>Numero: </strong> {informacoesPaciente.numero}
              </ListItem>{" "}
            </List>
          </Box>
        </Grid>
        <Grid sx={4}>
          <Box sx={{ margin: 4 }}>
            <Button variant="contained" onClick={handleOpen}>
              Agendar um consulta
            </Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
              <Box sx={{ margin: 4 }}>
                <Typography>
                  <h7>
                    Olá <strong>{informacoesPaciente.nome}</strong> selecione a data e o horario e o médico para sua
                    proxima consulta
                  </h7>
                </Typography>
                <form onSubmit={handleSubmit}>
                  <strong>Informe o dia</strong>
                  <TextField
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    fullWidth
                    id="dataNascimento"
                  />
                  <strong>Informe a hora</strong>
                  <TextField
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    fullWidth
                    id="dataNascimento"
                  />
                  <strong>Selecione o seu médico</strong>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Médicos</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={medicoSelecionado}
                      label="Médicos"
                      onChange={handleChange}
                    >
                      {props.medicos.map((elem) => {
                        return (
                          <MenuItem key={elem.id} value={elem.id}>
                            {elem.nome}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Box sx={{ display: "flex", textAlign: "right", marginTop: 5, margin: 1 }}>
                    <Button onClick={handleClickAlert} variant="contained" type="submit">
                      Agendar
                    </Button>
                    <Snackbar
                      open={openAlert}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message={status}
                      action={action}
                    />
                  </Box>
                </form>
              </Box>
            </Box>
          </Modal>
          <Box>
            <h4>Últimos agendamentos</h4>
            {historicoConsultaPaciente.map((agendamento) => {
              return (
                <>
                  <Accordion sx={{ margin: 2 }} key={agendamento.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        Consultas realizadas {moment(agendamento.consulta.data).add(1, "days").format("LL")}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Hora: {agendamento.consulta.hora}</Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography>Médico: {agendamento.consulta.medico.nome}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}
            <h4>Próximos agendamentos</h4>
            {consultasSemHistorico.map((consulta) => {
              return (
                <>
                  <Accordion sx={{ margin: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        Você tem uma consulta no dia {moment(consulta.data).add(1, "days").format("LL")}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Hora: {consulta.hora}</Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography>Médico(a): {consulta.medico.nome}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h5" variant="h4" align="center" color="grey" margin={4}>
            Historico de consultas
          </Typography>
          {historicoConsultaPaciente.map((info) => {
            return (
              <div key={info.id}>
                <Box sx={{ paddingLeft: 10 }}>
                  <Accordion sx={{ margin: 3 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        Consultas do dia {moment(info.dataHota).add(1, "days").format("LLL")} com o Doutor{" "}
                        {info.consulta.medico.nome}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Sintomas que você estava sentindo: {info.sintomas}</Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography>
                        Diagnostico atestado pelo médico {info.consulta.medico.nome}: {info.diagnostico}
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography>Tratamento {info.tratamento}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </div>
            );
          })}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
