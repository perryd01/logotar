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

  const schdesign = await prisma.team.upsert({
    where: { slug: "schdesign" },
    update: {},
    create: {
      id: 1,
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
      id: 2,
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

  await prisma.team.deleteMany({
    where: {
      slug: {
        in: ["vik", "bme", "simonyi", "kir-dev", "spot"],
      },
    },
  });

  await prisma.team.createMany({
    data: [
      {
        name: "VIK",
        nameLong: "Villamosmérnöki és Informatikai Kar",
        slug: "vik",
        groupId: bme.id,
        id: 3,
      },
      {
        name: "BME",
        nameLong: "Budapesti Műszaki és Gazdaságtudományi Egyetem",
        slug: "bme",
        groupId: bme.id,
        id: 4,
      },
      {
        name: "Simonyi",
        nameLong: "Simonyi Károly Szakkollégium",
        slug: "simonyi",
        internalId: 16,
        groupId: simonyi.id,
        id: 5,
      },
      {
        name: "Kir-Dev",
        nameLong: "KIR fejlesztők és üzemeltetők",
        slug: "kir-dev",
        internalId: 106,
        groupId: simonyi.id,
        id: 6,
      },
      {
        name: "SPOT",
        slug: "spot",
        internalId: 13,
        groupId: simonyi.id,
        id: 7,
      },
    ],
  });

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

  const mapAssets = async () => {
    const a = await Promise.all(assets.map((asset) => assetRead(asset.file)));

    return a.map((asset, index) => ({
      ...assets[index],
      content: asset,
    }));
  };

  await prisma.logo.deleteMany({
    where: {
      name: {
        in: assets.map((asset) => asset.name),
      },
    },
  });

  const mappedAssets = await mapAssets();

  await prisma.logo.createMany({
    data: mappedAssets.map((asset, index) => {
      return {
        name: asset.name,
        content: asset.content,
        type: "LIGHT",
        id: index,
        teamId: index + 1,
      } as Prisma.LogoCreateInput;
    }),
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
