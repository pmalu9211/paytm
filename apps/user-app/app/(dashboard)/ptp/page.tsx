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
      <div className="flex flex-col items-center justify-center w-10/12 h-96">
        <TextInput
          placeholder="id of other person"
          label="id"
          onChange={(e) => {
            setReciversId(Number(e));
          }}
        ></TextInput>
        <br />
        <TextInput
          placeholder="amount"
          label="amount"
          onChange={(e) => {
            setAmount(Number(e));
          }}
        ></TextInput>

        <Button
          onClick={() => {
            ptpTxn(reciversId, amount);
          }}
        >
          Send
        </Button>
      </div>
    </>
  );
}
