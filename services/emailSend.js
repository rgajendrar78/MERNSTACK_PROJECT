import nodemailer from "nodemailer";

export const sendEmail = async (from, to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", // Add your email address here
        pass: "", // Add your email password here
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);

    return info;
  } catch (error) {
    throw new Error("Error sending email");
  }
};
