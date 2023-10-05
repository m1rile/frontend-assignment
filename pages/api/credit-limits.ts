import { CreditLimit, getDB, persistDB } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';

type Data = CreditLimit[] | CreditLimit;

export const CreateCreditLimitSchema = z
  .object({
    name: z.string(),
    amount: z.coerce.number(),
    siren: z.string().regex(/^[A-Z]{2}\d{9}$/, {
      message:
        'SIREN number should match format /^[A-Z]{2}d{9}$/ (e.g. FR123456789)'
    })
  })
  .strict();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = getDB(req, res);

  if (req.method === 'POST') {
    try {
      const payload = CreateCreditLimitSchema.parse(req.body);
      const creditLimit = db.creditLimit.create({
        ...payload,
        status: 'PENDING'
      });
      persistDB(db, res);
      res.status(201).json(creditLimit);
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(422).json({ error: e.errors } as any);
      }
    }
  } else {
    res.status(200).json(db.creditLimit.getAll());
  }
}
