'use client'
import { Button } from "@/websites-factory/ui/button";
import { Container, Section } from "@/websites-factory/ui/layout";
import { Hero, HeroDescription, HeroSubtitle, HeroTitle } from "@/websites-factory/ui/hero";
import { LogoAnimated } from '../../components/logo'
import Link from "next/link";


const Introduction = () => {

    return (
        <Section>
            <Container>
                <Hero>
                    <LogoAnimated />
                    <HeroTitle>
                        Websites Factory
                    </HeroTitle>
                    <HeroSubtitle>
                        Welcome to the Websites Factory !
                    </HeroSubtitle>
                    <HeroDescription>
                        This library aims to generate pages in Next.js from your modules or modules created by the community.
                    </HeroDescription>
                    <Button>
                        <Link target="blank" href="https://www.npmjs.com/package/websites-factory">
                            <span></span>Documentation <span>&rarr;</span>
                        </Link>
                    </Button>
                </Hero>
            </Container>
        </Section>

    );
};

export default Introduction;