import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_: any, context: any) {
  const { params } = context;

  if (!params?.short) {
    return NextResponse.json({ error: "Invalid URL parameter" });
  }

  try {
    const url = await prisma.url.findUnique({
      where: { shorted_url: params.short as string },
    });

    if (!url) {
      return NextResponse.json({ error: "URL not found" });
    }

    return NextResponse.json({ original_url: url.original_url });
    
  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
