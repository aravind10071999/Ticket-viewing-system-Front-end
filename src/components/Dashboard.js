import React, { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [apiKey, setApiKey] = useState('');
  const [domain, setDomain] = useState('');
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const statusMap = {
    2: 'Open',
    3: 'Pending',
    4: 'Resolved',
    5: 'Closed'
  };

  const priorityMap = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent'
  };

  const fetchTickets = async () => {
    const response = await axios.get('http://localhost:5000/api/freshdesk/tickets', {
      headers: { apiKey, domain }
    });
    setTickets(response.data);
  };

  const fetchTicketDetails = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/freshdesk/ticket/${id}`, {
      headers: { apiKey, domain }
    });
    setSelectedTicket(response.data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Freshdesk Tickets</h2>
      <input placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
      <input placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      <button onClick={fetchTickets}>Connect</button>

      <hr />

      {tickets.map((ticket) => (
        <div key={ticket.id} onClick={() => fetchTicketDetails(ticket.id)} style={{ marginBottom: 10, cursor: 'pointer', border: '1px solid #ccc', padding: '10px', borderRadius: 5 }}>
          <strong>{ticket.subject}</strong><br />
          Status: {statusMap[ticket.status]} | Priority: {priorityMap[ticket.priority]}<br />
          Requester ID: {ticket.requester_id}
        </div>
      ))}

      {selectedTicket && (
        <div style={{ marginTop: 20, backgroundColor: '#f7f7f7', padding: 15, borderRadius: 5 }}>
          <h3>🎫 Ticket Details</h3>
          <p><strong>Subject:</strong> {selectedTicket.ticket.subject}</p>
          <p><strong>Description:</strong> {selectedTicket.ticket.description_text}</p>
          <p><strong>Status:</strong> {statusMap[selectedTicket.ticket.status]}</p>
          <p><strong>Priority:</strong> {priorityMap[selectedTicket.ticket.priority]}</p>

          <h4>💬 Conversations</h4>
          {selectedTicket.conversations.map((msg, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '10px', borderLeft: '4px solid #007bff' }}>
              <strong>{msg.from_email}</strong><br />
              <p>{msg.body_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
