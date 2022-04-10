/* eslint-disable no-extend-native */
const { PrismaClient } = require('@prisma/client');

const { seedAuthors } = require('./models/author');
const { seedPosts } = require('./models/post');

const prisma = new PrismaClient();

Array.prototype.random = function randomArray() {
  return this[Math.floor(Math.random() * this.length)];
};

async function main() {
  // await seedAuthors(prisma);
  // await seedPosts(prisma);
}

main()
  .catch((e) => {
    console.error(e); // eslint-disable-line
    process.exit(1); // eslint-disable-line
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
