import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import assert from 'node:assert';
import zlib from 'node:zlib';

faker.seed(123);

const initDB = () =>
  factory({
    creditLimit: {
      id: primaryKey(faker.string.uuid),
      name: faker.company.name,
      siren: () =>
        faker.location.countryCode() +
        String(faker.number.int({ min: 100000000, max: 999999999 })),
      status: () =>
        faker.helpers.arrayElement(['APPROVED', 'DECLINED', 'PENDING']),
      amount: () => faker.number.int({ min: 1000, max: 1000000 })
    }
  });

export type CreditLimit = ReturnType<
  ReturnType<typeof initDB>['creditLimit']['create']
>;

const seedDB = (db: ReturnType<typeof initDB>) => {
  for (let i = 0; i < 10; i++) {
    db.creditLimit.create();
  }
};

const COOKIE_NAME = 'db-data';

export const getDB = (req: NextApiRequest, res: NextApiResponse) => {
  const db = initDB();

  let data: object | null = null;
  try {
    data = JSON.parse(
      zlib
        .inflateSync(Buffer.from(req.cookies[COOKIE_NAME] || '', 'base64'))
        .toString()
    );
  } catch {}

  if (data) {
    try {
      assert('creditLimit' in data);
      assert(Array.isArray(data.creditLimit));

      data.creditLimit.forEach((item) => {
        try {
          console.log('test', item.id);
          db.creditLimit.create(item);
        } catch (e) {
          console.error('Could not add to DB', e);
        }
      });
    } catch (e) {
      console.log('Could not load DB from cookie', e);
      seedDB(db);
    }
  } else {
    console.log('Seeding DB');
    seedDB(db);
  }

  persistDB(db, res);
  return db;
};

export const persistDB = (
  db: ReturnType<typeof initDB>,
  res: NextApiResponse
) => {
  res.setHeader(
    'Set-Cookie',
    serialize(
      COOKIE_NAME,
      zlib
        .deflateSync(JSON.stringify({ creditLimit: db.creditLimit.getAll() }))
        .toString('base64'),
      {
        path: '/'
      }
    )
  );
};
