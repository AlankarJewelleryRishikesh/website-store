import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Return some basic API information
      res.status(200).json({
        message: 'Welcome to the Jewelry Store API',
        endpoints: {
          '/api/products': 'Get all products',
          '/api/categories': 'Get all categories',
          '/api/products/[id]': 'Get a specific product',
          '/api/categories/[id]': 'Get a specific category'
        }
      })
    } catch (err) {
      res.status(500).json({ error: (err as Error).message || 'Error fetching API information' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}
