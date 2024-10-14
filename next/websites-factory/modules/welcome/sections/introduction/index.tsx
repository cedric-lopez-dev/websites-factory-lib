'use client'
import { Button } from "websites-factory/ui";


const Introduction = () => {

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-cyan-600">Websites Factory</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to the Websites Factory !</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">This library aims to generate pages in Next.js from your modules or modules created by the community.</p>
                    <Button>
                        <a target="blank" href="https://www.npmjs.com/package/websites-factory" className="relative font-semibold text-cyan-600"><span className="absolute inset-0" aria-hidden="true"></span>Documentation <span aria-hidden="true">&rarr;</span></a>
                    </Button>
                </div>
            </div>
        </div>

    );
};

export default Introduction;