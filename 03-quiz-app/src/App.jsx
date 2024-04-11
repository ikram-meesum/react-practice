import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import LoadingBar from "react-top-loading-bar";
import Swal from "sweetalert2";

function App() {
  const [allQuestion, setAllQuestion] = useState([]);
  const [progress, setProgress] = useState(0);

  const [active, setActive] = useState(false);
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((response) => response.json())
      .then((json) => {
        // console.log("json: ", json);
        setAllQuestion(json);
      });
  }, []);

  const [index, setIndex] = useState(0);
  let current = null;

  if (allQuestion.length > 0) {
    current = allQuestion[index];
  }

  const nextQuestion = () => {
    if (selectedAns == null || selectedAns == "") {
      alert("Please select atleast one option");
    } else {
      setProgress(progress + 10);
      if (index >= 9) {
        alert("The End");
        Swal.fire({
          title: "Result",
          text: `Total Correct: ${correctAns} Total Wrong: ${wrongAns + 1}`,
          icon: "success",
        });
      } else {
        if (current.correctAnswer == selectedAns) {
          console.log("CORRECT");
          setCorrectAns(correctAns + 1);
          setSelectedAns("");
        } else {
          console.log("WRONG");
          setWrongAns(wrongAns + 1);
          setSelectedAns("");
        }
        setIndex(index + 1);
        console.log("ind: ", index);
      }
    }
  };

  console.log(`Total Correct: ${correctAns} Total Wrong: ${wrongAns}`);

  const [selectedAns, setSelectedAns] = useState("");

  const handleClick = (ans) => {
    setSelectedAns(ans);
    setActive(!active);
  };

  return (
    <>
      <Navbar />
      <main className="w-8/12 mx-auto">
        <div className="bg-blue-200">
          <LoadingBar
            color="red" //#f11946
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
        </div>

        <section className="">
          {allQuestion.length > 0 && (
            <>
              <div className="text-slate-800 text-xl font-semibold p-4 mb-2 border rounded-lg">
                Q{index + 1}. {current.question.text}
              </div>

              {selectedAns && (
                <p className="text-blue-500 ml-5 mb-3 mt-2 font-semibold">
                  Your answer: {selectedAns}{" "}
                </p>
              )}

              <div
                className={
                  "text-slate-800 p-3 border rounded-lg mb-2 hover:cursor-pointer"
                  // active
                  //   ? "bg-red-400 text-slate-800 p-3 border rounded-lg mb-2 hover:cursor-pointer"
                  //   : "bg-white text-slate-800 p-3 border mb-2 rounded-lg hover:cursor-pointer"
                }
                onClick={() => handleClick(current.incorrectAnswers[0])}
              >
                a. {current.incorrectAnswers[0]}
              </div>
              <div
                className={
                  "text-slate-800 p-3 border rounded-lg mb-2 hover:cursor-pointer"
                }
                onClick={() => handleClick(current.incorrectAnswers[1])}
              >
                b. {current.incorrectAnswers[1]}
              </div>
              <div
                className={
                  "text-slate-800 p-3 border rounded-lg mb-2 hover:cursor-pointer"
                }
                onClick={() => handleClick(current.incorrectAnswers[2])}
              >
                c. {current.incorrectAnswers[2]}
              </div>
              <div
                className={
                  "text-slate-800 p-3 border rounded-lg mb-2 hover:cursor-pointer"
                }
                onClick={() => handleClick(current.correctAnswer)}
              >
                d. {current.correctAnswer}
              </div>
            </>
          )}
        </section>

        <div className="flex justify-between mt-3">
          <p></p>
          <p className="text-slate-500 text-sm">{index + 1} of 10</p>
          <button
            onClick={nextQuestion}
            className="bg-blue-500 rounded-md shadow-lg text-white text-sm px-4 py-2 hover:bg-blue-600"
          >
            Next Question
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
