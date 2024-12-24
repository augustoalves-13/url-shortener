import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import App from "./App";

const HomeApp = () => {
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ minHeight: "100vh", padding: 2 }}
        >
            <Grid item xs={12} sx={{ textAlign: "center", marginBottom: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    Encurtador de Links
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ width: "100%", maxWidth: 600 }}>
                <App />
            </Grid>
        </Grid>
    );
};

export default HomeApp;