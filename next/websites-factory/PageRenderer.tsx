import { PageResult } from "../core/types";
import React from "react";
import { Providers } from 'websites-factory/context'
export const PageRenderer = ({ pageResult }: { pageResult: PageResult }) => {
    const {
        PageComponent,
        pageSectionsComponents,
        PageLayoutComponent,
    } = pageResult;

    if (PageLayoutComponent) {
        return (
            <Providers>
                <PageLayoutComponent>
                    <PageComponent>
                        {pageSectionsComponents.map((Section, i) =>
                            Section ? <Section key={i} /> : null
                        )}
                    </PageComponent>
                </PageLayoutComponent>
            </Providers>
        );
    }

    return (
        <PageComponent>
            {pageSectionsComponents.map((Section, i) =>
                Section ? <Section key={i} /> : null
            )}
        </PageComponent>
    );
};