import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles

  /* use upsert instead of create because it removes errors
     related to accidentally trying to insert the same record twice.
     it creates a new record if no record matches the where condition. 
  */
  const post1 = await prisma.article.upsert({
    where: { title: 'What are Communication Protocols' },
    update: {},
    create: {
      title: 'What are Communication Protocols',
      body: 'HTTP, WSS, gRPC, TCP, UDP.',
      description:
        "Checkout Hussien Nasseer my Favourite Backend Engineering Show.",
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'What are Zombie Cookies' },
    update: {},
    create: {
      title: 'What are Zombie Cookies',
      body: 'Media companies use to Keep track of web users.',
      description:
        'Cookies which is being recreated by server even after being deleted.',
      published: true,
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });