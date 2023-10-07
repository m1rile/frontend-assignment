import CustomButton from '@/components/CustomButton';
import { CreditLimit } from '@/lib/db';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const [creditLimits, setCreditLimits] = useState<CreditLimit[]>([]);
  const router = useRouter();

  const handleNavigateToSubmitPage = () => {
    // Use router.push to navigate to the "Submit Credit Limits" page
    router.push('/submit-credit-limits');
  };

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
    <div className="p-10 xl:max-w-[80%] m-auto">

    <div className='flex justify-between border-b-2 border-slate-400 mb-5'>
      <h1 className="text-xl py-2">
        Credit limits
      </h1>

      <CustomButton 
        title="Submit" 
        containerStyles="border-2 bg-blue-400 rounded-md p-2 text-white"
        handleClick={handleNavigateToSubmitPage}
      />
    </div>

      <ul>
        {creditLimits.map((creditLimit) => (
          <li key={creditLimit.id} className="border-2 flex justify-between gap-2">
            <span className='flex-1'>{creditLimit.name}</span>
            <span className='flex-1'>({creditLimit.siren})</span>
            <span className='flex-1'>- €{creditLimit.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
