import { notFound } from "next/navigation";
import { getPage } from "websites-factory";
import { PageRenderer } from '@/websites-factory/PageRenderer'

const page = async ({ params }) => {
  const pageResult = await getPage(params);
  if (!pageResult) {
    notFound();
  }
  return (
    <PageRenderer pageResult={pageResult} />
  );
};

export default page;
