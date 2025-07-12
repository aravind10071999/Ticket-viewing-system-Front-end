const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });
    localStorage.setItem('token', res.data.token);
    window.location.href = '/dashboard';
  } catch (err) {
    alert(err.response?.data?.msg || "Login failed. Please try again.");
    console.error("Login error:", err);
  }
};