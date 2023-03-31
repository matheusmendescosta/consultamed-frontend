import { useState } from "react";
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

const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //...theme.typography.body2,
  //padding: theme.spacing(1),
  textAlign: "center",
  margin: 20,
  //color: theme.palette.text.secondary,
}));

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
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const paciente_id = router.query.id;
  const informacoesPaciente = props.pacientes.find((pacient) => pacient.id == paciente_id);

  const historicoConsultaPaciente = props.historicoConsultas.filter(
    (pacient) => pacient.consulta.pacienteId == paciente_id
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setMedicoSelecionado(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await ApiConsulta.postConsulta({
        dataHora: data,
        medicoId: medicoSelecionado,
        pacienteId: parseInt(paciente_id),
      });
      setData("");
      console.log(response); // dados retornados pelo servidor
      setStatus("Consulta cadastrado com sucesso");
    } catch (error) {
      console.error(error);
      setStatus("Error interno consulta não cadastrado");
    }
  }

  const tituloPagina = `Paciente ${informacoesPaciente.nome}`;

  return (
    <>
      <Head>
        <title>{tituloPagina}</title>
        <meta name="description" content="Agendamento de consultas online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/medicos.ico" />
      </Head>
      <Navbar />
      <Grid container>
        <Grid item xs={6}>
          <Box sx={{ margin: 4 }}>
            <Image src="/4136933.jpg" alt="Picture of the author" width={200} height={200} />
            <p>Nome: {informacoesPaciente.nome}</p>
            <p>Data de Nascimento: {informacoesPaciente.dataNascimento}</p>
            <p>Telefone: {informacoesPaciente.telefone}</p>
            <p>Email: {informacoesPaciente.email}</p>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ margin: 4 }}>
            <Typography>
              <h7>
                Olá <strong>{informacoesPaciente.nome}</strong> selecione a data e o horario e o médico para sua proxima
                consulta
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
                    return <MenuItem value={elem.id}>{elem.nome}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", textAlign: "right", marginTop: 5, margin: 1 }}>
                <Button variant="contained" type="submit">
                  Agendar
                </Button>
                <Box sx={{ marginLeft: 2 }}>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Todos agendamentos
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Confira todas as suas consultas"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {historicoConsultaPaciente.map((informacoes) => {
                          return (
                            <ListItem>
                              Suas consultas: {moment(informacoes.dataHora).locale("pt-br").format("LLLL")}
                            </ListItem>
                          );
                        })}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
            </form>
            {status && <Alert severity="success">{status}</Alert>}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h3" variant="h2" align="left" color="text.primary" margin={4}>
            Historico de consultas
          </Typography>
          {historicoConsultaPaciente.map((info) => {
            return (
              <div>
                <Accordion sx={{ margin: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                      Consultas do dia {moment(info.dataHota).format("LLL")} com o Doutor {info.consulta.medico.nome}
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
              </div>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}
