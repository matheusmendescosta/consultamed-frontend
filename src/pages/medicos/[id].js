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
import Head from "next/head.js";
import Image from "next/image.js";

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

const ItemPacienteAgendado = styled(Paper)(() => ({
  textAlign: "left",
  padding: 5,
  marginTop: 1,
}));

const Item = styled(Paper)(() => ({
  textAlign: "center",
  margin: 20,
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

  const consultasSemHistorico = props.consultas.filter((consulta) => {
    if (consulta.medicoId == medico_id) {
      const temHistoricoConsulta = props.historicoConsultas.some((historico) => historico.consultaId === consulta.id);
      return !temHistoricoConsulta;
    }
  });

  const nomeMedico = `Olá Doutor ${informacoesMedico.nome}`;
  console.log(consultasSemHistorico);

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
      <Head>
        <title>{nomeMedico}</title>
        <meta name="description" content="Agendamento de consultas online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/medicos.ico" />
      </Head>
      <Navbar />
      <Grid container>
        <Grid xs={8}>
          <Box
            sx={{
              display: { xs: "none", md: "flex", justifyContent: "flex-start", margin: 50 },
            }}
          >
            <Image src={"/profiledefault.png"} width={275} height={250} alt="Imagem do perfil de ususario" />
            <Box sx={{ margin: 2 }}>Bem vindo {informacoesMedico.nome}</Box>
          </Box>
        </Grid>
        <Grid xs={4}>
          <h4>Próximos agendamentos</h4>
          {consultasSemHistorico.map((consulta) => {
            return (
              <>
                <Accordion sx={{ margin: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                      Você tem uma consulta no dia {moment(consulta.data).add(1, "days").format("LL")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Hora: {consulta.hora}</Typography>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Typography>Paciente: {consulta.paciente.nome}</Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })}
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 2, width: "auto", padding: 2, textAlign: "center" }}>
        <Typography variant="h6" fontStyle={"oblique"}>
          Confira sua agenda
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Informações pessoais" {...a11yProps(0)} />
            <Tab label="Paciente agendados" {...a11yProps(1)} />
            <Tab label="Consultar paciente" {...a11yProps(2)} />
            <Tab label="Historico dos pacientes" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Nome: {informacoesMedico.nome} <br />
          Telefone: {informacoesMedico.telefone}
          <br />
          Email: {informacoesMedico.email}
          <br />
          CRM: {informacoesMedico.crm}
          <br />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {consultasSemHistorico.map((consultasPacientes) => {
              return (
                <Box
                  key={consultasPacientes.id}
                  sx={{
                    width: 400,
                    height: 1,
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    boxShadow: 2,
                  }}
                >
                  <Typography sx={{ textAlign: "center", fontStyle: "oblique", margin: 1 }}>
                    Informações do agendamento
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <ItemPacienteAgendado>Paciente: {consultasPacientes.paciente.nome}</ItemPacienteAgendado>
                    <ItemPacienteAgendado>
                      Data: {moment(consultasPacientes.data).add(1, "days").format("DD/MM/YYYY")}
                    </ItemPacienteAgendado>
                    <ItemPacienteAgendado>Hora: {consultasPacientes.hora}</ItemPacienteAgendado>
                    <ItemPacienteAgendado>Contato: {consultasPacientes.paciente.telefone}</ItemPacienteAgendado>
                    <ItemPacienteAgendado>
                      Doença Cronica: {`${consultasPacientes.paciente.doenca_cronica == true ? "Sim" : "Não"}`}
                    </ItemPacienteAgendado>
                    <ItemPacienteAgendado>
                      Tipo de doença Cronica:{" "}
                      {consultasPacientes.paciente.tipo_doenca_cronica
                        ? consultasPacientes.paciente.tipo_doenca_cronica
                        : "Não possui doença cronica"}
                    </ItemPacienteAgendado>
                  </Box>
                </Box>
              );
            })}
          </Box>
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
              {consultasSemHistorico.map((paciente) => {
                return (
                  <MenuItem value={paciente.id}>
                    {paciente.paciente.nome} em {moment(paciente.data).add(1, "days").format("DD/MM")} as{" "}
                    {paciente.hora}
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
