'use client'
import React from 'react';
import { Container, Section } from "@/websites-factory/ui/layout";
import { Button } from "@/websites-factory/ui/button";
import { useTheme } from "@/websites-factory/themeContext";

const SwitchThemes = () => {

    const { theme, setTheme } = useTheme()
    const removeTheme = () => {
        setTheme('default')
    }
    const welcomeTheme = () => {
        setTheme('welcome')
    }

    return (
        <Container>
            <Section>

                {
                    theme === 'default' ?
                        <Button onClick={welcomeTheme}>
                            Welcome Theme
                        </Button> :
                        <Button onClick={removeTheme}>
                            remove theme
                        </Button>
                }

            </Section>
        </Container>
    );
};

export default SwitchThemes;