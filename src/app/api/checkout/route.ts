import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type Plan = "starter" | "growth" | "scale";
type BillingPeriod = "monthly" | "yearly";

type CheckoutRequestBody = {
  plan: Plan;
  period: BillingPeriod;
};

const plans = ["starter", "growth", "scale"] as const;
const billingPeriods = ["monthly", "yearly"] as const;
const stripePriceIdPattern = /^price_[A-Za-z0-9]+$/;

function isPlan(plan: unknown): plan is Plan {
  return typeof plan === "string" && plans.includes(plan as Plan);
}

function isBillingPeriod(period: unknown): period is BillingPeriod {
  return (
    typeof period === "string" &&
    billingPeriods.includes(period as BillingPeriod)
  );
}

function getPriceReference(plan: Plan, period: BillingPeriod) {
  const priceMap: Record<Plan, Record<BillingPeriod, string | undefined>> = {
    starter: {
      monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY,
      yearly: process.env.STRIPE_PRICE_STARTER_YEARLY,
    },
    growth: {
      monthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY,
      yearly: process.env.STRIPE_PRICE_GROWTH_YEARLY,
    },
    scale: {
      monthly: process.env.STRIPE_PRICE_SCALE_MONTHLY,
      yearly: process.env.STRIPE_PRICE_SCALE_YEARLY,
    },
  };

  return priceMap[plan][period];
}

async function resolvePriceId(priceReference: string) {
  const normalizedPriceReference = priceReference.trim();

  if (stripePriceIdPattern.test(normalizedPriceReference)) {
    return normalizedPriceReference;
  }

  const prices = await stripe.prices.list({
    active: true,
    limit: 1,
    lookup_keys: [normalizedPriceReference],
  });

  return prices.data[0]?.id;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<CheckoutRequestBody>;

    if (!isPlan(body.plan) || !isBillingPeriod(body.period)) {
      return NextResponse.json(
        { error: "Invalid plan or billing period selected" },
        { status: 400 },
      );
    }

    const priceReference = getPriceReference(body.plan, body.period);

    if (!priceReference) {
      return NextResponse.json(
        { error: "Missing Stripe price for selected plan and period" },
        { status: 400 },
      );
    }

    const priceId = await resolvePriceId(priceReference);

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            "No active Stripe price found for selected plan and billing period",
        },
        { status: 400 },
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ui_mode: "embedded_page",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      return_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Stripe did not return a client secret" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.error("Stripe embedded checkout error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while creating checkout";

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? message
            : "Something went wrong while creating checkout",
      },
      { status: 500 },
    );
  }
}
