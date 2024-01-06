'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export const customRevalidateTag = (tag: string) => {
  revalidateTag(tag);
};

export const customRevalidatePath = (path: string) => {
  revalidatePath(path);
};
