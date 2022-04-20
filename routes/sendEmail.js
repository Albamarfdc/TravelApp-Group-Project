require("../connections/mongo");
const { Router } = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const sendEmail = Router();

//VER COMO CONSIGO EL EMAIL DEL USUARIO AL QUE LE QUIERO ENVIAR LLOS MAILS
// let mailTransporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "travelapp10@gmail.com",
//     pass: "proyectogrupal10",
//   },
// });

// let details = {
//   from: "travelapp10@gmail.com",
//   to: "agustinapaez96@gmail.com",
//   subject: "testing our nodemailer",
//   text: "probando nodemailer para la app",
// };

// mailTransporter.sendMail(details, (err) => {
//   if (err) {
//     console.log("hubo un pinshi error", err);
//   } else {
//     console.log("email sent");
//   }
// });

sendEmail.post("/", (req, res) => {
  const { username, email } = req.body;
  const contentHtml = `
    <h1>Hola ${username}!</h1>
    <p>Bienvenido a TravelApp</p>
    `;

  const GOOGLE_CLIENT_ID =
    "720796673981-us7jgj5e8ospme3qt22432hiedcni3vt.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  //const CLIENT_REFRESH = '';
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04Hu7Mmwq_Z0gCgYIARAAGAQSNwF-L9IrIDR-8uKa9dM0oQOIzoOt1r8HfEVH7LQJejAdVqpOucWktjWb_9I2zVmiuP98nKv6zYU";

  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  async function envMail() {
    try {
      const accesToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "travelapp10@gmail.com",
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accesToken,
        },
      });
      const mailOptions = {
        from: "Travel App <travelapp10@gmail.com>",
        to: `${email}`,
        subject: "Welcome to Travel App",
        html: contentHtml,
      };
      const result = await transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  envMail()
    .then((result) => res.status(200).send("Email enviado"))
    .catch((error) => console.log(error.message));
});

module.exports = sendEmail;