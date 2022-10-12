import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as React from "react";
import { db } from "~/db.server";

export const loader = async ({ request, params }) => {
  const { menuId } = params;
  const menu = await db.menu.findUnique({
    where: { id: Number(menuId) },
    include: { menuCategories: { include: { menuItems: true } } },
  });

  return json({ menu });
};
export default function Index() {
  const { menu } = useLoaderData();
  const { menuCategories } = menu;

  return (
    <div>
      <h1 className="text-xl font-bold mt-4">Menu</h1>

      <div className="">
        {menuCategories.map((category) => (
          <div key={category.id}>
            <h2 className="text-lg font-bold mt-2">{category.name}</h2>
            {category.menuItems.map((item) => (
              <div key={item.id} className="ml-4">
                <h3 className="text-lg font-bold mt-2">{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
