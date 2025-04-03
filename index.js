const fs = require("fs");
const path = require("path");
const SMTPServer = require("smtp-server").SMTPServer;

const EMAILS_DIR = path.join(__dirname, "emails"); // Directory to store emails

// Ensure the directory exists
if (!fs.existsSync(EMAILS_DIR)) {
  fs.mkdirSync(EMAILS_DIR, { recursive: true });
}

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, callback) {
    console.log("On connect", session.id);

    callback(); // Accept connection
  },
  onMailFrom(address, session, callback) {
    console.log("On mail from", address.address, session.id);

    callback(); // Accept connection
  },
  onData(stream, session, callback) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Format timestamp
    const filename = path.join(EMAILS_DIR, `email-${timestamp}.eml`);
    const writeStream = fs.createWriteStream(filename);

    stream.pipe(writeStream); // Write email data to file

    stream.on("end", () => {
      console.log(`Email saved to ${filename}`);
      callback(); // Signal end of message processing
    });

    stream.on("error", (err) => {
      console.error("Error writing email to file:", err);
    });
  },
});

server.listen(25, () => console.log("Server is listening on port 25"));
