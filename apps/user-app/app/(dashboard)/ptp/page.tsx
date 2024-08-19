"use client";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { ptpTxn } from "../../lib/actions/ptpTsx";

export default function Ptp() {
  const [reciversId, setReciversId] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center w-full h-[80vh]">
        <div className=" rounded-xl p-8 border border-black">
          <TextInput
            placeholder="id of other person"
            label="ID"
            onChange={(e) => {
              setReciversId(Number(e));
            }}
          ></TextInput>
          <br />
          <TextInput
            placeholder="amount"
            label="Amount"
            onChange={(e) => {
              setAmount(Number(e));
            }}
          ></TextInput>

          <div className="w-full flex justify-center mt-7">
            <Button
              onClick={() => {
                ptpTxn(reciversId, amount);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
