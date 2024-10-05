import { getPage, PageRenderer, populateMetadata } from '@/lib';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const pageResult = await getPage(params)
    if (!pageResult) {
        notFound();
    }
    const populatedMetadata = populateMetadata(pageResult)
    return populatedMetadata
}

const page = async ({ params }: { params: { slug: string } }): Promise<JSX.Element> => {
    const pageResult = await getPage(params);

    if (!pageResult) {
        notFound();
    }
    return (
        <PageRenderer pageResult={pageResult} />
    );
};

export default page;