import { v4 as uuidv4 } from 'uuid';
export const generateUuid = (): string => {
  const newUuid = uuidv4(); // Generate a new UUID
  return newUuid;
};
