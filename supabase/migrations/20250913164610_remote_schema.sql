create schema if not exists "erp1";


  create table "erp1"."activities" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "title" text not null,
    "description" text,
    "entity_id" uuid,
    "entity_type" text,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now()
      );


alter table "erp1"."activities" enable row level security;


  create table "erp1"."clients" (
    "id" uuid not null default gen_random_uuid(),
    "company_name" text not null,
    "contact_person" text,
    "email" text,
    "phone" text,
    "address" text,
    "status" text default 'active'::text,
    "revenue" numeric(12,2) default 0,
    "lead_id" uuid,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."clients" enable row level security;


  create table "erp1"."companies" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "address" text not null,
    "phone" text,
    "email" text not null,
    "tin" text,
    "business_type" text not null default 'retail'::text,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."companies" enable row level security;


  create table "erp1"."customers" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "email" text,
    "phone" text,
    "address" text,
    "customer_type" text default 'regular'::text,
    "credit_limit" numeric(12,2) default 0,
    "current_balance" numeric(12,2) default 0,
    "is_active" boolean default true,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."customers" enable row level security;


  create table "erp1"."leads" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "contact_person" text,
    "email" text,
    "phone" text,
    "status" text default 'new'::text,
    "source" text,
    "value" numeric(10,2) default 0,
    "assigned_to" uuid,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."leads" enable row level security;


  create table "erp1"."opportunities" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "client_name" text not null,
    "value" numeric(12,2) not null default 0,
    "probability" integer default 50,
    "stage" text default 'discovery'::text,
    "close_date" date,
    "owner" uuid,
    "lead_id" uuid,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."opportunities" enable row level security;


  create table "erp1"."products" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "sku" text not null,
    "category" text not null,
    "unit_price" numeric(10,2) not null default 0,
    "cost_price" numeric(10,2) not null default 0,
    "stock_quantity" integer default 0,
    "reorder_level" integer default 10,
    "unit_of_measure" text default 'pcs'::text,
    "barcode" text,
    "is_active" boolean default true,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."products" enable row level security;


  create table "erp1"."profiles" (
    "id" uuid not null,
    "email" text,
    "full_name" text,
    "avatar_url" text,
    "role" text default 'user'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."profiles" enable row level security;


  create table "erp1"."sales" (
    "id" uuid not null default gen_random_uuid(),
    "sale_number" text not null,
    "customer_id" uuid,
    "customer_name" text not null,
    "total_amount" numeric(12,2) not null default 0,
    "tax_amount" numeric(12,2) default 0,
    "discount_amount" numeric(12,2) default 0,
    "payment_method" text default 'cash'::text,
    "payment_status" text default 'paid'::text,
    "notes" text,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."sales" enable row level security;


  create table "erp1"."sales_items" (
    "id" uuid not null default gen_random_uuid(),
    "sale_id" uuid not null,
    "product_id" uuid not null,
    "product_name" text not null,
    "quantity" integer not null,
    "unit_price" numeric(10,2) not null,
    "total_price" numeric(12,2) not null,
    "created_at" timestamp with time zone default now()
      );


alter table "erp1"."sales_items" enable row level security;


  create table "erp1"."suppliers" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "contact_person" text,
    "email" text,
    "phone" text,
    "address" text,
    "payment_terms" text default 'cash'::text,
    "current_balance" numeric(12,2) default 0,
    "is_active" boolean default true,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."suppliers" enable row level security;


  create table "erp1"."tasks" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "description" text,
    "status" text default 'pending'::text,
    "priority" text default 'medium'::text,
    "due_date" date,
    "due_time" time without time zone,
    "assigned_to" uuid,
    "lead_id" uuid,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "erp1"."tasks" enable row level security;

CREATE UNIQUE INDEX activities_pkey ON erp1.activities USING btree (id);

CREATE UNIQUE INDEX clients_pkey ON erp1.clients USING btree (id);

CREATE UNIQUE INDEX companies_pkey ON erp1.companies USING btree (id);

CREATE UNIQUE INDEX customers_pkey ON erp1.customers USING btree (id);

CREATE UNIQUE INDEX leads_pkey ON erp1.leads USING btree (id);

CREATE UNIQUE INDEX opportunities_pkey ON erp1.opportunities USING btree (id);

CREATE UNIQUE INDEX products_pkey ON erp1.products USING btree (id);

CREATE UNIQUE INDEX products_sku_user_unique ON erp1.products USING btree (sku, user_id) WHERE (is_active = true);

CREATE UNIQUE INDEX profiles_pkey ON erp1.profiles USING btree (id);

CREATE UNIQUE INDEX sales_items_pkey ON erp1.sales_items USING btree (id);

CREATE UNIQUE INDEX sales_number_user_unique ON erp1.sales USING btree (sale_number, user_id);

CREATE UNIQUE INDEX sales_pkey ON erp1.sales USING btree (id);

CREATE UNIQUE INDEX suppliers_pkey ON erp1.suppliers USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON erp1.tasks USING btree (id);

alter table "erp1"."activities" add constraint "activities_pkey" PRIMARY KEY using index "activities_pkey";

alter table "erp1"."clients" add constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";

alter table "erp1"."companies" add constraint "companies_pkey" PRIMARY KEY using index "companies_pkey";

alter table "erp1"."customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";

alter table "erp1"."leads" add constraint "leads_pkey" PRIMARY KEY using index "leads_pkey";

alter table "erp1"."opportunities" add constraint "opportunities_pkey" PRIMARY KEY using index "opportunities_pkey";

alter table "erp1"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "erp1"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "erp1"."sales" add constraint "sales_pkey" PRIMARY KEY using index "sales_pkey";

alter table "erp1"."sales_items" add constraint "sales_items_pkey" PRIMARY KEY using index "sales_items_pkey";

alter table "erp1"."suppliers" add constraint "suppliers_pkey" PRIMARY KEY using index "suppliers_pkey";

alter table "erp1"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "erp1"."activities" add constraint "activities_entity_type_check" CHECK ((entity_type = ANY (ARRAY['lead'::text, 'task'::text, 'opportunity'::text, 'client'::text]))) not valid;

alter table "erp1"."activities" validate constraint "activities_entity_type_check";

alter table "erp1"."activities" add constraint "activities_type_check" CHECK ((type = ANY (ARRAY['lead_created'::text, 'lead_updated'::text, 'task_created'::text, 'task_completed'::text, 'opportunity_created'::text, 'client_converted'::text]))) not valid;

alter table "erp1"."activities" validate constraint "activities_type_check";

alter table "erp1"."activities" add constraint "activities_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "erp1"."activities" validate constraint "activities_user_id_fkey";

alter table "erp1"."clients" add constraint "clients_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES erp1.leads(id) not valid;

alter table "erp1"."clients" validate constraint "clients_lead_id_fkey";

alter table "erp1"."clients" add constraint "clients_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text, 'prospect'::text]))) not valid;

alter table "erp1"."clients" validate constraint "clients_status_check";

alter table "erp1"."clients" add constraint "clients_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "erp1"."clients" validate constraint "clients_user_id_fkey";

alter table "erp1"."companies" add constraint "companies_business_type_check" CHECK ((business_type = ANY (ARRAY['retail'::text, 'restaurant'::text, 'service'::text, 'trading'::text, 'manufacturing'::text, 'professional'::text]))) not valid;

alter table "erp1"."companies" validate constraint "companies_business_type_check";

alter table "erp1"."companies" add constraint "companies_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "erp1"."companies" validate constraint "companies_user_id_fkey";

alter table "erp1"."customers" add constraint "customers_customer_type_check" CHECK ((customer_type = ANY (ARRAY['regular'::text, 'vip'::text, 'wholesale'::text, 'corporate'::text]))) not valid;

alter table "erp1"."customers" validate constraint "customers_customer_type_check";

alter table "erp1"."customers" add constraint "customers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "erp1"."customers" validate constraint "customers_user_id_fkey";

alter table "erp1"."leads" add constraint "leads_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES erp1.profiles(id) not valid;

alter table "erp1"."leads" validate constraint "leads_assigned_to_fkey";

alter table "erp1"."leads" add constraint "leads_status_check" CHECK ((status = ANY (ARRAY['new'::text, 'contacted'::text, 'qualified'::text, 'proposal'::text, 'closed-won'::text, 'closed-lost'::text]))) not valid;

alter table "erp1"."leads" validate constraint "leads_status_check";

alter table "erp1"."leads" add constraint "leads_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "erp1"."leads" validate constraint "leads_user_id_fkey";

alter table "erp1"."opportunities" add constraint "opportunities_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES erp1.leads(id) not valid;

alter table "erp1"."opportunities" validate constraint "opportunities_lead_id_fkey";

alter table "erp1"."opportunities" add constraint "opportunities_owner_fkey" FOREIGN KEY (owner) REFERENCES erp1.profiles(id) not valid;

alter table "erp1"."opportunities" validate constraint "opportunities_owner_fkey";

alter table "erp1"."opportunities" add constraint "opportunities_probability_check" CHECK (((probability >= 0) AND (probability <= 100))) not valid;

alter table "erp1"."opportunities" validate constraint "opportunities_probability_check";

alter table "erp1"."opportunities" add constraint "opportunities_stage_check" CHECK ((stage = ANY (ARRAY['discovery'::text, 'proposal'::text, 'negotiation'::text, 'closed-won'::text, 'closed-lost'::text]))) not valid;

alter table "erp1"."opportunities" validate constraint "opportunities_stage_check";

alter table "erp1"."opportunities" add constraint "opportunities_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "erp1"."opportunities" validate constraint "opportunities_user_id_fkey";

alter table "erp1"."products" add constraint "products_unit_of_measure_check" CHECK ((unit_of_measure = ANY (ARRAY['pcs'::text, 'kg'::text, 'lbs'::text, 'box'::text, 'pack'::text, 'bottle'::text, 'can'::text, 'meter'::text, 'liter'::text]))) not valid;

alter table "erp1"."products" validate constraint "products_unit_of_measure_check";

alter table "erp1"."products" add constraint "products_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "erp1"."products" validate constraint "products_user_id_fkey";

alter table "erp1"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "erp1"."profiles" validate constraint "profiles_id_fkey";

alter table "erp1"."sales" add constraint "sales_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES erp1.customers(id) not valid;

alter table "erp1"."sales" validate constraint "sales_customer_id_fkey";

alter table "erp1"."sales" add constraint "sales_payment_method_check" CHECK ((payment_method = ANY (ARRAY['cash'::text, 'card'::text, 'gcash'::text, 'paymaya'::text, 'bank_transfer'::text, 'check'::text]))) not valid;

alter table "erp1"."sales" validate constraint "sales_payment_method_check";

alter table "erp1"."sales" add constraint "sales_payment_status_check" CHECK ((payment_status = ANY (ARRAY['paid'::text, 'pending'::text, 'partial'::text, 'cancelled'::text]))) not valid;

alter table "erp1"."sales" validate constraint "sales_payment_status_check";

alter table "erp1"."sales" add constraint "sales_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "erp1"."sales" validate constraint "sales_user_id_fkey";

alter table "erp1"."sales_items" add constraint "sales_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES erp1.products(id) not valid;

alter table "erp1"."sales_items" validate constraint "sales_items_product_id_fkey";

alter table "erp1"."sales_items" add constraint "sales_items_sale_id_fkey" FOREIGN KEY (sale_id) REFERENCES erp1.sales(id) ON DELETE CASCADE not valid;

alter table "erp1"."sales_items" validate constraint "sales_items_sale_id_fkey";

alter table "erp1"."suppliers" add constraint "suppliers_payment_terms_check" CHECK ((payment_terms = ANY (ARRAY['cash'::text, 'net_15'::text, 'net_30'::text, 'net_60'::text, 'net_90'::text]))) not valid;

alter table "erp1"."suppliers" validate constraint "suppliers_payment_terms_check";

alter table "erp1"."suppliers" add constraint "suppliers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "erp1"."suppliers" validate constraint "suppliers_user_id_fkey";

alter table "erp1"."tasks" add constraint "tasks_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES erp1.profiles(id) not valid;

alter table "erp1"."tasks" validate constraint "tasks_assigned_to_fkey";

alter table "erp1"."tasks" add constraint "tasks_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES erp1.leads(id) ON DELETE CASCADE not valid;

alter table "erp1"."tasks" validate constraint "tasks_lead_id_fkey";

alter table "erp1"."tasks" add constraint "tasks_priority_check" CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text]))) not valid;

alter table "erp1"."tasks" validate constraint "tasks_priority_check";

alter table "erp1"."tasks" add constraint "tasks_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'in-progress'::text, 'completed'::text]))) not valid;

alter table "erp1"."tasks" validate constraint "tasks_status_check";

alter table "erp1"."tasks" add constraint "tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "erp1"."tasks" validate constraint "tasks_user_id_fkey";


  create policy "Users can insert own activities"
  on "erp1"."activities"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can view own activities"
  on "erp1"."activities"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete own clients"
  on "erp1"."clients"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own clients"
  on "erp1"."clients"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can update own clients"
  on "erp1"."clients"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can view own clients"
  on "erp1"."clients"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete own company data"
  on "erp1"."companies"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own company data"
  on "erp1"."companies"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own company data"
  on "erp1"."companies"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own company data"
  on "erp1"."companies"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete own customers"
  on "erp1"."customers"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own customers"
  on "erp1"."customers"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own customers"
  on "erp1"."customers"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own customers"
  on "erp1"."customers"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete own leads"
  on "erp1"."leads"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own leads"
  on "erp1"."leads"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can update own leads"
  on "erp1"."leads"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can view own leads"
  on "erp1"."leads"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete own opportunities"
  on "erp1"."opportunities"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own opportunities"
  on "erp1"."opportunities"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can update own opportunities"
  on "erp1"."opportunities"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can view own opportunities"
  on "erp1"."opportunities"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete own products"
  on "erp1"."products"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own products"
  on "erp1"."products"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own products"
  on "erp1"."products"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own products"
  on "erp1"."products"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own profile"
  on "erp1"."profiles"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = id));



  create policy "Users can update own profile"
  on "erp1"."profiles"
  as permissive
  for update
  to authenticated
using ((auth.uid() = id));



  create policy "Users can view own profile"
  on "erp1"."profiles"
  as permissive
  for select
  to authenticated
using ((auth.uid() = id));



  create policy "Users can delete own sales"
  on "erp1"."sales"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own sales"
  on "erp1"."sales"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own sales"
  on "erp1"."sales"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own sales"
  on "erp1"."sales"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete own sales items"
  on "erp1"."sales_items"
  as permissive
  for delete
  to authenticated
using ((EXISTS ( SELECT 1
   FROM erp1.sales
  WHERE ((sales.id = sales_items.sale_id) AND (sales.user_id = auth.uid())))));



  create policy "Users can insert own sales items"
  on "erp1"."sales_items"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM erp1.sales
  WHERE ((sales.id = sales_items.sale_id) AND (sales.user_id = auth.uid())))));



  create policy "Users can read own sales items"
  on "erp1"."sales_items"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM erp1.sales
  WHERE ((sales.id = sales_items.sale_id) AND (sales.user_id = auth.uid())))));



  create policy "Users can update own sales items"
  on "erp1"."sales_items"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM erp1.sales
  WHERE ((sales.id = sales_items.sale_id) AND (sales.user_id = auth.uid())))));



  create policy "Users can delete own suppliers"
  on "erp1"."suppliers"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own suppliers"
  on "erp1"."suppliers"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own suppliers"
  on "erp1"."suppliers"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own suppliers"
  on "erp1"."suppliers"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete own tasks"
  on "erp1"."tasks"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own tasks"
  on "erp1"."tasks"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can update own tasks"
  on "erp1"."tasks"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can view own tasks"
  on "erp1"."tasks"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));


drop extension if exists "pg_net";

drop trigger if exists "update_brayan_updated_at" on "public"."brayan";

drop trigger if exists "update_customers_updated_at" on "public"."customers";

drop trigger if exists "update_farmers_updated_at" on "public"."farmers";

drop trigger if exists "update_mills_updated_at" on "public"."mills";

drop trigger if exists "calculate_paddy_total" on "public"."paddy_intakes";

drop trigger if exists "update_paddy_intakes_updated_at" on "public"."paddy_intakes";

drop trigger if exists "update_products_updated_at" on "public"."products";

drop trigger if exists "update_sales_orders_updated_at" on "public"."sales_orders";

drop trigger if exists "update_users_updated_at" on "public"."users";

drop policy "brayan_delete_policy" on "public"."brayan";

drop policy "brayan_insert_policy" on "public"."brayan";

drop policy "brayan_select_policy" on "public"."brayan";

drop policy "brayan_update_policy" on "public"."brayan";

drop policy "customers_insert_policy" on "public"."customers";

drop policy "customers_select_policy" on "public"."customers";

drop policy "customers_update_policy" on "public"."customers";

drop policy "farmers_delete_policy" on "public"."farmers";

drop policy "farmers_insert_policy" on "public"."farmers";

drop policy "farmers_select_policy" on "public"."farmers";

drop policy "farmers_update_policy" on "public"."farmers";

drop policy "financial_transactions_insert_policy" on "public"."financial_transactions";

drop policy "financial_transactions_select_policy" on "public"."financial_transactions";

drop policy "inventory_stock_insert_policy" on "public"."inventory_stock";

drop policy "inventory_stock_select_policy" on "public"."inventory_stock";

drop policy "inventory_stock_update_policy" on "public"."inventory_stock";

drop policy "mills_insert_policy" on "public"."mills";

drop policy "mills_select_policy" on "public"."mills";

drop policy "mills_update_policy" on "public"."mills";

drop policy "paddy_intakes_insert_policy" on "public"."paddy_intakes";

drop policy "paddy_intakes_select_policy" on "public"."paddy_intakes";

drop policy "paddy_intakes_update_policy" on "public"."paddy_intakes";

drop policy "products_insert_policy" on "public"."products";

drop policy "products_select_policy" on "public"."products";

drop policy "products_update_policy" on "public"."products";

drop policy "sales_orders_insert_policy" on "public"."sales_orders";

drop policy "sales_orders_select_policy" on "public"."sales_orders";

drop policy "sales_orders_update_policy" on "public"."sales_orders";

drop policy "users_insert_policy" on "public"."users";

drop policy "users_select_policy" on "public"."users";

drop policy "users_update_policy" on "public"."users";

revoke delete on table "public"."brayan" from "anon";

revoke insert on table "public"."brayan" from "anon";

revoke references on table "public"."brayan" from "anon";

revoke select on table "public"."brayan" from "anon";

revoke trigger on table "public"."brayan" from "anon";

revoke truncate on table "public"."brayan" from "anon";

revoke update on table "public"."brayan" from "anon";

revoke delete on table "public"."brayan" from "authenticated";

revoke insert on table "public"."brayan" from "authenticated";

revoke references on table "public"."brayan" from "authenticated";

revoke select on table "public"."brayan" from "authenticated";

revoke trigger on table "public"."brayan" from "authenticated";

revoke truncate on table "public"."brayan" from "authenticated";

revoke update on table "public"."brayan" from "authenticated";

revoke delete on table "public"."brayan" from "service_role";

revoke insert on table "public"."brayan" from "service_role";

revoke references on table "public"."brayan" from "service_role";

revoke select on table "public"."brayan" from "service_role";

revoke trigger on table "public"."brayan" from "service_role";

revoke truncate on table "public"."brayan" from "service_role";

revoke update on table "public"."brayan" from "service_role";

revoke delete on table "public"."customers" from "anon";

revoke insert on table "public"."customers" from "anon";

revoke references on table "public"."customers" from "anon";

revoke select on table "public"."customers" from "anon";

revoke trigger on table "public"."customers" from "anon";

revoke truncate on table "public"."customers" from "anon";

revoke update on table "public"."customers" from "anon";

revoke delete on table "public"."customers" from "authenticated";

revoke insert on table "public"."customers" from "authenticated";

revoke references on table "public"."customers" from "authenticated";

revoke select on table "public"."customers" from "authenticated";

revoke trigger on table "public"."customers" from "authenticated";

revoke truncate on table "public"."customers" from "authenticated";

revoke update on table "public"."customers" from "authenticated";

revoke delete on table "public"."customers" from "service_role";

revoke insert on table "public"."customers" from "service_role";

revoke references on table "public"."customers" from "service_role";

revoke select on table "public"."customers" from "service_role";

revoke trigger on table "public"."customers" from "service_role";

revoke truncate on table "public"."customers" from "service_role";

revoke update on table "public"."customers" from "service_role";

revoke delete on table "public"."farmers" from "anon";

revoke insert on table "public"."farmers" from "anon";

revoke references on table "public"."farmers" from "anon";

revoke select on table "public"."farmers" from "anon";

revoke trigger on table "public"."farmers" from "anon";

revoke truncate on table "public"."farmers" from "anon";

revoke update on table "public"."farmers" from "anon";

revoke delete on table "public"."farmers" from "authenticated";

revoke insert on table "public"."farmers" from "authenticated";

revoke references on table "public"."farmers" from "authenticated";

revoke select on table "public"."farmers" from "authenticated";

revoke trigger on table "public"."farmers" from "authenticated";

revoke truncate on table "public"."farmers" from "authenticated";

revoke update on table "public"."farmers" from "authenticated";

revoke delete on table "public"."farmers" from "service_role";

revoke insert on table "public"."farmers" from "service_role";

revoke references on table "public"."farmers" from "service_role";

revoke select on table "public"."farmers" from "service_role";

revoke trigger on table "public"."farmers" from "service_role";

revoke truncate on table "public"."farmers" from "service_role";

revoke update on table "public"."farmers" from "service_role";

revoke delete on table "public"."financial_transactions" from "anon";

revoke insert on table "public"."financial_transactions" from "anon";

revoke references on table "public"."financial_transactions" from "anon";

revoke select on table "public"."financial_transactions" from "anon";

revoke trigger on table "public"."financial_transactions" from "anon";

revoke truncate on table "public"."financial_transactions" from "anon";

revoke update on table "public"."financial_transactions" from "anon";

revoke delete on table "public"."financial_transactions" from "authenticated";

revoke insert on table "public"."financial_transactions" from "authenticated";

revoke references on table "public"."financial_transactions" from "authenticated";

revoke select on table "public"."financial_transactions" from "authenticated";

revoke trigger on table "public"."financial_transactions" from "authenticated";

revoke truncate on table "public"."financial_transactions" from "authenticated";

revoke update on table "public"."financial_transactions" from "authenticated";

revoke delete on table "public"."financial_transactions" from "service_role";

revoke insert on table "public"."financial_transactions" from "service_role";

revoke references on table "public"."financial_transactions" from "service_role";

revoke select on table "public"."financial_transactions" from "service_role";

revoke trigger on table "public"."financial_transactions" from "service_role";

revoke truncate on table "public"."financial_transactions" from "service_role";

revoke update on table "public"."financial_transactions" from "service_role";

revoke delete on table "public"."inventory_stock" from "anon";

revoke insert on table "public"."inventory_stock" from "anon";

revoke references on table "public"."inventory_stock" from "anon";

revoke select on table "public"."inventory_stock" from "anon";

revoke trigger on table "public"."inventory_stock" from "anon";

revoke truncate on table "public"."inventory_stock" from "anon";

revoke update on table "public"."inventory_stock" from "anon";

revoke delete on table "public"."inventory_stock" from "authenticated";

revoke insert on table "public"."inventory_stock" from "authenticated";

revoke references on table "public"."inventory_stock" from "authenticated";

revoke select on table "public"."inventory_stock" from "authenticated";

revoke trigger on table "public"."inventory_stock" from "authenticated";

revoke truncate on table "public"."inventory_stock" from "authenticated";

revoke update on table "public"."inventory_stock" from "authenticated";

revoke delete on table "public"."inventory_stock" from "service_role";

revoke insert on table "public"."inventory_stock" from "service_role";

revoke references on table "public"."inventory_stock" from "service_role";

revoke select on table "public"."inventory_stock" from "service_role";

revoke trigger on table "public"."inventory_stock" from "service_role";

revoke truncate on table "public"."inventory_stock" from "service_role";

revoke update on table "public"."inventory_stock" from "service_role";

revoke delete on table "public"."mills" from "anon";

revoke insert on table "public"."mills" from "anon";

revoke references on table "public"."mills" from "anon";

revoke select on table "public"."mills" from "anon";

revoke trigger on table "public"."mills" from "anon";

revoke truncate on table "public"."mills" from "anon";

revoke update on table "public"."mills" from "anon";

revoke delete on table "public"."mills" from "authenticated";

revoke insert on table "public"."mills" from "authenticated";

revoke references on table "public"."mills" from "authenticated";

revoke select on table "public"."mills" from "authenticated";

revoke trigger on table "public"."mills" from "authenticated";

revoke truncate on table "public"."mills" from "authenticated";

revoke update on table "public"."mills" from "authenticated";

revoke delete on table "public"."mills" from "service_role";

revoke insert on table "public"."mills" from "service_role";

revoke references on table "public"."mills" from "service_role";

revoke select on table "public"."mills" from "service_role";

revoke trigger on table "public"."mills" from "service_role";

revoke truncate on table "public"."mills" from "service_role";

revoke update on table "public"."mills" from "service_role";

revoke delete on table "public"."paddy_intakes" from "anon";

revoke insert on table "public"."paddy_intakes" from "anon";

revoke references on table "public"."paddy_intakes" from "anon";

revoke select on table "public"."paddy_intakes" from "anon";

revoke trigger on table "public"."paddy_intakes" from "anon";

revoke truncate on table "public"."paddy_intakes" from "anon";

revoke update on table "public"."paddy_intakes" from "anon";

revoke delete on table "public"."paddy_intakes" from "authenticated";

revoke insert on table "public"."paddy_intakes" from "authenticated";

revoke references on table "public"."paddy_intakes" from "authenticated";

revoke select on table "public"."paddy_intakes" from "authenticated";

revoke trigger on table "public"."paddy_intakes" from "authenticated";

revoke truncate on table "public"."paddy_intakes" from "authenticated";

revoke update on table "public"."paddy_intakes" from "authenticated";

revoke delete on table "public"."paddy_intakes" from "service_role";

revoke insert on table "public"."paddy_intakes" from "service_role";

revoke references on table "public"."paddy_intakes" from "service_role";

revoke select on table "public"."paddy_intakes" from "service_role";

revoke trigger on table "public"."paddy_intakes" from "service_role";

revoke truncate on table "public"."paddy_intakes" from "service_role";

revoke update on table "public"."paddy_intakes" from "service_role";

revoke delete on table "public"."products" from "anon";

revoke insert on table "public"."products" from "anon";

revoke references on table "public"."products" from "anon";

revoke select on table "public"."products" from "anon";

revoke trigger on table "public"."products" from "anon";

revoke truncate on table "public"."products" from "anon";

revoke update on table "public"."products" from "anon";

revoke delete on table "public"."products" from "authenticated";

revoke insert on table "public"."products" from "authenticated";

revoke references on table "public"."products" from "authenticated";

revoke select on table "public"."products" from "authenticated";

revoke trigger on table "public"."products" from "authenticated";

revoke truncate on table "public"."products" from "authenticated";

revoke update on table "public"."products" from "authenticated";

revoke delete on table "public"."products" from "service_role";

revoke insert on table "public"."products" from "service_role";

revoke references on table "public"."products" from "service_role";

revoke select on table "public"."products" from "service_role";

revoke trigger on table "public"."products" from "service_role";

revoke truncate on table "public"."products" from "service_role";

revoke update on table "public"."products" from "service_role";

revoke delete on table "public"."sales_orders" from "anon";

revoke insert on table "public"."sales_orders" from "anon";

revoke references on table "public"."sales_orders" from "anon";

revoke select on table "public"."sales_orders" from "anon";

revoke trigger on table "public"."sales_orders" from "anon";

revoke truncate on table "public"."sales_orders" from "anon";

revoke update on table "public"."sales_orders" from "anon";

revoke delete on table "public"."sales_orders" from "authenticated";

revoke insert on table "public"."sales_orders" from "authenticated";

revoke references on table "public"."sales_orders" from "authenticated";

revoke select on table "public"."sales_orders" from "authenticated";

revoke trigger on table "public"."sales_orders" from "authenticated";

revoke truncate on table "public"."sales_orders" from "authenticated";

revoke update on table "public"."sales_orders" from "authenticated";

revoke delete on table "public"."sales_orders" from "service_role";

revoke insert on table "public"."sales_orders" from "service_role";

revoke references on table "public"."sales_orders" from "service_role";

revoke select on table "public"."sales_orders" from "service_role";

revoke trigger on table "public"."sales_orders" from "service_role";

revoke truncate on table "public"."sales_orders" from "service_role";

revoke update on table "public"."sales_orders" from "service_role";

revoke delete on table "public"."users" from "anon";

revoke insert on table "public"."users" from "anon";

revoke references on table "public"."users" from "anon";

revoke select on table "public"."users" from "anon";

revoke trigger on table "public"."users" from "anon";

revoke truncate on table "public"."users" from "anon";

revoke update on table "public"."users" from "anon";

revoke delete on table "public"."users" from "authenticated";

revoke insert on table "public"."users" from "authenticated";

revoke references on table "public"."users" from "authenticated";

revoke select on table "public"."users" from "authenticated";

revoke trigger on table "public"."users" from "authenticated";

revoke truncate on table "public"."users" from "authenticated";

revoke update on table "public"."users" from "authenticated";

revoke delete on table "public"."users" from "service_role";

revoke insert on table "public"."users" from "service_role";

revoke references on table "public"."users" from "service_role";

revoke select on table "public"."users" from "service_role";

revoke trigger on table "public"."users" from "service_role";

revoke truncate on table "public"."users" from "service_role";

revoke update on table "public"."users" from "service_role";

alter table "public"."brayan" drop constraint "brayan_assigned_to_fkey";

alter table "public"."brayan" drop constraint "brayan_brayan_code_key";

alter table "public"."brayan" drop constraint "brayan_created_by_fkey";

alter table "public"."brayan" drop constraint "brayan_mill_id_fkey";

alter table "public"."customers" drop constraint "customers_customer_code_key";

alter table "public"."customers" drop constraint "customers_mill_id_fkey";

alter table "public"."farmers" drop constraint "farmers_farmer_code_key";

alter table "public"."farmers" drop constraint "farmers_mill_id_fkey";

alter table "public"."financial_transactions" drop constraint "financial_transactions_created_by_fkey";

alter table "public"."financial_transactions" drop constraint "financial_transactions_mill_id_fkey";

alter table "public"."financial_transactions" drop constraint "financial_transactions_transaction_number_key";

alter table "public"."inventory_stock" drop constraint "inventory_stock_mill_id_fkey";

alter table "public"."inventory_stock" drop constraint "inventory_stock_mill_id_product_id_key";

alter table "public"."inventory_stock" drop constraint "inventory_stock_product_id_fkey";

alter table "public"."mills" drop constraint "mills_license_number_key";

alter table "public"."paddy_intakes" drop constraint "paddy_intakes_created_by_fkey";

alter table "public"."paddy_intakes" drop constraint "paddy_intakes_farmer_id_fkey";

alter table "public"."paddy_intakes" drop constraint "paddy_intakes_intake_number_key";

alter table "public"."paddy_intakes" drop constraint "paddy_intakes_mill_id_fkey";

alter table "public"."products" drop constraint "products_code_key";

alter table "public"."sales_orders" drop constraint "sales_orders_created_by_fkey";

alter table "public"."sales_orders" drop constraint "sales_orders_customer_id_fkey";

alter table "public"."sales_orders" drop constraint "sales_orders_mill_id_fkey";

alter table "public"."sales_orders" drop constraint "sales_orders_order_number_key";

alter table "public"."users" drop constraint "users_email_key";

alter table "public"."users" drop constraint "users_id_fkey";

alter table "public"."users" drop constraint "users_mill_id_fkey";

alter table "public"."users" drop constraint "users_phone_key";

drop function if exists "public"."calculate_paddy_total_amount"();

drop function if exists "public"."get_user_mill_id"();

drop function if exists "public"."get_user_role"();

drop function if exists "public"."update_updated_at_column"();

alter table "public"."brayan" drop constraint "brayan_pkey";

alter table "public"."farmers" drop constraint "farmers_pkey";

alter table "public"."financial_transactions" drop constraint "financial_transactions_pkey";

alter table "public"."inventory_stock" drop constraint "inventory_stock_pkey";

alter table "public"."mills" drop constraint "mills_pkey";

alter table "public"."paddy_intakes" drop constraint "paddy_intakes_pkey";

alter table "public"."sales_orders" drop constraint "sales_orders_pkey";

alter table "public"."users" drop constraint "users_pkey";

drop index if exists "public"."brayan_brayan_code_key";

drop index if exists "public"."brayan_pkey";

drop index if exists "public"."customers_customer_code_key";

drop index if exists "public"."farmers_farmer_code_key";

drop index if exists "public"."farmers_pkey";

drop index if exists "public"."financial_transactions_pkey";

drop index if exists "public"."financial_transactions_transaction_number_key";

drop index if exists "public"."idx_brayan_active";

drop index if exists "public"."idx_brayan_assigned_to";

drop index if exists "public"."idx_brayan_code";

drop index if exists "public"."idx_brayan_dates";

drop index if exists "public"."idx_brayan_mill_id";

drop index if exists "public"."idx_brayan_status";

drop index if exists "public"."idx_customers_active";

drop index if exists "public"."idx_customers_mill_id";

drop index if exists "public"."idx_customers_phone";

drop index if exists "public"."idx_customers_search";

drop index if exists "public"."idx_farmers_active";

drop index if exists "public"."idx_farmers_mill_id";

drop index if exists "public"."idx_farmers_phone";

drop index if exists "public"."idx_farmers_search";

drop index if exists "public"."idx_financial_transactions_date";

drop index if exists "public"."idx_financial_transactions_mill_date";

drop index if exists "public"."idx_financial_transactions_party";

drop index if exists "public"."idx_inventory_stock_low_stock";

drop index if exists "public"."idx_inventory_stock_mill_product";

drop index if exists "public"."idx_paddy_intakes_farmer_date";

drop index if exists "public"."idx_paddy_intakes_intake_number";

drop index if exists "public"."idx_paddy_intakes_mill_date";

drop index if exists "public"."idx_sales_orders_customer_date";

drop index if exists "public"."idx_sales_orders_mill_date";

drop index if exists "public"."idx_sales_orders_status";

drop index if exists "public"."idx_users_email";

drop index if exists "public"."idx_users_mill_role";

drop index if exists "public"."inventory_stock_mill_id_product_id_key";

drop index if exists "public"."inventory_stock_pkey";

drop index if exists "public"."mills_license_number_key";

drop index if exists "public"."mills_pkey";

drop index if exists "public"."paddy_intakes_intake_number_key";

drop index if exists "public"."paddy_intakes_pkey";

drop index if exists "public"."products_code_key";

drop index if exists "public"."sales_orders_order_number_key";

drop index if exists "public"."sales_orders_pkey";

drop index if exists "public"."users_email_key";

drop index if exists "public"."users_phone_key";

drop index if exists "public"."users_pkey";

drop table "public"."brayan";

drop table "public"."farmers";

drop table "public"."financial_transactions";

drop table "public"."inventory_stock";

drop table "public"."mills";

drop table "public"."paddy_intakes";

drop table "public"."sales_orders";

drop table "public"."users";


  create table "public"."activities" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "title" text not null,
    "description" text,
    "entity_id" uuid,
    "entity_type" text,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."activities" enable row level security;


  create table "public"."clients" (
    "id" uuid not null default gen_random_uuid(),
    "company_name" text not null,
    "contact_person" text,
    "email" text,
    "phone" text,
    "address" text,
    "status" text default 'active'::text,
    "revenue" numeric(12,2) default 0,
    "lead_id" uuid,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."clients" enable row level security;


  create table "public"."companies" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "address" text not null,
    "phone" text,
    "email" text not null,
    "tin" text,
    "business_type" text not null default 'retail'::text,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."companies" enable row level security;


  create table "public"."leads" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "contact_person" text,
    "email" text,
    "phone" text,
    "status" text default 'new'::text,
    "source" text,
    "value" numeric(10,2) default 0,
    "assigned_to" uuid,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."leads" enable row level security;


  create table "public"."opportunities" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "client_name" text not null,
    "value" numeric(12,2) not null default 0,
    "probability" integer default 50,
    "stage" text default 'discovery'::text,
    "close_date" date,
    "owner" uuid,
    "lead_id" uuid,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."opportunities" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "email" text,
    "full_name" text,
    "avatar_url" text,
    "role" text default 'user'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."sales" (
    "id" uuid not null default gen_random_uuid(),
    "sale_number" text not null,
    "customer_id" uuid,
    "customer_name" text not null,
    "total_amount" numeric(12,2) not null default 0,
    "tax_amount" numeric(12,2) default 0,
    "discount_amount" numeric(12,2) default 0,
    "payment_method" text default 'cash'::text,
    "payment_status" text default 'paid'::text,
    "notes" text,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."sales" enable row level security;


  create table "public"."sales_items" (
    "id" uuid not null default gen_random_uuid(),
    "sale_id" uuid not null,
    "product_id" uuid not null,
    "product_name" text not null,
    "quantity" integer not null,
    "unit_price" numeric(10,2) not null,
    "total_price" numeric(12,2) not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."sales_items" enable row level security;


  create table "public"."suppliers" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "contact_person" text,
    "email" text,
    "phone" text,
    "address" text,
    "payment_terms" text default 'cash'::text,
    "current_balance" numeric(12,2) default 0,
    "is_active" boolean default true,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."suppliers" enable row level security;


  create table "public"."tasks" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "description" text,
    "status" text default 'pending'::text,
    "priority" text default 'medium'::text,
    "due_date" date,
    "due_time" time without time zone,
    "assigned_to" uuid,
    "lead_id" uuid,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."tasks" enable row level security;

alter table "public"."customers" drop column "alternate_phone";

alter table "public"."customers" drop column "business_name";

alter table "public"."customers" drop column "city";

alter table "public"."customers" drop column "contact_person";

alter table "public"."customers" drop column "customer_code";

alter table "public"."customers" drop column "gst_number";

alter table "public"."customers" drop column "mill_id";

alter table "public"."customers" drop column "pincode";

alter table "public"."customers" drop column "rating";

alter table "public"."customers" drop column "state";

alter table "public"."customers" drop column "total_business";

alter table "public"."customers" add column "name" text not null;

alter table "public"."customers" add column "user_id" uuid not null;

alter table "public"."customers" alter column "created_at" set default now();

alter table "public"."customers" alter column "credit_limit" set data type numeric(12,2) using "credit_limit"::numeric(12,2);

alter table "public"."customers" alter column "current_balance" set data type numeric(12,2) using "current_balance"::numeric(12,2);

alter table "public"."customers" alter column "customer_type" set default 'regular'::text;

alter table "public"."customers" alter column "customer_type" drop not null;

alter table "public"."customers" alter column "customer_type" set data type text using "customer_type"::text;

alter table "public"."customers" alter column "email" set data type text using "email"::text;

alter table "public"."customers" alter column "phone" drop not null;

alter table "public"."customers" alter column "phone" set data type text using "phone"::text;

alter table "public"."customers" alter column "updated_at" set default now();

alter table "public"."products" drop column "code";

alter table "public"."products" drop column "default_sale_price";

alter table "public"."products" drop column "hsn_code";

alter table "public"."products" drop column "tax_rate";

alter table "public"."products" drop column "unit_of_measurement";

alter table "public"."products" add column "barcode" text;

alter table "public"."products" add column "category" text not null;

alter table "public"."products" add column "cost_price" numeric(10,2) not null default 0;

alter table "public"."products" add column "description" text;

alter table "public"."products" add column "reorder_level" integer default 10;

alter table "public"."products" add column "sku" text not null;

alter table "public"."products" add column "stock_quantity" integer default 0;

alter table "public"."products" add column "unit_of_measure" text default 'pcs'::text;

alter table "public"."products" add column "unit_price" numeric(10,2) not null default 0;

alter table "public"."products" add column "user_id" uuid not null;

alter table "public"."products" alter column "created_at" set default now();

alter table "public"."products" alter column "name" set data type text using "name"::text;

alter table "public"."products" alter column "updated_at" set default now();

drop type "public"."customer_type";

drop type "public"."payment_method";

drop type "public"."unit_type";

drop type "public"."user_role";

CREATE UNIQUE INDEX activities_pkey ON public.activities USING btree (id);

CREATE UNIQUE INDEX clients_pkey ON public.clients USING btree (id);

CREATE UNIQUE INDEX companies_pkey ON public.companies USING btree (id);

CREATE UNIQUE INDEX leads_pkey ON public.leads USING btree (id);

CREATE UNIQUE INDEX opportunities_pkey ON public.opportunities USING btree (id);

CREATE UNIQUE INDEX products_sku_user_unique ON public.products USING btree (sku, user_id) WHERE (is_active = true);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX sales_items_pkey ON public.sales_items USING btree (id);

CREATE UNIQUE INDEX sales_number_user_unique ON public.sales USING btree (sale_number, user_id);

CREATE UNIQUE INDEX sales_pkey ON public.sales USING btree (id);

CREATE UNIQUE INDEX suppliers_pkey ON public.suppliers USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

alter table "public"."activities" add constraint "activities_pkey" PRIMARY KEY using index "activities_pkey";

alter table "public"."clients" add constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";

alter table "public"."companies" add constraint "companies_pkey" PRIMARY KEY using index "companies_pkey";

alter table "public"."leads" add constraint "leads_pkey" PRIMARY KEY using index "leads_pkey";

alter table "public"."opportunities" add constraint "opportunities_pkey" PRIMARY KEY using index "opportunities_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."sales" add constraint "sales_pkey" PRIMARY KEY using index "sales_pkey";

alter table "public"."sales_items" add constraint "sales_items_pkey" PRIMARY KEY using index "sales_items_pkey";

alter table "public"."suppliers" add constraint "suppliers_pkey" PRIMARY KEY using index "suppliers_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."activities" add constraint "activities_entity_type_check" CHECK ((entity_type = ANY (ARRAY['lead'::text, 'task'::text, 'opportunity'::text, 'client'::text]))) not valid;

alter table "public"."activities" validate constraint "activities_entity_type_check";

alter table "public"."activities" add constraint "activities_type_check" CHECK ((type = ANY (ARRAY['lead_created'::text, 'lead_updated'::text, 'task_created'::text, 'task_completed'::text, 'opportunity_created'::text, 'client_converted'::text]))) not valid;

alter table "public"."activities" validate constraint "activities_type_check";

alter table "public"."activities" add constraint "activities_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."activities" validate constraint "activities_user_id_fkey";

alter table "public"."clients" add constraint "clients_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES leads(id) not valid;

alter table "public"."clients" validate constraint "clients_lead_id_fkey";

alter table "public"."clients" add constraint "clients_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text, 'prospect'::text]))) not valid;

alter table "public"."clients" validate constraint "clients_status_check";

alter table "public"."clients" add constraint "clients_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."clients" validate constraint "clients_user_id_fkey";

alter table "public"."companies" add constraint "companies_business_type_check" CHECK ((business_type = ANY (ARRAY['retail'::text, 'restaurant'::text, 'service'::text, 'trading'::text, 'manufacturing'::text, 'professional'::text]))) not valid;

alter table "public"."companies" validate constraint "companies_business_type_check";

alter table "public"."companies" add constraint "companies_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."companies" validate constraint "companies_user_id_fkey";

alter table "public"."customers" add constraint "customers_customer_type_check" CHECK ((customer_type = ANY (ARRAY['regular'::text, 'vip'::text, 'wholesale'::text, 'corporate'::text]))) not valid;

alter table "public"."customers" validate constraint "customers_customer_type_check";

alter table "public"."customers" add constraint "customers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."customers" validate constraint "customers_user_id_fkey";

alter table "public"."leads" add constraint "leads_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES profiles(id) not valid;

alter table "public"."leads" validate constraint "leads_assigned_to_fkey";

alter table "public"."leads" add constraint "leads_status_check" CHECK ((status = ANY (ARRAY['new'::text, 'contacted'::text, 'qualified'::text, 'proposal'::text, 'closed-won'::text, 'closed-lost'::text]))) not valid;

alter table "public"."leads" validate constraint "leads_status_check";

alter table "public"."leads" add constraint "leads_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."leads" validate constraint "leads_user_id_fkey";

alter table "public"."opportunities" add constraint "opportunities_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES leads(id) not valid;

alter table "public"."opportunities" validate constraint "opportunities_lead_id_fkey";

alter table "public"."opportunities" add constraint "opportunities_owner_fkey" FOREIGN KEY (owner) REFERENCES profiles(id) not valid;

alter table "public"."opportunities" validate constraint "opportunities_owner_fkey";

alter table "public"."opportunities" add constraint "opportunities_probability_check" CHECK (((probability >= 0) AND (probability <= 100))) not valid;

alter table "public"."opportunities" validate constraint "opportunities_probability_check";

alter table "public"."opportunities" add constraint "opportunities_stage_check" CHECK ((stage = ANY (ARRAY['discovery'::text, 'proposal'::text, 'negotiation'::text, 'closed-won'::text, 'closed-lost'::text]))) not valid;

alter table "public"."opportunities" validate constraint "opportunities_stage_check";

alter table "public"."opportunities" add constraint "opportunities_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."opportunities" validate constraint "opportunities_user_id_fkey";

alter table "public"."products" add constraint "products_unit_of_measure_check" CHECK ((unit_of_measure = ANY (ARRAY['pcs'::text, 'kg'::text, 'lbs'::text, 'box'::text, 'pack'::text, 'bottle'::text, 'can'::text, 'meter'::text, 'liter'::text]))) not valid;

alter table "public"."products" validate constraint "products_unit_of_measure_check";

alter table "public"."products" add constraint "products_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."products" validate constraint "products_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."sales" add constraint "sales_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) not valid;

alter table "public"."sales" validate constraint "sales_customer_id_fkey";

alter table "public"."sales" add constraint "sales_payment_method_check" CHECK ((payment_method = ANY (ARRAY['cash'::text, 'card'::text, 'gcash'::text, 'paymaya'::text, 'bank_transfer'::text, 'check'::text]))) not valid;

alter table "public"."sales" validate constraint "sales_payment_method_check";

alter table "public"."sales" add constraint "sales_payment_status_check" CHECK ((payment_status = ANY (ARRAY['paid'::text, 'pending'::text, 'partial'::text, 'cancelled'::text]))) not valid;

alter table "public"."sales" validate constraint "sales_payment_status_check";

alter table "public"."sales" add constraint "sales_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."sales" validate constraint "sales_user_id_fkey";

alter table "public"."sales_items" add constraint "sales_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) not valid;

alter table "public"."sales_items" validate constraint "sales_items_product_id_fkey";

alter table "public"."sales_items" add constraint "sales_items_sale_id_fkey" FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE not valid;

alter table "public"."sales_items" validate constraint "sales_items_sale_id_fkey";

alter table "public"."suppliers" add constraint "suppliers_payment_terms_check" CHECK ((payment_terms = ANY (ARRAY['cash'::text, 'net_15'::text, 'net_30'::text, 'net_60'::text, 'net_90'::text]))) not valid;

alter table "public"."suppliers" validate constraint "suppliers_payment_terms_check";

alter table "public"."suppliers" add constraint "suppliers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."suppliers" validate constraint "suppliers_user_id_fkey";

alter table "public"."tasks" add constraint "tasks_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES profiles(id) not valid;

alter table "public"."tasks" validate constraint "tasks_assigned_to_fkey";

alter table "public"."tasks" add constraint "tasks_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_lead_id_fkey";

alter table "public"."tasks" add constraint "tasks_priority_check" CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text]))) not valid;

alter table "public"."tasks" validate constraint "tasks_priority_check";

alter table "public"."tasks" add constraint "tasks_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'in-progress'::text, 'completed'::text]))) not valid;

alter table "public"."tasks" validate constraint "tasks_status_check";

alter table "public"."tasks" add constraint "tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."tasks" validate constraint "tasks_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$function$
;


  create policy "Users can insert own activities"
  on "public"."activities"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can view own activities"
  on "public"."activities"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can delete own clients"
  on "public"."clients"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert own clients"
  on "public"."clients"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own clients"
  on "public"."clients"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own clients"
  on "public"."clients"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can delete own company data"
  on "public"."companies"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own company data"
  on "public"."companies"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own company data"
  on "public"."companies"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own company data"
  on "public"."companies"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can delete own customers"
  on "public"."customers"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own customers"
  on "public"."customers"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own customers"
  on "public"."customers"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own customers"
  on "public"."customers"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can delete own leads"
  on "public"."leads"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert own leads"
  on "public"."leads"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own leads"
  on "public"."leads"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own leads"
  on "public"."leads"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can delete own opportunities"
  on "public"."opportunities"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert own opportunities"
  on "public"."opportunities"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own opportunities"
  on "public"."opportunities"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own opportunities"
  on "public"."opportunities"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can delete own products"
  on "public"."products"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own products"
  on "public"."products"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own products"
  on "public"."products"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own products"
  on "public"."products"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can insert own profile"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check ((auth.uid() = id));



  create policy "Users can update own profile"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Users can view own profile"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((auth.uid() = id));



  create policy "Users can delete own sales"
  on "public"."sales"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own sales"
  on "public"."sales"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own sales"
  on "public"."sales"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own sales"
  on "public"."sales"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can delete own sales items"
  on "public"."sales_items"
  as permissive
  for delete
  to authenticated
using ((EXISTS ( SELECT 1
   FROM sales
  WHERE ((sales.id = sales_items.sale_id) AND (sales.user_id = auth.uid())))));



  create policy "Users can insert own sales items"
  on "public"."sales_items"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM sales
  WHERE ((sales.id = sales_items.sale_id) AND (sales.user_id = auth.uid())))));



  create policy "Users can read own sales items"
  on "public"."sales_items"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM sales
  WHERE ((sales.id = sales_items.sale_id) AND (sales.user_id = auth.uid())))));



  create policy "Users can update own sales items"
  on "public"."sales_items"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM sales
  WHERE ((sales.id = sales_items.sale_id) AND (sales.user_id = auth.uid())))));



  create policy "Users can delete own suppliers"
  on "public"."suppliers"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can insert own suppliers"
  on "public"."suppliers"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can read own suppliers"
  on "public"."suppliers"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update own suppliers"
  on "public"."suppliers"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can delete own tasks"
  on "public"."tasks"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert own tasks"
  on "public"."tasks"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own tasks"
  on "public"."tasks"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own tasks"
  on "public"."tasks"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



