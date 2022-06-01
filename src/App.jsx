import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QuizSession from "./pages/QuizSession";
// import QuizModal from "./pages/QuizModal";
import Result from "./pages/Result";

function App() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 메인화면 데이터s
  const workbookList = [
    {
      seq: 1,
      title: "중학교 수학② 자습서 수학 2016",
      subject: "수학",
      src: "",
    },
    {
      seq: 2,
      title: "파사쥬팝 국어 종합편 국어",
      subject: "국어",
      src: "",
    },
    {
      seq: 3,
      title: "한끝 영어영역 종합편 2017",
      subject: "영어",
      src: "",
    },
    {
      seq: 4,
      title: "파사쥬팝 국어 종합편 국어",
      subject: "수학",
      src: "",
    },
    {
      seq: 5,
      title: "한끝 영어영역 종합편 2017",
      subject: "영어",
      src: "",
    },
  ];

  const quizzes = [
    {
      seq: 1,
      selected: "3",
      dtype: "선다형",
    },
    {
      seq: 2,
      selected: "2",
      dtype: "선다형",
    },
    {
      seq: 3,
      selected: "5",
      dtype: "선다형",
    },
    {
      seq: 4,
      selected: "1",
      dtype: "선다형",
    },
    {
      seq: 5,
      selected: "4",
      dtype: "단답형",
    },
  ];
  // result
  const resultSummary = {
    correct: 2,
    incorrect: 3,
  };
  const resultSheet = [
    {
      seq: 1,
      selected: "3",
      value: "1",
      dtype: "선다형",
    },
    {
      seq: 2,
      selected: "2",
      value: "2",
      dtype: "선다형",
    },
    {
      seq: 3,
      selected: "5",
      value: "5",
      dtype: "선다형",
    },
    {
      seq: 4,
      selected: "1",
      value: "4",
      dtype: "선다형",
    },
    {
      seq: 5,
      selected: "4",
      value: "1",
      dtype: "단답형",
    },
  ];
  return (
    <>
      <Header {...{ isMobileMenuVisible, setIsMobileMenuVisible, isLoggedIn, setIsLoggedIn }} />
      <main className="min-h-mobile-main md:min-h-tablet-main">
        <Routes>
          <Route path="/" element={<Home workbookList={workbookList} />} />
          <Route path="/quiz" element={<QuizSession title="중2 랜덤 과목 문제 풀기" quizzes={quizzes} />} />
          {/* <Route path="/quiz/modal" element={<QuizModal title="중2 랜덤 과목 문제 풀기" quizzes={quizzes} />} /> */}
          <Route path="/result" element={<Result resultSummary={resultSummary} resultSheet={resultSheet} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
