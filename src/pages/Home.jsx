import { Link } from "react-router-dom";

function HeroSection() {
  return <section className="h-40 bg-zinc-400 md:h-60 lg:h-80 2xl:h-96"></section>;
}

function WorkbookView({ workbook }) {
  return (
    <Link to="/quiz" key={workbook.seq} className="block rounded-xl h-28 p-4 shadow-xl font-bold">
      <h2 className="text-xl mb-1">{workbook.title}</h2>
      <h3 className="text-sm text-zinc-500">{workbook.subject}</h3>
    </Link>
  );
}

function WorkbookSection({ workbookList }) {
  return (
    <div className="mx-auto py-8 px-6 grid grid-cols-1 gap-2 bg-white md:grid-cols-3 md:gap-3 lg:container lg:grid-cols-4">
      {workbookList.map((workbook) => (
        <WorkbookView key={workbook.seq} workbook={workbook} />
      ))}
    </div>
  );
}

function Home({ workbookList }) {
  return (
    <>
      <HeroSection />
      <WorkbookSection workbookList={workbookList} />
    </>
  );
}

export default Home;

// TODO
// 첨부된 화면과 가장 유사하게 반응형으로 구현하시면 됩니다.
