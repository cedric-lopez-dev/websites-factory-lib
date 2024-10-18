
import { getPage, PageRenderer, populateMetadata } from '@/lib';
import { Providers } from '@/websites-factory/Providers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
    const pageResult = await getPage(params)
    if (!pageResult) {
        notFound();
    }
    const populatedMetadata = populateMetadata(pageResult)
    return populatedMetadata
}

const page = async ({ params }) => {
    const pageResult = await getPage(params);
    if (!pageResult) {
        notFound();
    }
    const { theme } = pageResult
    return (
        <Providers themeTemplate={theme}>
            <PageRenderer pageResult={pageResult} />
        </Providers>
    );
};

export default page;