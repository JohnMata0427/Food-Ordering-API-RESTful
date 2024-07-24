import nodemailer from "nodemailer";
import 'dotenv/config'

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    },
});

const sendMailToUser = (userMail, token) => {
    let mailOptions = {
        from: process.env.USER_MAILTRAP,
        to: userMail,
        subject: "Verifica tu cuenta - ESFOT Association Food Order 🍛🍽️",
        html: `<p>Hola, haz clic <a href="${
            process.env.URL_FRONTEND
        }confirmar/${encodeURIComponent(
            token
        )}">aquí</a> para confirmar tu cuenta.</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Correo enviado: " + info.response);
        }
    });
};

const sendMailToRecoveryPassword = async (userMail, token, rol) => {
    let info = await transporter.sendMail({
        from: "admin@vet.com",
        to: userMail,
        subject:
            "Correo para reestablecer tu contraseña - ESFOT Association Food Order 🍛🍽️",
        html: `
    <h1>Sistema de gestión (FOOD - ESFOT)</h1>
    <hr>
    <a href=${process.env.URL_FRONTEND + rol}/recuperarpassword/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>Bienvenido!</footer>
    `,
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
};

export { sendMailToRecoveryPassword, sendMailToUser };
