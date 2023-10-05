import { CreditLimit } from '@/lib/db';
import { useEffect, useState } from 'react';

export default function Home() {
  const [creditLimits, setCreditLimits] = useState<CreditLimit[]>([]);

  useEffect(() => {
    fetch('/api/credit-limits')
      .then((response) => response.json())
      .then((data) => setCreditLimits(data));
  }, [setCreditLimits]);

  return (
    <div className="p-10 xl:max-w-[80%] m-auto">
      <h1 className="text-xl border-b-2 border-slate-400 py-2 mb-5">
        Credit limits
      </h1>
      <ul>
        {creditLimits.map((creditLimit) => (
          <li key={creditLimit.id}>
            {creditLimit.name} ({creditLimit.siren}) - €{creditLimit.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
