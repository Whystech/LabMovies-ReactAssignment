import React, { FormEvent, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../contexts/authContext";

const LoginPage: React.FC = () => {
  const { signIn, signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signIn") {
        await signIn(email, password);
        navigate(destination, { replace: true });
      } else {
        await signUp(email, password);
        setMode("signIn");
        setError("Account created. Check your email if confirmation is required.");
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {mode === "signIn" ? "Sign in" : "Create an account"}
        </Typography>
        {error && <Alert severity={mode === "signUp" ? "info" : "error"} sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              required
              type="email"
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              required
              type="password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              inputProps={{ minLength: 6 }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Please wait..." : mode === "signIn" ? "Sign in" : "Sign up"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setMode(mode === "signIn" ? "signUp" : "signIn");
                setError("");
              }}
            >
              {mode === "signIn" ? "Create an account" : "Already have an account? Sign in"}
            </Button>
            <Button component={Link} to="/signup">
              Open signup page
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
