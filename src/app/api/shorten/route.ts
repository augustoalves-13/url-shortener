import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type RequestBody = {
  original_url: string;
}

export async function POST(req: Request) {
  const { original_url }: RequestBody = await req.json();

  if (!original_url || !original_url.startsWith("http")) {
    return NextResponse.json({ error: "URL inválida" }, { status: 400 });
  }

  const short = Math.random().toString(36).substring(2, 8);

  try {
    const newUrl = await prisma.url.create({
      data: { original_url, shorted_url: short },
    });

    return NextResponse.json(
      { shorted_url: newUrl.shorted_url },
      { status: 201 }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao salvar a URL" },
      { status: 500 }
    );
  }
}
