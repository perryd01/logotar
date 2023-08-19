import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const simonyi = await prisma.group.upsert({
    where: { slug: "simonyi" },
    update: {},
    create: {
      name: "Simonyi",
      nameLong: "Simonyi Károly Szakkollégium",
      slug: "simonyi",
    },
  });

  const schdesign = await prisma.team.upsert({
    where: { slug: "schdesign" },
    update: {},
    create: {
      internalId: 402,
      name: "schdesign",
      slug: "schdesign",
      groupId: simonyi.id,
    },
  });

  const schonherz = await prisma.group.upsert({
    where: { slug: "schonherz" },
    update: {},
    create: {
      name: "Schönherz",
      nameLong: "Schönherz Kollégium",
      slug: "schonherz",
    },
  });

  const sssl = await prisma.team.upsert({
    where: { slug: "sssl" },
    update: {},
    create: {
      internalId: 18,
      name: "SSSL",
      nameLong: "Szent Schönherz Senior Lovagrend",
      slug: "sssl",
      groupId: schonherz.id,
    },
  });

  const bme = await prisma.group.upsert({
    where: { slug: "bme" },
    update: {},
    create: {
      name: "BME",
      nameLong: "Budapesti Műszaki és Gazdaságtudományi Egyetem",
      slug: "bme",
    },
  });

  await prisma.group.createMany({
    data: [
      {
        name: "Bulis",
        nameLong: "Bulis Reszort",
        slug: "bulis",
      },
      {
        name: "Kofer",
        nameLong: "Kollégiumi Felvételi és Érdekvédelmi Reszort",
        slug: "kofer",
      },
      {
        name: "Sport",
        nameLong: "Sport Reszort",
        slug: "sport",
      },
      {
        name: "KSZK",
        nameLong: "Kollégiumi Számítástechnikai Kör",
        slug: "kszk",
      },
      {
        name: "Kultúr",
        nameLong: "Kultúr Reszort",
        slug: "kultur",
      },
      {
        name: "Szolgáltató",
        nameLong: "Szolgáltató Reszort",
        slug: "szolgaltato",
      },
    ],
  });

  await prisma.team.createMany({
    data: [
      {
        name: "VIK",
        nameLong: "Villamosmérnöki és Informatikai Kar",
        slug: "vik",
        groupId: bme.id,
        internalId: -1,
      },
      {
        name: "BME",
        nameLong: "Budapesti Műszaki és Gazdaságtudományi Egyetem",
        slug: "bme",
        groupId: bme.id,
        internalId: -2,
      },
      {
        name: "Simonyi",
        nameLong: "Simonyi Károly Szakkollégium",
        slug: "simonyi",
        internalId: 16,
        groupId: simonyi.id,
      },
      {
        name: "Kir-Dev",
        nameLong: "KIR fejlesztők és üzemeltetők",
        slug: "kir-dev",
        internalId: 106,
        groupId: simonyi.id,
      },
      { name: "SPOT", slug: "spot", internalId: 13, groupId: simonyi.id },
    ],
  });
}

main()
  .then(async (e) => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
