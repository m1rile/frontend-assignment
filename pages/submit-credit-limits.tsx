import SubmissionForm from "@/components/SubmissionForm";
import { CreditLimit } from "@/lib/db";
import { useEffect, useState } from "react";

export default function SubmitCreditLimits() {
    const [creditLimits, setCreditLimits] = useState<CreditLimit[]>([]);

    useEffect(() => {
        try {
          fetch('/api/credit-limits')
          .then((response) => response.json())
          .then((data) => setCreditLimits(data));
        } catch (error) {
          console.error("ERROR: ", error);
          setCreditLimits([]);
        }
      }, [setCreditLimits]);
      
    return (
        <main>
            <div className="p-10 w-full text-center">
                <h1 className="text-xl pt-2 pb-4">SUBMIT CREDIT LIMITS</h1>

                <SubmissionForm creditLimits={creditLimits} />
            </div>
        </main>
    )
}