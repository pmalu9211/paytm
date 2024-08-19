import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function fetchTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns;
}

export default async function () {
  const txns = await fetchTransactions();
  console.log(`${txns} hello`);
  txns.map((t) => console.log(t));

  return (
    <div>
      <h1 className="text-4xl text-[#6a51a6] pt-8 mb-2 font-bold">
        Transactions
      </h1>
      <div className="h-full min-w-[80vw] border-black rounded-3xl m-6 ml-2 p-8">
        <div className={`flex justify-between border-slate-300 text-xl p-8 `}>
          <div>Provider</div>
          <div className={`text-xl`}>Status</div>
          <div> Amount</div>
          <div>Time</div>
          <div>Id</div>
        </div>
        {txns.map((t) => (
          <div
            key={t.id}
            className={`flex justify-between border-slate-300 text-xl p-8 ${t.status === "Success" ? "border border-green-500" : "border border-orange-300 "} mb-2 rounded-3xl`}
          >
            <div>{t.provider}</div>
            <div
              className={`${t.status === "Success" ? "text-green-400" : "text-orange-300"} font-bold text-3xl`}
            >
              {t.status}
            </div>
            <div> ₹ {(t.amount / 100).toFixed(2)}</div>
            <div>{t.startTime.toDateString()}</div>
            <div>{t.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
