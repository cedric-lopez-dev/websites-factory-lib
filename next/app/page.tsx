import { notFound } from "next/navigation";
import { getPage, PageRenderer } from "websites-factory";
import { Providers } from "@/websites-factory/Providers"

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
