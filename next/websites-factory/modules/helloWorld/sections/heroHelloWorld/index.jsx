
import { Container, Section } from "@/websites-factory/ui/layout";
import { Hero, HeroTitle, HeroSubtitle, HeroDescription } from "@/websites-factory/ui/hero";
import { Strong } from "@/websites-factory/ui/text";
const HeroHelloWorld = () => {
    return (
        <Section>
            <Container>
                <Hero>
                    <HeroTitle>
                        Hello World
                    </HeroTitle>
                    <HeroSubtitle>
                        Welcome to the Hello World page !
                    </HeroSubtitle>
                    <HeroDescription>
                        This example page shows how <Strong>Website Factory</Strong> generates pages from its configuration file. Feel free to modify the config and observe the result!
                    </HeroDescription>
                </Hero>

            </Container>
        </Section>

    );
};

export default HeroHelloWorld;