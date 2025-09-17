import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const category = await prisma.category.findUnique({
        where: { id: String(id) },
        include: { products: true },
      });

      if (!category) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.status(200).json(category);
    }

    if (req.method === "PUT") {
      const { name, imageUrl } = req.body;

      const updated = await prisma.category.update({
        where: { id: String(id) },
        data: { name, imageUrl },
      });

      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      await prisma.category.delete({ where: { id: String(id) } });
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: (err as Error).message || "Server error" });
  }
}
