
import React from "react";
export const PageRenderer = ({ pageResult }) => {
    const {
        PageComponent,
        pageSectionsComponents,
        PageLayoutComponent,
    } = pageResult;

    if (PageLayoutComponent) {
        return (
            <PageLayoutComponent>
                <PageComponent>
                    {pageSectionsComponents.map((Section, i) =>
                        Section ? <Section key={i} /> : null
                    )}
                </PageComponent>
            </PageLayoutComponent>
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