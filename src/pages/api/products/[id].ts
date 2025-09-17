import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    if (req.method === 'DELETE') {
      await prisma.product.delete({
        where: { id },
      });

      return res.status(200).json({ message: 'Product deleted successfully' });
    } 
    
    else if (req.method === 'GET') {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.status(200).json(product);
    }
    
    else {
      res.setHeader('Allow', ['GET', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: (error as Error).message || 'Failed to process request' });
  } finally {
    await prisma.$disconnect();
  }
}
