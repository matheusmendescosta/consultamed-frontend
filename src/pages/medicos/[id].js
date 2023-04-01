import * as React from "react";
import { useRouter } from "next/router";
import ApiMedico from "../../service/medico/ApiMedico.js";
import ApiConsulta from "../../service/consulta/ApiConsulta.js";
import Navbar from "@/components/Navbar/index.js";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
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
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import moment from "moment";
import "moment/locale/pt-br";
import styled from "@emotion/styled";

import SendIcon from "@mui/icons-material/Send";

export async function getServerSideProps() {
  const medicos = await ApiMedico.getMedicos();
  const consultas = await ApiConsulta.getConsultas();
  const historicoConsultas = await ApiConsulta.getHistoricoConsultas();
  return {
    props: {
      medicos,
      consultas,
      historicoConsultas,
    },
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //...theme.typography.body2,
  //padding: theme.spacing(1),
  textAlign: "center",
  margin: 20,
  //color: theme.palette.text.secondary,
}));

export default function medico(props) {
  const [value, setValue] = React.useState(0);
  const [consultaPacienteSelecionado, setConsultaPacienteSelecionado] = React.useState("");
  const [sintomas, setSintomas] = React.useState("");
  const [diagnostico, setDiagnostico] = React.useState("");
  const [tratamento, setTratamento] = React.useState("");
  const [status, setStatus] = React.useState("");
  const router = useRouter();
  const medico_id = router.query.id;
  const informacoesMedico = props.medicos.find((medico) => medico.id == medico_id);
  const listaConsultasPaciente = props.consultas.filter((medico) => medico.medicoId == medico_id);
  const listaHistoricoPaciente = props.historicoConsultas.filter((medico) => medico.consulta.medicoId == medico_id);

  async function handleSubmit(event) {
    event.preventDefault();
    const date = moment().format();
    try {
      const response = await ApiConsulta.postHistoricoConsultas({
        consultaId: consultaPacienteSelecionado,
        dataHota: date,
        sintomas: sintomas,
        diagnostico: diagnostico,
        tratamento: tratamento,
      });
      console.log(response); // dados retornados pelo servidor
      router.reload();
      setStatus("Historico cadastrado com sucesso");
    } catch (error) {
      console.error(error);
      setStatus("Error interno historico não cadastrado");
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSelect = (event) => {
    setConsultaPacienteSelecionado(event.target.value);
  };

  return (
    <>
      <Navbar />
      <Box container="true" sx={{ padding: 2, width: "auto", height: 150 }}>
        <Typography variant="h4" fontStyle="normal">
          Bem vindo {informacoesMedico.nome}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2, width: "auto", padding: 2 }}>
        <Typography variant="h6" fontStyle={"oblique"}>
          Confira sua agenda
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Informações pessoais" {...a11yProps(0)} />
            <Tab label="Paciente agendados" {...a11yProps(1)} />
            <Tab label="Consultar paciente" {...a11yProps(2)} />
            <Tab label="Historico dos pacientes" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {informacoesMedico.nome}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {listaConsultasPaciente.map((consultasPacientes) => {
            return (
              <Box key={consultasPacientes.id}>
                <Accordion sx={{ margin: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                      Consultas do dia {moment(consultasPacientes.dataHota).format("DD/MM")} com o paciente{" "}
                      {consultasPacientes.paciente.nome}
                    </Typography>
                  </AccordionSummary>
                </Accordion>
              </Box>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Pacientes em sua agenda</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={consultaPacienteSelecionado}
              label="Age"
              onChange={handleChangeSelect}
            >
              {listaConsultasPaciente.map((paciente) => {
                return (
                  <MenuItem value={paciente.id}>
                    {paciente.paciente.nome} em {moment(paciente.dataHora).format("DD/MM")}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item={true} xs={12}>
                <Item item={true}>
                  <TextField
                    fullWidth
                    type="text"
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)}
                    label="Sintomas"
                    variant="outlined"
                  />
                </Item>
              </Grid>
              <Grid item={true} xs={12}>
                <Item>
                  <TextField
                    type="text"
                    value={diagnostico}
                    onChange={(e) => setDiagnostico(e.target.value)}
                    fullWidth
                    label="Diagnostico"
                  />
                </Item>
              </Grid>
              <Grid item={true} xs={12}>
                <Item>
                  <TextField
                    type="text"
                    value={tratamento}
                    onChange={(e) => setTratamento(e.target.value)}
                    fullWidth
                    label="Tratamento"
                  />
                </Item>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "right", marginTop: 5, margin: 1 }}>
              <Button endIcon={<SendIcon />} variant="contained" type="submit">
                Cadastrar
              </Button>
            </Box>
            {status}
          </form>
        </TabPanel>
        <TabPanel value={value} index={3}>
          {listaHistoricoPaciente.map((paciente) => {
            return (
              <Box key={paciente.id}>
                <Accordion sx={{ margin: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                      Consultas do dia {moment(paciente.dataHota).format("DD/MM")} com o paciente{" "}
                      {paciente.consulta.paciente.nome}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Sintomas: {paciente.sintomas}</Typography>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Typography>Diagnostico: {paciente.diagnostico}</Typography>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Typography>Tratamento: {paciente.tratamento}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
        </TabPanel>
      </Box>
    </>
  );
}
