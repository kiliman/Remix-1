const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  const user = await db.user.create({
    data: {
      email: "kiliman@gmail",
      total: 0,
    },
  });

  const restaurant = await db.restaurant.create({
    data: {
      name: "Madre Cafe",
      logo: "https://madre-cafe.com/wp-content/uploads/2021/11/logo-madre-cafe-header.svg",
      email: "info@madrecafe.com",
      phone: "8885551212",
    },
  });

  const branch = await db.branch.create({
    data: {
      name: "Madre Cafe #1",
      ppt_image:
        "https://madre-cafe.com/wp-content/uploads/2021/11/logo-madre-cafe-header.svg",
      email: "branch1@madrecafe.com",
      phone: "8885551212",
      city: "Guadalajara",
      address: "Calle Orizaba 131",
      extraAddress: "Colonia Roma Cdmx",
      rating: 4.8,
      rating_quantity: 400,
      cuisine: "Internacional",
      restaurant: { connect: { id: restaurant.id } },
    },
  });

  for (let i = 1; i <= 10; i++) {
    const table = await db.table.create({
      data: {
        table_number: i,
        order_in_progress: false,
        branch: { connect: { id: branch.id } },
      },
    });
  }

  const menu = await db.menu.create({
    data: {
      name: "Main Menu",
      branch: { connect: { id: branch.id } },
    },
  });

  const categories = await Promise.all(
    getCategories().map(({ name }) =>
      db.menuCategory.create({
        data: {
          name,
          menu: { connect: { id: menu.id } },
        },
      })
    )
  );

  const menuItems = await Promise.all(
    categories.flatMap((category, i) =>
      range(1, 5).map((j) =>
        db.menuItem.create({
          data: {
            name: `${category.name} Item #${j}`,
            image:
              "https://madre-cafe.com/wp-content/uploads/2021/11/logo-madre-cafe-header.svg",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: getRandom(5, 20),
            available: true,
            menuCategory: { connect: { id: category.id } },
          },
        })
      )
    )
  );
}

seed();

function getCategories() {
  return [
    {
      id: 1,
      name: "Hot Cakes",
    },
    {
      id: 2,
      name: "Frutas",
    },
    {
      id: 3,
      name: "Pan Francés",
    },
    {
      id: 4,
      name: "Huevos",
    },
    {
      id: 5,
      name: "Molletes",
    },
    {
      id: 6,
      name: "Chilaquiles",
    },
    {
      id: 7,
      name: "Toasts",
    },
    {
      id: 8,
      name: "Especiales",
    },
    {
      id: 9,
      name: "Jugos",
    },
  ];
}

function getDishes() {
  return [
    {
      image: "https://drive.google.com/uc?id=16Bju_Lz6Opkw0EtDLAkVXbqRQit0zi5a",
      name: "Hot Cakes de Nutella",
      meal: "desayuno",
      description: "Rellenos de nutella con compota de plátano.",
      specs: ["vegano"],
      price: 180,
      menu: {
        connect: {
          id: 1,
        },
      },
    },
    {
      image: "https://drive.google.com/uc?id=1M5GRr1yoHzRHjCEPNNQevpIdRx9vuRp8",
      name: "Hot Cakes de Frutos Rojos",
      meal: "desayuno",
      description: "Con salsa de frutos rojos con mantequilla mascarpone.",
      specs: ["vegano"],
      price: 120,
      menu: {
        connect: {
          id: 1,
        },
      },
    },
    {
      image: "https://drive.google.com/uc?id=1OXNDPb07iM56ECe9KUNnihcMRLQUfYmx",
      name: "Huevos Rotos",
      meal: "desayuno",
      description:
        "Huevos rotos con jamón serrano, papas confitadas y pimientos rojos",
      specs: ["vegano"],
      price: 178,
      menu: {
        connect: {
          id: 1,
        },
      },
    },
    {
      image: "https://drive.google.com/uc?id=1DOBu7FBErMHJuqujOGah9xqXSQF5rr0X",
      name: "Toast de Aguacate",
      meal: "desayuno",
      description:
        "Pan campesino con guacamole hecho en casa, rabano, jitomate cherry y huevo pochado.",
      specs: ["vegano"],
      price: 185,
      menu: {
        connect: {
          id: 1,
        },
      },
    },
    {
      image: "https://drive.google.com/uc?id=1dPdRyMJ_HiR6x57dxahiG9nbh3OFNpxP",
      name: "Omelette de Chilaquiles",
      meal: "desayuno",
      description:
        "Omellete relleno de chilaquiles bañado en salsa verde o roja con crema y queso.",
      specs: ["vegano"],
      price: 180,
      menu: {
        connect: {
          id: 1,
        },
      },
    },
    {
      image: "https://drive.google.com/uc?id=1T6OuCY8pqppnSRjlQfAeoNGJwfepR1XU",
      name: "Chilaquiles",
      meal: "desayuno",
      description: "Verdes o rojos con pollo / huevo.",
      specs: ["vegano"],
      price: 198,
      menu: {
        connect: {
          id: 1,
        },
      },
    },
  ];
}

function range(start, end, step = 1) {
  return Array.from(
    { length: (end - start + 1) / step },
    (_, i) => start + i * step
  );
}

function getRandom(start, end) {
  return Math.floor(Math.random() * (end - start)) + start;
}
