CREATE TABLE IF NOT EXISTS "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"countryCode" char(3),
	"district" varchar NOT NULL,
	"population" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "country" (
	"code" char(3) PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"continent" varchar NOT NULL,
	"region" varchar NOT NULL,
	"surfacearea" real NOT NULL,
	"indepyear" smallint NOT NULL,
	"population" integer NOT NULL,
	"lifeexpectancy" real,
	"gnp" numeric(10, 2),
	"gnpold" numeric(10, 2),
	"localname" varchar NOT NULL,
	"governmentform" varchar NOT NULL,
	"headofstate" varchar NOT NULL,
	"capital" integer,
	"code2" char(2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "countrylanguage" (
	"countrycode" char(3),
	"language" varchar,
	"isofficial" boolean NOT NULL,
	"percentage" real NOT NULL,
	CONSTRAINT countrylanguage_countrycode_language PRIMARY KEY("countrycode","language")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "country" ADD CONSTRAINT "country_capital_city_id_fk" FOREIGN KEY ("capital") REFERENCES "city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "countrylanguage" ADD CONSTRAINT "countrylanguage_countrycode_country_code_fk" FOREIGN KEY ("countrycode") REFERENCES "country"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
