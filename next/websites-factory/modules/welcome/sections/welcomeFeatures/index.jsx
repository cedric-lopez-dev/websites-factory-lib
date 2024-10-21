
import Link from 'next/link'
import { Container, Section } from "@/websites-factory/ui/layout";
import { Features, Feature, FeatureContainer, FeatureTitle } from "@/websites-factory/ui/features";
import { Paragraph, Strong } from '@/websites-factory/ui/text';
import { Button } from '@/websites-factory/ui/button'
import { Icon } from '@/websites-factory/ui/icons';
const WelcomeFeatures = () => {
    return (
        <Container>
            <Section>
                <Features>
                    <Feature>
                        <FeatureContainer>
                            <Icon>
                                👋
                            </Icon>
                        </FeatureContainer>
                        <FeatureContainer>
                            <FeatureTitle>Hello World !</FeatureTitle>
                            <Paragraph>This example page shows how Website Factory <Strong>generates pages</Strong> from its configuration file. Feel free to modify the config and observe the result!</Paragraph>
                            <Link href="/hello-world">
                                <Button>
                                    Go to Hello World
                                </Button>
                            </Link>

                        </FeatureContainer>
                    </Feature>
                    <Feature>
                        <FeatureContainer>
                            <Icon>
                                🎨
                            </Icon>
                        </FeatureContainer>
                        <FeatureContainer>
                            <FeatureTitle>Themes</FeatureTitle>
                            <Paragraph>Websites Factory handles the <Strong>creation and management of themes.</Strong> The Hello Theme example page allows you to test different themes</Paragraph>
                            <Link href="/hello-themes">
                                <Button>
                                    Go to Hello Themes
                                </Button>
                            </Link>
                        </FeatureContainer>
                    </Feature>
                </Features>
            </Section>
        </Container >
    );
};

export default WelcomeFeatures;