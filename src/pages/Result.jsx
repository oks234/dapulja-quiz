import { Link } from "react-router-dom";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import Omr from "../components/Omr";

const Section = ({ children }) => <div className="container mb-8 px-6">{children}</div>;
const H2 = ({ children }) => <h2 className="font-bold mb-4">{children}</h2>;

function Char() {
  return (
    <div className="flex-center py-16 lg:py-26">
      <img src="/assets/Quiz-Complete.png" alt="퀴즈완료" width={160} />
    </div>
  );
}

function Summary({ summary }) {
  function Box({ isCorrect, count }) {
    const borderColor = isCorrect ? "border-green-500" : "border-red-500";
    return (
      <div className={`flex justify-between my-2 border-2 rounded-lg p-4 ${borderColor}`}>
        <div>{isCorrect ? "정답" : "오답"}</div>
        <div>{count}개</div>
      </div>
    );
  }
  return (
    <Section>
      <H2>요약</H2>
      <Box isCorrect={true} count={summary.correct} />
      <Box isCorrect={false} count={summary.incorrect} />
    </Section>
  );
}

function Details({ sheet }) {
  return (
    <Section>
      <H2>결과 상세보기</H2>
      <Omr {...{ quizzes: sheet, isResult: true }} />
    </Section>
  );
}

function Complete() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex-center pb-4">
      <Link to="/" className="btn w-72">
        완료
      </Link>
    </div>
  );
}

function Congrat() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} recycle={false} />;
}

function Result({ resultSummary, resultSheet }) {
  return (
    <div>
      <Char />
      <div className="md:flex md:w-[700px] md:mx-auto">
        <Summary summary={resultSummary} />
        <Details sheet={resultSheet} />
      </div>
      <Complete />
      <Congrat />
    </div>
  );
}

export default Result;

// TODO
// DOM 구조는 자유롭게 변경하셔도 됩니다.
// 화면 구현에 필요한 아이콘들은 public/assets 폴더에 있습니다.
// O 아이콘은 True.svg
// X 아이콘은 False.svg
