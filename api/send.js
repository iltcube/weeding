import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fullname, presence, drinks, transfer } = req.body;

    const email = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "312.yakuba@gmail.com",
      subject: "Новая анкета на свадьбу",
      html: `
        <h2>Новая анкета гостя</h2>

        <p><strong>Имя:</strong> ${fullname}</p>

        <p><strong>Присутствие:</strong> ${presence}</p>

        <p><strong>Напитки:</strong></p>
        <ul>
          ${
            drinks.length
              ? drinks.map((d) => `<li>${d}</li>`).join("")
              : "<li>Не выбрано</li>"
          }
        </ul>

        <p><strong>Трансфер:</strong> ${transfer ? "Нужен" : "Не нужен"}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      email,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
