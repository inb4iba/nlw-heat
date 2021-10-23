import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code, client_type } = req.body;

    const service = new AuthenticateUserService();
    try {
      const result = await service.execute(code, client_type);
      return res.json(result);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export { AuthenticateUserController };
