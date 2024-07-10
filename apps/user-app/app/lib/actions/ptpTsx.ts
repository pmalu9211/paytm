"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function ptpTxn(reciverId: number, amount: number) {
  amount = amount * 100;
  const session = await getServerSession(authOptions);
  const giverId = Number(session?.user?.id);
  if (!giverId) {
    return {
      message: "not logged in",
    };
  }

  //testing for CI for the second time

  const reciver = prisma.user.findFirst({
    where: {
      id: Number(reciverId),
    },
  });

  if (!reciver) {
    return {
      message: "reciver dosen't exists",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT * FROM "Balance" WHERE "userId" = ${giverId} FOR UPDATE`;
      const balance = await tx.balance.findFirst({
        where: {
          userId: Number(giverId),
        },
      });
      if ((balance?.amount || 0) < amount) {
        throw new Error("you are poor");
      }
      await tx.balance.update({
        where: {
          userId: Number(giverId),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      }),
        await tx.balance.update({
          where: {
            userId: Number(reciverId),
          },
          data: {
            amount: {
              increment: amount,
            },
          },
        });
      await tx.p2pTransfer.create({
        data: {
          amount: Number(amount),
          timestamp: new Date(),
          fromUserId: Number(giverId),
          toUserId: Number(reciverId),
        },
      });
    });

    return {
      message: "completerd the transaction",
    };
  } catch (e) {
    return {
      message: "unable to transfer ptp",
    };
  }
}
