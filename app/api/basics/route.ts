import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { basics, type BasicItem } from "../../data/basics";

const KV_KEY = "basics-state-v1";

// GET /api/basics
// Returns the current state from KV, or seed data if KV is empty.
export async function GET() {
  try {
    const stored = await kv.get<BasicItem[]>(KV_KEY);
    if (stored && Array.isArray(stored)) {
      return NextResponse.json({ items: stored, source: "kv" });
    }
    return NextResponse.json({ items: basics, source: "seed" });
  } catch (err) {
    console.error("KV read error:", err);
    // KV not configured or down — fall back to seed
    return NextResponse.json({ items: basics, source: "seed-fallback" });
  }
}

// POST /api/basics
// Saves new state. Requires X-Edit-Pin header matching EDIT_PIN env var.
export async function POST(req: NextRequest) {
  const editPin = process.env.EDIT_PIN;

  if (editPin) {
    const headerPin = req.headers.get("x-edit-pin");
    if (headerPin !== editPin) {
      return NextResponse.json(
        { error: "Invalid PIN" },
        { status: 401 }
      );
    }
  }

  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.items)) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    await kv.set(KV_KEY, body.items);
    return NextResponse.json({ ok: true, count: body.items.length });
  } catch (err) {
    console.error("KV write error:", err);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }
}

// DELETE /api/basics → resets KV (so seed data takes over). Requires PIN.
export async function DELETE(req: NextRequest) {
  const editPin = process.env.EDIT_PIN;

  if (editPin) {
    const headerPin = req.headers.get("x-edit-pin");
    if (headerPin !== editPin) {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
    }
  }

  try {
    await kv.del(KV_KEY);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("KV delete error:", err);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }
}
