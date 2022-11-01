import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Menu } from "@mui/material";

function QuestionCategory() {
  const navigate = useNavigate();
  //console.log(history);

  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [qNo, setQNo] = useState(0);

  const fetchQuestionCategories = async () => {
    const data = await axios.get("https://opentdb.com/api_category.php");
    //console.log(data);

    setCats(data.data.trivia_categories);
  };

  const submitHandler = () => {
    if (
      parseInt(qNo) > 15 ||
      parseInt(qNo) < 1 ||
      cat === 0 ||
      cat === "" ||
      difficulty === ""
    ) {
      alert("Please give proper inputs");
      return false;
    } else {
      // console.log("else codn");
      const url = `/q/${cat}/${difficulty}/${qNo}`;
      navigate(url);
    }
  };

  useEffect(() => {
    fetchQuestionCategories();
  }, []);
  return (
    <div>
      <Card className="card" style={{ marginTop: "50px" }}>
        <CardHeader
          title="Quiz Champion"
          titleTypographyProps={{ variant: "h3" }}
          style={{
            textAlign: "center",
            backgroundColor: "blue",
            color: "white",
          }}
        ></CardHeader>
        <CardContent>
          <TextField
            select
            label="select"
            defaultValue=""
            helperText="Please select categories"
            className="inputText"
            variant="outlined"
            onChange={(e) => setCat(e.target.value)}
          >
            {cats.map((c) => {
              return (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            select
            label="select"
            defaultValue=""
            helperText="Please select difficulty "
            className="inputText"
            variant="outlined"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">hard</MenuItem>
          </TextField>
          <TextField
            id="outlined-basic"
            label="Number of Questions(1-15)"
            variant="outlined"
            type={"number"}
            name="number"
            className="inputText"
            onChange={(e) => setQNo(e.target.value)}
          />
          <Button
            variant="contained"
            className="button-submit"
            style={{ fontSize: "25px", marginTop: "20px" }}
            color="primary"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuestionCategory;
