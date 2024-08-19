import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  console.log(balance);

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export default async function () {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  const balance = await getBalance();
  return (
    // <div className="text-4xl text-[#290089] pt-16 pl-8 mb-8 font-bold">
    //   Current balance :{" "}
    //   <span className="text-3xl font-bold text-[#04000f]">
    //     ₹{(balance.amount / 100).toFixed(2)}
    //   </span>
    <a
      href="#"
      className="w-full p-6  border border-gray-200 rounded-lg shadow  bg-gray-700 h-[calc(80vh)] flex items-center justify-center ml-2 m-6"
    >
      <div className="text-4xl text-[#f2f2f2] pt-16 mb-8 font-bold">
        Current balance :{" "}
        <span className="text-3xl font-bold text-[#04000f]">
          ₹{(balance.amount / 100).toFixed(2)}
        </span>{" "}
        <div className="">
          Name :{" "}
          <span className=" text-right text-3xl font-bold text-[#04000f]">
            {session.user.name}
          </span>
        </div>
        <div className="">
          Email :{" "}
          <span className=" text-right text-3xl font-bold text-[#04000f]">
            {session.user.email}
          </span>
        </div>
      </div>
    </a>
  );
}
