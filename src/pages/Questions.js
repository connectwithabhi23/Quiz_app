import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../image/loader.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ShowResult from "../Components/ShowResult";

function Questions() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [questions, setQuestions] = useState([]);
  const [curQuestionNo, setCurQuestionNo] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [result, setResult] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const showResult = () => {
    if (!questions[curQuestionNo].userAnswer) {
      alert("Please select one answer !");
      return false;
    }

    setResult(true);
  };

  const nextQuestion = () => {
    if (!questions[curQuestionNo].userAnswer) {
      alert("Please select one answer !");
      return false;
    }

    setAllAnswers(
      [
        ...questions[curQuestionNo + 1].incorrect_answers,
        questions[curQuestionNo + 1].correct_answer,
      ].sort(() => Math.random() - 0.5)
    );

    setCurQuestionNo(curQuestionNo + 1);
  };

  const fetchQuizData = async () => {
    setLoading(true);

    const url = `https://opentdb.com/api.php?amount=${params.no}&category=${
      params.cat
    }&difficulty=${params.dif.toLowerCase()}&type=multiple`;
    const data = await axios.get(url);
    console.log(data);
    if (data.data.results.length === 0) {
      alert(
        `${params.no} questions are not available please select some less numbers`
      );
      navigate("/");
      return false;
    }
    setQuestions(data.data.results);
    setAllAnswers(
      [
        ...data.data.results[0].incorrect_answers,
        data.data.results[0].correct_answer,
      ].sort(() => Math.random() - 0.5)
    );

    setLoading(false);
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const createMarkup = (text) => {
    return { __html: text };
  };

  const getAnswer = (e, ans) => {
    questions[curQuestionNo].userAnswer = ans;
    setSelected(ans);
  };

  const reset = () => {
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <div>
          <img src={Loader} alt="loading ..." />
        </div>
      ) : !result ? (
        <div>
          {questions.length > 0 && (
            <>
              <Card className="questionContent">
                <div className="question">
                  <p
                    dangerouslySetInnerHTML={createMarkup(
                      questions[curQuestionNo].question
                    )}
                    className="questionText"
                  ></p>
                </div>
                <hr></hr>
                <CardContent>
                  {allAnswers.map((ans, i) => {
                    return (
                      <div
                        className={
                          selected === ans ? "selected answer" : "answer"
                        }
                        key={i}
                        onClick={(e) => {
                          getAnswer(e, ans);
                        }}
                      >
                        <p dangerouslySetInnerHTML={createMarkup(ans)}></p>
                      </div>
                    );
                  })}
                  <div>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ float: "right" }}
                      onClick={
                        questions.length === curQuestionNo + 1
                          ? showResult
                          : nextQuestion
                      }
                    >
                      {questions.length === curQuestionNo + 1
                        ? "Show Result"
                        : "Next Qustion"}
                    </Button>
                    <Button variant="outlined" onClick={reset}>
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      ) : (
        <ShowResult
          questions={questions}
          createMarkup={createMarkup}
          reset={reset}
        ></ShowResult>
      )}
    </>
  );
}

export default Questions;
