import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('https://ticket-viewing-system-back-end.onrender.com/api/webhook/logs').then(res => setLogs(res.data));
  }, []);

  return (
    <div>
      <h2>Webhook Logs</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}><pre>{JSON.stringify(log, null, 2)}</pre></li>
        ))}
      </ul>
    </div>
  );
}