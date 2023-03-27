import { Box, Container, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      sx={{ marginTop: "calc(10% + 60px)", width: "100%", position: "fixed", bottom: 0, width: "100%" }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        >
          <div>
            <h2>Consultamed</h2>
          </div>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            matheusdev
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
