import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitContact } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Please provide a valid email address."),
  organization: z.string().trim().optional(),
  enquiryType: z.string().trim().min(1, "Enquiry type is required."),
  message: z.string().trim().min(10, "Message must be at least 10 characters."),
  website: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  // Honeypot: real users never fill this hidden field in.
  if (parsed.data.website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const result = await submitContact(parsed.data);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
