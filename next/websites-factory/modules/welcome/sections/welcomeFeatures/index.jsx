import React from 'react';
import { Container, Section } from "@/websites-factory/ui/layout";
import { Features } from "@/websites-factory/ui/features";
const WelcomeFeatures = () => {
    return (
        <Container>
            <Section variant="Small">
                <Features>
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600">
                                👋
                            </div>
                            Hello World !
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.</dd>
                    </div>
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600">
                                🎨
                            </div>
                            Themes
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600">Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.</dd>
                    </div>
                </Features>
            </Section>
        </Container>
    );
};

export default WelcomeFeatures;