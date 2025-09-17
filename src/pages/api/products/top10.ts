import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const products = await prisma.product.findMany({
      take: 10, // limit to top 10
      orderBy: {
        createdAt: 'desc', // or by some popularity metric if you have one
      },
      include: {
        category: true,
      },
    })

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Failed to fetch top products' })
  }
}
