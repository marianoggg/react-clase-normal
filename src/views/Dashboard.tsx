function Dashboard() {
  const userName = JSON.parse(localStorage.getItem("user") || "{}").first_name;

  return (
    <div>
      <h2>Dashboard</h2>
      <div>Bienvenido {userName}!</div>
    </div>
  );
}

export default Dashboard;
