import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <>
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
    </>
  );
}
