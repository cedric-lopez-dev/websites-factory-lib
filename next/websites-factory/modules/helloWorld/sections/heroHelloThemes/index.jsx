
import { Container, Section } from "@/websites-factory/ui/layout";
import { Hero, HeroTitle, HeroSubtitle, HeroDescription } from "@/websites-factory/ui/hero";
import { Strong } from "@/websites-factory/ui/text";
const HeroHelloThemes = () => {
    return (
        <Section>
            <Container>
                <Hero>
                    <HeroTitle>
                        Hello Themes (beta)
                    </HeroTitle>
                    <HeroSubtitle>
                        Welcome to the Hello Themes page !
                    </HeroSubtitle>
                    <HeroDescription>
                        On this page, you can test the theme-switching functionality.
                    </HeroDescription>
                </Hero>

            </Container>
        </Section>

    );
};

export default HeroHelloThemes;