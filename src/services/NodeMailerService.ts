import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import UserRepository from "../repositories/UserRepository";

export default class NodeMailerService {
  constructor(private userRepository: UserRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute(email: string, resetPass: boolean) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return null;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: resetPass
        ? "Réinitialisez votre mot de passe"
        : "Lien d'activation Pharmacie",
      html: `
        <h3>Bonjour ${user.givenName}!
        <p>${
          resetPass
            ? "Ceci est un courriel de test pour réinitialiser votre mot de passe."
            : "Ceci est un courriel de test pour réactiver votre compte."
        }
          Aucune action n'est requise
        </p>
        <p>Bonne journée.</p>
      `,
    };

    try {
      const response = await transporter.sendMail(message);

      return response;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
