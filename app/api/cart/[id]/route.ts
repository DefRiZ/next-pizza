import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const data = (await req.json()) as { quantity: number };

    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Cart token not found" },
        { status: 401 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_PATCH] Server Error", error);
    return NextResponse.json(
      { message: "[CART_PATCH] Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.delete({
      where: {
        id: Number(params.id),
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_DELETE] Server Error", error);
    return NextResponse.json({
      message: "Не вдалося видалити елемент з кошика",
      status: 500,
    });
  }
}
