CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"account_number" integer NOT NULL,
	"agency_number" integer NOT NULL,
	"bank_code" integer NOT NULL,
	"balance" numeric(10, 2) DEFAULT 10000,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_account_number_unique" UNIQUE("account_number"),
	CONSTRAINT "accounts_agency_number_unique" UNIQUE("agency_number"),
	CONSTRAINT "accounts_bank_code_unique" UNIQUE("bank_code")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"external_id" text,
	"account_id" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"expected_on" timestamp,
	"due_date" timestamp,
	"status" text NOT NULL,
	"transaction_type" text NOT NULL,
	"transfer_method" text,
	"beneficiary_account_holder" integer,
	"beneficiary_account_number" integer,
	"beneficiary_agency_number" integer,
	"beneficiary_bank_code" integer,
	"transaction_description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;