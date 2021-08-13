import type { ExpressContext } from "apollo-server-express";
import type { UserPayload } from "../controllers/types";
import { PrismaClient } from "@prisma/client";
import { userSelect } from "../controllers/types";
import jwt from "jsonwebtoken";

export type Context = {
  prisma: PrismaClient;
  user?: UserPayload;
  timezone?: string;
};

const prisma = new PrismaClient();

export async function authorize(
  authorization: string
): Promise<UserPayload | undefined> {
  try {
    const token = authorization.substring(7);
    const key = process.env.JWT_KEY as string;
    const data = jwt.verify(token, key) as UserPayload;
    const user: UserPayload | null = await prisma.user.findUnique({
      where: { id: data.id },
      select: userSelect
    });
    if (!user) throw new Error();
    return user;
  } catch (error) {
    return;
  }
}

export default async function context(
  context: ExpressContext
): Promise<Context> {
  const user = await authorize(context.req.headers.authorization as string);
  const timezone = context.req.headers.timezone as string;
  if (user) return { prisma, user, timezone };
  return { prisma };
}
