import { useEffect, useState } from "react";

function ShortAnswer({ isResult, quiz, increaseDoneQuizzes, decreaseDoneQuizzes }) {
  const [doneQuizUpdated, setDoneQuizUpdated] = useState(false);
  const inputHandler = (event) => {
    if (doneQuizUpdated) {
      if (event.target.value === "") {
        decreaseDoneQuizzes();
        setDoneQuizUpdated(false);
      }
      return;
    }
    increaseDoneQuizzes();
    setDoneQuizUpdated(true);
  };
  return isResult ? (
    <div className="">
      <p className="text-black">오답입니다.</p>
      <p className="text-green-500">이게 정답입니다.</p>
    </div>
  ) : (
    <input className="rounded-lg border w-full px-2 box-border block relative" placeholder="정답을 입력해주세요." onInput={inputHandler} />
  );
}

function MultipleAnswer({ isResult, quiz, increaseDoneQuizzes }) {
  const [selectedBtnVal, setSelectedBtnVal] = useState(0);
  const [correctVal] = useState(parseInt(quiz.value));
  const [doneQuizUpdated, setDoneQuizUpdated] = useState(false);
  const clickHandler = (event) => {
    setSelectedBtnVal(parseInt(event.target.value, 10));
    if (doneQuizUpdated) return;
    increaseDoneQuizzes();
    setDoneQuizUpdated(true);
  };
  useEffect(() => {
    if (!isResult) return;
    setSelectedBtnVal(parseInt(quiz.selected, 10));
  }, [isResult, quiz]);
  return (
    <>
      {[1, 2, 3, 4, 5].map((value) => {
        const basicClassName = "rounded-lg border border-primary w-7 h-7 flex-center";
        const selectedClassName = selectedBtnVal === value ? "bg-primary text-white" : "";
        const correctedClassName = isResult && correctVal === value && selectedBtnVal !== value ? "bg-green-500 text-white" : "";
        const className = `${basicClassName} ${selectedClassName} ${correctedClassName}`;
        return (
          <button disabled={!!isResult} key={`${quiz.seq}-${value}`} className={className} value={value} onClick={clickHandler}>
            {value}
          </button>
        );
      })}
    </>
  );
}

function OmrRowListItem({ isFirstRow, children }) {
  return (
    <li className={`${isFirstRow ? "border-b-2 border-primary h-8" : "h-12"}`}>
      <ul className="h-[100%] flex">{children}</ul>
    </li>
  );
}

function OmrColListItem({ isFirstCol, children, className }) {
  const basicClassName = "relative flex items-center";
  const firstColClassName = "shrink-0 w-12 h-inherit justify-center bg-primary/20 border-r-2 border-primary";
  const secondColClassName = "grow px-6 justify-between";
  return <li className={`${basicClassName} ${isFirstCol ? firstColClassName : secondColClassName} ${className ? className : ""}`}>{children}</li>;
}

function CheckAnswerIcon({ isCorrect, className }) {
  return <img className={`absolute-center ${className ? className : ""}`} src={`./assets/${isCorrect ? "True" : "False"}.svg`} alt={`${isCorrect ? "O" : "X"} icon`} />;
}

function OmrQuizRow({ isResult, quiz, increaseDoneQuizzes, decreaseDoneQuizzes }) {
  const multipleProps = { isResult, quiz: quiz, increaseDoneQuizzes };
  const shortProps = { isResult, quiz, increaseDoneQuizzes, decreaseDoneQuizzes };
  const isQuizCorrect = isResult && quiz.selected === quiz.value;
  return (
    <OmrRowListItem>
      <OmrColListItem isFirstCol={true}>
        <span>{quiz.seq}</span>
        {isResult && <CheckAnswerIcon isCorrect={isQuizCorrect} />}
      </OmrColListItem>
      <OmrColListItem>{quiz.dtype === "선다형" ? <MultipleAnswer {...multipleProps} /> : <ShortAnswer {...shortProps} />}</OmrColListItem>
    </OmrRowListItem>
  );
}

function Omr({ isResult, quizzes, doneQuizzes, setDoneQuizzes }) {
  const increaseDoneQuizzes = () => setDoneQuizzes(doneQuizzes + 1);
  const decreaseDoneQuizzes = () => setDoneQuizzes(doneQuizzes - 1);
  return (
    <div className="mb-4 rounded-lg border-2 overflow-hidden border-primary text-primary bg-white">
      <ul>
        <OmrRowListItem isFirstRow={true}>
          <OmrColListItem isFirstCol={true}>문번</OmrColListItem>
          <OmrColListItem className="!justify-center bg-primary/20">답안</OmrColListItem>
        </OmrRowListItem>
        {quizzes.map((quiz) => (
          <OmrQuizRow key={quiz.seq} {...{ isResult, quiz, increaseDoneQuizzes, decreaseDoneQuizzes }} />
        ))}
      </ul>
    </div>
  );
}

export default Omr;
