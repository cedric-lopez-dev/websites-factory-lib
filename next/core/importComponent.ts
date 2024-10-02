import { ComponentType } from "react";

export const importComponent = async (pathComponent: string): Promise<ComponentType | null> => {
    try {
        const ComponentModule = await import(`/modules/${pathComponent}`);
        return ComponentModule.default as React.ComponentType;
    } catch (error) {
        return null;
    }
};