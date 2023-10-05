import { getDB, persistDB } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';

export const PatchCreditLimitSchema = z
  .object({
    name: z.string(),
    amount: z.coerce.number(),
    siren: z.string().regex(/^[A-Z]{2}\d{9}$/, {
      message:
        'SIREN number should match format /^[A-Z]{2}d{9}$/ (e.g. FR123456789)'
    }),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED'])
  })
  .strict()
  .partial();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const db = getDB(req, res);

  const creditLimit = db.creditLimit.findFirst({
    where: { id: { equals: id as string } }
  });

  persistDB(db, res);

  if (creditLimit) {
    if (req.method === 'DELETE') {
      db.creditLimit.delete({ where: { id: { equals: id as string } } });
      persistDB(db, res);
    } else if (req.method === 'PATCH') {
      try {
        const payload = PatchCreditLimitSchema.strict().parse(req.body);
        db.creditLimit.update({
          where: { id: { equals: id as string } },
          data: payload
        });
      } catch (e) {
        if (e instanceof ZodError) {
          return res.status(422).json({ error: e.errors } as any);
        }
      }
    }
    res.status(200).json(creditLimit);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}
