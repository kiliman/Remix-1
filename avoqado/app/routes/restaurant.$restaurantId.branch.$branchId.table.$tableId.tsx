import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import * as React from "react";
import { db } from "~/db.server";

export const loader = async ({ request, params }) => {
  const { branchId, tableId } = params;
  const [branch, table] = await Promise.all([
    db.branch.findUnique({
      where: { id: Number(branchId) },
      include: { restaurant: true, menus: true },
    }),
    db.table.findUnique({
      where: { id: Number(tableId) },
      include: { order: true },
    }),
  ]);

  return json({ branch, table });
};
export default function Index() {
  const { branch, table } = useLoaderData();
  const { restaurant, menus } = branch;

  return (
    <div>
      <img src={branch.ppt_image} alt={restaurant.name} className="w-full" />
      <h2 className="text-xl font-bold mt-4">Branch: {branch.name}</h2>
      <h2 className="text-lg font-bold mt-2">Table # {table.table_number}</h2>
      <Link
        className="bg-blue-200 px-4 py-2 rounded-lg"
        to={`/menu/${menus[0].id}`}
      >
        View Menu
      </Link>
    </div>
  );
}
