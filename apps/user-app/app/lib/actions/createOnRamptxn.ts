"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const createOnRamptxn = async (amount: number, provider: string) => {
  const seassion = await getServerSession(authOptions);
  const userId = seassion.user.id;
  const token = Math.random().toString();
  if (!userId) {
    return {
      message: "the user is not logged in",
    };
  }
  const response = await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId), //to handle decimal values
      amount: amount * 100,
      startTime: new Date(),
      token,
      provider,
      status: "Processing",
    },
  });
  return {
    response,
    message: "created successfully",
  };
};
