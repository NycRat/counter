import { useEffect, useRef, useState } from "react";
import DocumentTitle from "react-document-title";

const App = (): JSX.Element => {
  const [count, setCount] = useState<string>("");
  const countRef = useRef("");
  const keyup = useRef(true);

  useEffect(() => {
    const storedCount = localStorage.getItem("count");
    if (storedCount) {
      setCount(storedCount);
    } else {
      localStorage.setItem("count", "0");
      setCount("0");
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && keyup.current) {
        keyup.current = false;
        incrementCount();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        keyup.current = true;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);
    setInterval(() => {
      if (localStorage.getItem("count") !== countRef.current) {
        localStorage.setItem("count", countRef.current);
      }
    }, 10);

    return () => {
      clearInterval(10);
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (count) {
      countRef.current = count;
      localStorage.setItem("count", count.toString());
    }
  }, [count]);

  const incrementCount = () => {
    for (let i = countRef.current.length - 1; i >= 0; i--) {
      let char = countRef.current.at(i);
      if (char) {
        if (char !== "9") {
          char = (parseInt(char) + 1).toString();
          countRef.current =
            countRef.current.substring(0, i) +
            char +
            countRef.current.substring(i + 1);
          break;
        } else {
          countRef.current =
            countRef.current.substring(0, i) +
            0 +
            countRef.current.substring(i + 1);
        }
        if (i === 0) {
          countRef.current = "1" + countRef.current;
        }
      }
    }
    setCount(countRef.current);
  };

  return (
    <DocumentTitle title={count ?? "0"}>
      <div className="app" onClick={incrementCount}>
        <h1>{count}</h1>
      </div>
    </DocumentTitle>
  );
};

export default App;
