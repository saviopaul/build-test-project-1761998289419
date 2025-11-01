import { Request, Response } from 'express';
import { prisma } from '../server';

interface ItemInput {
  name: string;
  description?: string;
}

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(`Error fetching item with id ${id}:`, error);
    res.status(500).json({ message: 'Error fetching item' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  const { name, description }: ItemInput = req.body;

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Error creating item' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description }: Partial<ItemInput> = req.body;

  try {
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
      },
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(`Error updating item with id ${id}:`, error);
    res.status(500).json({ message: 'Error updating item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.item.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(`Error deleting item with id ${id}:`, error);
    res.status(500).json({ message: 'Error deleting item' });
  }
};
