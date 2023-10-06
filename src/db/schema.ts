import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, char, real, smallint, numeric, boolean, primaryKey, AnyPgColumn } from 'drizzle-orm/pg-core';

export const city = pgTable('city', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  countryCode: char('countryCode', { length: 3 }),
  district: varchar('district').notNull(),
  population: integer('population').notNull()
})

export const country = pgTable('country', {
  code: char('code', { length: 3 }).primaryKey(),
  name: varchar('name').notNull(),
  continent: varchar('continent').notNull(),
  region: varchar('region').notNull(),
  surfacearea: real('surfacearea').notNull(),
  indepyear: smallint('indepyear').notNull(),
  population: integer('population').notNull(),
  lifeexpectancy: real('lifeexpectancy'),
  gnp: numeric('gnp', { precision: 10, scale: 2 }),
  gnpold: numeric('gnpold', { precision: 10, scale: 2 }),
  localname: varchar('localname').notNull(),
  governmentform: varchar('governmentform').notNull(),
  headofstate: varchar('headofstate').notNull(),
  capital: integer('capital').references((): AnyPgColumn => city.id),
  code2: char('code2', { length: 2 })
})


export const countrylanguage = pgTable('countrylanguage', {
  countrycode: char('countrycode', { length: 3 }).references((): AnyPgColumn => country.code),
  language: varchar('language'),
  isofficial: boolean('isofficial').notNull(),
  percentage: real('percentage').notNull()
}, (table) => {
  return {
    pk: primaryKey(table.countrycode, table.language),
  }
})
