import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { categoryId } = req.query;

    if (!categoryId || typeof categoryId !== 'string') {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
        categoryId: true,
      }
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}
