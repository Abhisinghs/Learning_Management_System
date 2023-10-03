import { createTransport } from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = createTransport();

  await transporter.sendMail({
    to,
    subject,
    text,
    from: "myid@gmail.com",
  });
};

export default sendEmail;
