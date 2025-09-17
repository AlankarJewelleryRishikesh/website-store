import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { categoryId } = req.query;
      const products = await prisma.product.findMany({
        where: categoryId ? {
          categoryId: String(categoryId)
        } : undefined,
        include: {
          category: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json({ error: (err as Error).message || 'Error fetching products' })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, imageUrl, categoryId } = req.body
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          imageUrl,
          categoryId
        }
      })
      res.status(201).json(product)
    } catch (err) {
      res.status(500).json({ error: (err as Error).message || 'Error creating product' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}
