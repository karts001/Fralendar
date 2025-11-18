import { PrismaClient } from "@prisma/client";

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async syncUser(userId: string, email: string) {
    let user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          id: userId,
          email: email,
        }
      });

    return user;
    }
  }
}