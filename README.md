# SMTP Server Project

A simple SMTP (Simple Mail Transfer Protocol) server implementation for handling email transmission between mail servers. This project demonstrates the core functionality of SMTP, including session management, message transfer, and DNS record validation.It stores emails in emails folder.

---

## Table of Contents
- [How SMTP Works](#how-smtp-works)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Managing the Server with PM2](#managing-the-server-with-pm2)

---

## How SMTP Works

SMTP is a protocol used to send and relay emails between servers. Here’s a simplified workflow:

1. **Connection Initiation**  
   The sender's server connects to your SMTP server using the IP address derived from DNS records (MX and A records).

2. **Handshake and Session Setup**  
   - The client sends a `HELO`/`EHLO` command to start the session.  
   - The server responds with a greeting and supported features (e.g., STARTTLS for encryption).

3. **Email Transfer**  
   - The client specifies the sender with `MAIL FROM:<sender@domain.com>`.  
   - The client specifies recipients with `RCPT TO:<recipient@domain.com>`.  
   - The client sends the email content using the `DATA` command, followed by the message body.

4. **Session Termination**  
   The client ends the session with `QUIT`.

---

## Prerequisites
- Node.js (v14+) and npm installed.
- A Linux/Unix-based server (recommended).
- Administrative access to configure DNS records and open ports.

---

## Setup Instructions

### 1. Clone the Repository & Install Dependencies
```bash
git clone https://github.com/Narendra-Mahara/smtp-server.git
cd smtp-server
npm install
```

### 2. Open Port 25

SMTP uses port 25 by default. Ensure it’s open on your firewall:



```
sudo ufw allow 25/tcp
sudo ufw reload

```

### 3. Configure DNS Records
For other servers to find your SMTP server:

#### MX Record (Mail Exchange):
Directs emails to your server’s hostname.
Example:

```
yourdomain.com.  IN  MX  10 mail.yourdomain.com.
```
#### A Record:
Maps the hostname from the MX record to your server’s IP.
Example:

```
mail.yourdomain.com.  IN  A  195.5.20.19
```
### 4. Start the Server
Run the server directly:
```
node server.js
```
For production use, run it as a background process with PM2:
```
npm install -g pm2
pm2 start server.js --name smtp-server
pm2 save && pm2 startup
```
## Managing the Server with PM2
| Command	 | Description|
| -------- | ------- |
```pm2 logs smtp-server``` |	View logs
```pm2 restart smtp-server	```|Restart the server
```pm2 delete smtp-server```	|Stop and remove from PM2




---
> [!NOTE]  
> Configure SPF, DKIM, and DMARC to prevent spoofing.
> Avoid open relays by adding authentication.


---
