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
        }auth/confirmar-email/${encodeURIComponent(
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

const sendMailToRecoveryPassword = async (userMail, token, codigo, rol) => {
    let info = await transporter.sendMail({
        from: "admin@vet.com",
        to: userMail,
        subject:
            "Correo para reestablecer tu contraseña - ESFOT Association Food Order 🍛🍽️",
        html: `
    <h1>Sistema de gestión (FOOD - ESFOT)</h1>
    <hr>
    
    <span>Su código de verificación es:</span>
    <strong style:"font-size: 20px;color: #C36745">${codigo}</strong>
    <br>

    <a href=${process.env.URL_FRONTEND + rol}auth/recuperar-password/${token}>Clic para reestablecer tu contraseña</a>

    <p>Si no solicitaste este cambio, por favor ignora este correo.</p>

    <hr>
    <footer>&copy; ESFOT Association Food Ordering</footer>
    `,
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
};

export { sendMailToRecoveryPassword, sendMailToUser };
