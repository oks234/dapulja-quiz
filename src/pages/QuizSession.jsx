import { Link } from "react-router-dom";
import Progress from "react-progressbar";
import Overlay from "../components/Overlay";
import { useState } from "react";
import Omr from "../components/Omr";

const Modal = ({ isOpened, closeModal }) => {
  const modalClassName = `absolute-center bg-white z-10 py-6 px-4 rounded-xl text-center w-72 lg:w-[520px] lg:p-6 lg:pt-12 ${isOpened ? "block" : "hidden"}`;
  const pClassName = "my-4 text-gray-600 lg:my-6";
  return (
    <div className={modalClassName}>
      <h6 className="font-bold text-xl">퀴즈를 종료하시겠습니까?</h6>
      <p className={pClassName}>
        지금 종료하시면 <br className="lg:hidden" />
        문제 푼 기록이 저장되지 않습니다.
      </p>
      <p className={pClassName}>정말 퀘스트를 종료하시겠습니까?</p>
      <div className="grid grid-cols-2 gap-2 mt-10 lg:mt-24">
        <button onClick={closeModal} className="btn gray">
          취소
        </button>
        <Link to="/" className="btn">
          종료하기
        </Link>
      </div>
    </div>
  );
};

const QuizSessionHeader = ({ children }) => {
  const basicClassName = "relative flex flex-col items-center justify-center px-5 py-3 shadow-md";
  const lgClassName = "lg:flex-row lg:shadow-none lg:w-[740px] lg:min-h-[80px] lg:mx-auto lg:px-0 lg:justify-between lg:items-center";
  const className = `${basicClassName} ${lgClassName}`;
  return <div className={className}>{children}</div>;
};

const QuizSessionBody = ({ children }) => {
  const mdClassName = "md:flex md:container md:items-start md:mx-auto md:px-5 md:justify-center";
  const lgClassName = "lg:w-[740px] lg:mt-0 lg:p-0 lg:justify-between";
  const className = `m-5 ${mdClassName} ${lgClassName}`;
  return <div className={className}>{children}</div>;
};

const QuizSessionFooter = ({ children }) => {
  const basicClassName = "grid grid-cols-2 gap-3 m-5";
  const mdClassName = "md:flex md:justify-center";
  const className = `${basicClassName} ${mdClassName}`;
  return <div className={className}>{children}</div>;
};

function QuizSession({ title, quizzes }) {
  const quizzesLength = quizzes.length;
  const [doneQuizzes, setDoneQuizzes] = useState(0);
  const [isMobileOmrOpened, setIsMobileOmrOpened] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const openMobileOmr = () => setIsMobileOmrOpened(true);
  const closeMobileOmr = () => setIsMobileOmrOpened(false);
  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);

  return (
    <div className="bg-gray-100 min-h-[100vh] lg:min-h-tablet-quiz lg:flex lg:flex-col lg:justify-center">
      <QuizSessionHeader>
        <button to="/quiz/modal" className="absolute top-4 left-5 lg:static lg:flex lg:items-center" onClick={openModal}>
          <img src="./assets/Close.svg" alt="닫기 이미지" className="lg:hidden" />
          <img src="./assets/Back.svg" alt="뒤로 가기 이미지" className="hidden mr-3 lg:block" />
          <span className="hidden lg:block">퀴즈 나가기</span>
        </button>
        <h1 className="mb-2 text-lg font-bold lg:mb-0">{title}</h1>
        <div className="w-full flex items-center lg:w-auto lg:w-40">
          <div className="grow mr-4 rounded-full bg-gray-300 overflow-hidden">
            <Progress color="#43AEBE" completed={(100 * doneQuizzes) / quizzesLength} />
          </div>
          <div>
            <span className="text-primary">{doneQuizzes}</span> / <span>{quizzesLength}</span>
          </div>
        </div>
      </QuizSessionHeader>
      {/* 아래의 버튼을 누르면 모달이 보이는 페이지로 이동합니다.. */}
      <QuizSessionBody>
        <div className="p-3 border border-slate-400 bg-white rounded-xl md:shrink md:mr-4">
          <img src="./assets/QuizImage.png" alt="문제 이미지" />
          {/* 해당 영역에서 문제 이미지가 보여져야 합니다.(src='/assets/QuizImage.png') */}
        </div>
        <Overlay isVisible={isMobileOmrOpened} className="md:hidden" />
        <div className={`fixed inset-0 ${isMobileOmrOpened ? "" : "opacity-0 invisible"} md:relative md:opacity-100 md:visible`}>
          <div className="relative w-72 mx-auto z-10 flex flex-col items-stretch justify-center h-full">
            <Omr {...{ quizzes, doneQuizzes, setDoneQuizzes }} />
            <button className="btn w-72 md:hidden" onClick={closeMobileOmr}>
              입력 완료
            </button>
          </div>
        </div>
      </QuizSessionBody>
      {/* 모바일 화면에서만 보이는 답안입력 버튼, 해당 버튼을 누르면 정답 입력란이 화면에 보여져야 합니다. */}
      <QuizSessionFooter>
        <button className="btn reversed md:hidden" onClick={openMobileOmr}>
          답안입력
        </button>
        <Link to="/result" className="btn md:w-72">
          제출하기
        </Link>
      </QuizSessionFooter>

      {/* 아래 코드부터 모달 부분입니다. */}
      <Overlay isVisible={isModalOpened} clickHandler={closeModal} className="z-10" />
      <Modal isOpened={isModalOpened} closeModal={closeModal} />
    </div>
  );
}

export default QuizSession;

// TODO
// DOM 구조는 자유롭게 변경하셔도 됩니다.
// 모바일 화면에서 보이는 정답 입력란은 [입력완료] 버튼을 눌러야 닫히도록 구현해야 합니다.
// 화면 구현에 필요한 아이콘들은 public/assets 폴더에 있습니다.
// 닫기 아이콘은 'Close.svg'
// 뒤로가기 아이콘은 'Back.svg'
