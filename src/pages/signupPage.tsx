import React, { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../contexts/authContext";

const SignupPage: React.FC = () => {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password);
      setSuccess("Account created. Check your email if confirmation is required.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create an account
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={6}>
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
            <TextField
              required
              type="password"
              label="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              inputProps={{ minLength: 6 }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Creating account..." : "Sign up"}
            </Button>
            <Button component={Link} to="/login">
              Already have an account? Sign in
            </Button>
          </Stack>
        </Box>
        {success && (
          <Button onClick={() => navigate("/login")} sx={{ mt: 2 }}>
            Go to sign in
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default SignupPage;
