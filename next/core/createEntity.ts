
import fs from 'fs';
import path from 'path';
import { Entity, EntityInstance } from './types';

export const createEntity = (name: string): EntityInstance => {
    const findOne = async () => {
        try {
            const jsonDirectory = path.join(process.cwd(), 'entities.json');
            const data = fs.readFileSync(jsonDirectory, 'utf8');
            const entity = JSON.parse(data)
            return entity[name] as Entity
        }
        catch {
            return null
        }
    };
    return { name, findOne };
};