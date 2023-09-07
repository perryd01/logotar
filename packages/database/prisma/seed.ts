import { Prisma, PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

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

  const schonherz = await prisma.group.upsert({
    where: { slug: "schonherz" },
    update: {},
    create: {
      name: "Schönherz",
      nameLong: "Schönherz Kollégium",
      slug: "schonherz",
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

  await prisma.group.deleteMany({
    where: {
      slug: {
        in: ["bulis", "kofer", "sport", "kszk", "kultur", "szolgaltato"],
      },
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

  const rawTeams = [
    {
      name: "schdesign",
      slug: "schdesign",
      internalId: 402,
      groupId: simonyi.id,
    },
    {
      internalId: 18,
      name: "SSSL",
      nameLong: "Szent Schönherz Senior Lovagrend",
      slug: "sssl",
      groupId: schonherz.id,
    },
    {
      name: "VIK",
      nameLong: "Villamosmérnöki és Informatikai Kar",
      slug: "vik",
      groupId: bme.id,
    },
    {
      name: "BME",
      nameLong: "Budapesti Műszaki és Gazdaságtudományi Egyetem",
      slug: "bme",
      groupId: bme.id,
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
    {
      name: "SPOT",
      slug: "spot",
      internalId: 13,
      groupId: simonyi.id,
    },
  ];

  await prisma.team.deleteMany({
    where: {
      slug: {
        in: rawTeams.map((team) => team.slug),
      },
    },
  });

  const dbTeams = await prisma.$transaction(
    rawTeams.map((team) => prisma.team.create({ data: team }))
  );

  const assetRead = (filename: string) =>
    fs.readFileSync(path.resolve(__dirname, "./assets", filename));

  const assets = [
    {
      file: "schdesign_szurke.svg",
      name: "schdesign_default",
    },
    {
      file: "sssl_default.svg",
      name: "sssl_default",
    },
    {
      file: "VIK.svg",
      name: "vik_default",
    },
    {
      file: "BMEKicsi.svg",
      name: "bme_default",
    },
    {
      file: "Simonyi.svg",
      name: "simonyi_default",
    },
    {
      file: "Kir-Dev.svg",
      name: "kirdev_default",
    },
    {
      file: "SPOT.svg",
      name: "spot_default",
    },
  ] as {
    file: string;
    name: string;
  }[];

  const preparedLogos = (
    await Promise.all(assets.map((asset) => assetRead(asset.file)))
  )
    .map((asset, index) => {
      return {
        ...assets[index],
        content: asset,
      };
    })
    .map((asset) => {
      const team = dbTeams.find((t) =>
        asset.name.toLowerCase().includes(t.slug.toLowerCase())
      );
      if (!team) return null;
      return {
        name: asset.name,
        content: asset.content,
        type: "LIGHT",
        teamId: team.id,
      };
    })
    .filter((e) => e !== null) as Prisma.LogoCreateInput[];

  await prisma.logo.deleteMany({
    where: {
      name: {
        in: assets.map((asset) => asset.name),
      },
    },
  });

  console.log(preparedLogos, dbTeams);

  await prisma.logo.createMany({
    data: preparedLogos,
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
