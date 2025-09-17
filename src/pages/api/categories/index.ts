import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
        },
      });
      return res.status(200).json(categories);
    }

    if (req.method === "POST") {
      const { name, imageUrl } = req.body;
      if (!name || !imageUrl) {
        return res.status(400).json({ error: "Name and imageUrl are required" });
      }

      const category = await prisma.category.create({
        data: { name, imageUrl },
      });

      return res.status(201).json(category);
    }

    if (req.method === "PUT") {
      const { id, name, imageUrl } = req.body;

      if (!id || (!name && !imageUrl)) {
        return res.status(400).json({ error: "ID and at least one field to update (name or imageUrl) are required" });
      }

      const existingCategory = await prisma.category.findUnique({ where: { id } });
      if (!existingCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name, imageUrl },
      });

      return res.status(200).json(updatedCategory);
    }

    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: (err as Error).message || "Server error" });
  }
}
