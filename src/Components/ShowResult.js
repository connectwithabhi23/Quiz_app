import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

function ShowResult({ questions, createMarkup, reset }) {
  const [score, setScore] = useState({
    userScore: 0,
    total: questions.length * 10,
  });

  console.log(reset);

  useEffect(() => {
    if (questions.length > 0) {
      setScore(
        questions.filter((q) => q.userAnswer === q.correct_answer).length * 10
      );
      const currScore =
        questions.filter((q) => q.userAnswer === q.correct_answer).length * 10;
      setScore({ ...score, userScore: currScore });
    }
  }, []);
  return (
    <div>
      <Card style={{ marginTop: "50px", backgroundColor: "rgb(186,233,233)" }}>
        <CardHeader
          title="MarkSheet"
          titleTypographyProps={{ variant: "h3" }}
          style={{
            textAlign: "center",
            backgroundColor: "rgb(73,189,235)",
            color: "white",
          }}
        ></CardHeader>
        <CardContent>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.59rem",
              fontWeight: "bold",
            }}
          >
            Your Score = {score.userScore}
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.59rem",
              fontWeight: "bold",
            }}
          >
            Total Score = {score.total}
          </p>
        </CardContent>
      </Card>
      {questions.map((q, i) => {
        return (
          <Card key={i} style={{ marginTop: "15px" }}>
            <div className="question">
              <p
                className="questionText"
                dangerouslySetInnerHTML={createMarkup(q.question)}
              ></p>
            </div>
            <hr></hr>
            <CardContent>
              <div style={{ textAlign: "center" }} className="answerq">
                <b>Your Answer</b>{" "}
                <p
                  dangerouslySetInnerHTML={createMarkup(q.userAnswer)}
                  className={
                    q.userAnswer === q.correct_answer ? "correct" : "wrong"
                  }
                ></p>
                <hr></hr>
                <b>Correct Anwer :</b>
                <p dangerouslySetInnerHTML={createMarkup(q.correct_answer)}></p>
              </div>
              <p style={{ float: "right", color: "blue" }}>
                <b>Mark :{q.userAnswer === q.correct_answer ? "10" : "00"}</b>
              </p>
            </CardContent>
          </Card>
        );
      })}
      <Button
        variant="contained"
        onClick={reset}
        style={{
          marginTop: "35px",
          marginBottom: "15px",
          width: "100%",
          color: "primary",
        }}
      >
        Reset
      </Button>
    </div>
  );
}

export default ShowResult;
