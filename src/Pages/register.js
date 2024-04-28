import React, { useState } from 'react';
import { TextField, Grid, Paper, Button } from '@mui/material';
import HttpService from '../httpservice';
import { connect, useSelector } from 'react-redux'
import { loginUserAction } from '../Redux/action/loginAction';
const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await HttpService.register(formData);
    localStorage.setItem('name', 'Deepak');
    setRegistrationSubmitted(true); // Update registration status
    // You can handle form submission here, e.g., send form data to an API
    console.log(formData);
  };

  const isRegistered = !!localStorage.getItem('name');

  const handleLogin = async (e) => {
    e.preventDefault()
    let obj={
      email : formData.email,
      password : formData.password
  };
  let response = await HttpService.login(obj);
  const { token, user } = response.data;

  localStorage.setItem('token',token)
  console.log()
  props.loginUserAction(user)


  console.log(obj,"this is the obj is calle")
}

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          {!isRegistered ? (
            <>
              <h2>Register</h2>
              <form onSubmit={handleSubmit}>
                {!registrationSubmitted && (
                  <TextField
                    fullWidth
                    margin="normal"
                    id="name"
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                )}
                {isRegistered ? (
                  <p>Please log in with your registered email and password.</p>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {!registrationSubmitted && (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                      >
                        Submit
                      </Button>
                    )}
                  </>
                )}
              </form>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <form>
                <TextField
                  fullWidth
                  margin="normal"
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  style={{ marginTop: '10px' }}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default connect(null, { loginUserAction })(Register);
