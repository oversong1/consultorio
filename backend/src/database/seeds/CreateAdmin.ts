import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { hash } from "bcryptjs";

async function create() {
  // Inicializa a conexão com o banco
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);

  const adminEmail = "admin@med.com.br";
  
  // Verifica se já existe
  const userExists = await userRepository.findOneBy({ email: adminEmail });

  if (!userExists) {
    const hashedPassword = await hash("admin123", 8);

    const user = userRepository.create({
      name: "Administrador Padrão",
      email: adminEmail,
      password: hashedPassword,
    });

    await userRepository.save(user);
    console.log("Usuário administrador criado com sucesso!");
  } else {
    console.log("Usuário administrador já existe.");
  }

  // Fecha a conexão após terminar
  await AppDataSource.destroy();
}

create().catch((err) => console.error("Erro ao criar admin:", err));