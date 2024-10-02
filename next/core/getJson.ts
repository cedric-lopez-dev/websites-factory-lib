import fs from 'fs';
import path from 'path';


export const getJson = (pathFile: string): { [key: string]: unknown } | null => {
    try {
        const jsonDirectory = path.join(process.cwd(), pathFile);
        const data = fs.readFileSync(jsonDirectory, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file:`, error);
        return null;
    }
};