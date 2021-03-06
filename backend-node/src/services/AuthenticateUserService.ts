import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

/*
X Receber code(string)
X Recuperar o access_token no github
X Recuperar infos do usuario no github
X Verificar se o usuario existe no db
-- SIM = gera um token
-- NÃO = cria no db, gera um token
Retornar o token com as infos do usuario logado
*/

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string, client_type: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id:
            client_type === "web"
              ? process.env.GITHUB_CLIENT_ID_WEB
              : process.env.GITHUB_CLIENT_ID_APP,
          client_secret:
            client_type === "web"
              ? process.env.GITHUB_CLIENT_SECRET_WEB
              : process.env.GITHUB_CLIENT_SECRET_APP,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });

    const { data: userRes } = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = userRes;

    console.log(prismaClient.user);

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_TOKEN_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
