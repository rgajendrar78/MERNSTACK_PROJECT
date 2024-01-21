import * as emailService from "../services/emailSend.js";

export const emailSend = async (req, res) => {
  try {
    const from = ""; // Add your sender email address here
    const to = ""; // Add your recipient email address here
    const subject = "Sending Email using Node.js";
    const text = "That was easy!";

    // Send email using the service
    await emailService.sendEmail(from, to, subject, text);

    res.json({
      status: "success",
      message: "Email has been sent successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
