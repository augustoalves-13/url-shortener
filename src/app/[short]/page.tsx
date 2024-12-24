import { PrismaClient } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';

const prisma = new PrismaClient();

interface PageProps {
  params: { short: string }; 
}

const Page = async ({ params }: PageProps) => {
  const { short } = params; 


  const url = await prisma.url.findFirst({
    where: { shorted_url: short },
  });


  if (!url) {
    notFound();
    return;
  }

  redirect(url.original_url);
};

export default Page;
