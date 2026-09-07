ALTER TABLE "appointments"
  ADD COLUMN IF NOT EXISTS "cancelled_by" varchar,
  ADD COLUMN IF NOT EXISTS "cancellation_fee" numeric(8, 2),
  ADD COLUMN IF NOT EXISTS "refund_amount" numeric(8, 2);