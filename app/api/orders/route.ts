import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      district,
      address,
      paymentMethod,
      subtotal,
      deliveryCharge,
      total,
      productKey,
      productName,
      productNameEn,
      size,
      quantity,
      price,
    } = body;

    if (
      !customerName ||
      !customerPhone ||
      !district ||
      !address ||
      !productKey ||
      !size
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [order] = await db
      .insert(orders)
      .values({
        customerName,
        customerPhone,
        district,
        address,
        paymentMethod: paymentMethod || "cod",
        subtotal: subtotal.toString(),
        deliveryCharge: deliveryCharge.toString(),
        total: total.toString(),
        productKey,
        productName,
        productNameEn,
        size,
        quantity,
        price: price.toString(),
      })
      .returning();

    return NextResponse.json(
      { success: true, orderId: order.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
