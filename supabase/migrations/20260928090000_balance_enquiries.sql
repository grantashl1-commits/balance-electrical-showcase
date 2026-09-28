-- Website enquiries, written only by the send-balance-enquiry edge function (service role).
CREATE TABLE IF NOT EXISTS public.balance_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  suburb text,
  service_type text NOT NULL,
  message text
);

-- RLS on with no policies: the public API cannot read or write; the service role bypasses RLS.
ALTER TABLE public.balance_enquiries ENABLE ROW LEVEL SECURITY;
