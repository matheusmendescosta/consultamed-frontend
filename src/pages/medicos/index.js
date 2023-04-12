import Navbar from "@/components/Navbar";
import * as React from "react";
import { Box, Container } from "@mui/system";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import ApiMedico from "../../service/medico/ApiMedico.js";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import Head from "next/head.js";
import Image from "next/image.js";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export async function getServerSideProps() {
  const medicos = await ApiMedico.getMedicos();
  return {
    props: {
      medicos,
    },
  };
}

const Item = styled(Paper)(({ theme }) => ({
  margin: 10,
  padding: theme.spacing(4),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const filter = createFilterOptions();

export default function Medicos(props) {
  const listaMedicos = props.medicos.map((med) => med.nome);

  console.log("medicos", props.medicos);

  const [value, setValue] = React.useState(null);
  return (
    <>
      <Head>
        <title>Medicos - Consultamed</title>
        <meta name="description" content="Agendamento de consultas online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/medicos.ico" />
      </Head>

      <Navbar />
      <Container maxWidth="xl">
        <CardHeader title="Consultamed" subheader="Conheça nossos medicos e agende sua consulta" />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setValue({
                title: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                title: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            //const isExisting = options.some((option) => inputValue === option.title);
            // if (inputValue !== "" && !isExisting) {
            //   filtered.push({
            //     inputValue,
            //     title: `Add "${inputValue}"`,
            //   });
            // }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="lista-de-medicos"
          options={listaMedicos}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            //return options;
          }}
          renderOption={(props, option) => <li {...props}>{option}</li>}
          sx={{ margin: 1 }}
          freeSolo
          renderInput={(params) => <TextField {...params} label="Busque por um médico" />}
        />
        {props.medicos.map((item) => {
          return (
            <Box key={item.id} sx={{ width: "100%" }}>
              <Stack spacing={3}>
                <Item sx={{ display: "flex" }}>
                  <Image src="/4136933.jpg" alt="Picture of the author" width={200} height={200} />
                  <Box sx={{ ml: 5 }}>
                    <p>
                      <strong>Doutor:</strong> {item.nome}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {item.telefone}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                    <p>
                      <strong>Especialidade:</strong> {item.especialidade.nome}
                    </p>
                  </Box>
                </Item>
              </Stack>
            </Box>
          );
        })}
      </Container>
    </>
  );
}
