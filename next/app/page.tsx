import { getPage, populateMetadata } from "websites-factory";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactElement } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const pageResult = await getPage()
  if (!pageResult) {
    notFound();
  }
  const populatedMetadata = populateMetadata(pageResult)
  return populatedMetadata
}

export default async function Home(): Promise<ReactElement> {

  const pageResult = await getPage()
  if (!pageResult) {
    notFound();
  }
  const { PageComponent, pageSectionsComponents, PageLayoutComponent } = pageResult


  if (PageLayoutComponent)
    return (
      <>
        <PageLayoutComponent>
          <PageComponent>
            {
              pageSectionsComponents.map((Section, i) => {
                if (Section)
                  return <  Section key={i} />
              })
            }
          </PageComponent>
        </PageLayoutComponent>
      </>
    );



  return (
    <PageComponent>
      {
        pageSectionsComponents.map((Section, i) => {
          if (Section)
            return <  Section key={i} />
        })
      }
    </PageComponent>
  );
}

