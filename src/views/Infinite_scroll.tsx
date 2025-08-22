import { useEffect, useState, useRef } from "react";

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  type: string;
  email: string;
  [key: string]: any;
};

function Dashboard() {
  return (
    <div>
      <h2>Infinite scroll simple</h2>
    </div>
  );
}

export default Dashboard;
