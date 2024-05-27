import { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [equals, setEquals] = useState<string>("0");
  const [formula, setFormula] = useState<string>("");
  const [hasDot, setHasDot] = useState<boolean>(false);

  const handleClick = (char: string) => {
    if (char === "clear") {
      setEquals("0");
      setFormula("");
      setHasDot(false);
    } else if (char === "=") {
      if(equals!=='0'){
        console.log("sa");
        setEquals(evaluate(formula));
        setFormula(formula + "=" + evaluate(formula));
      }
    } else {
      if (!isNaN(parseInt(char)) || char === ".") {
        if (equals === "0" || isNaN(parseInt(equals))) {
          setEquals(char);
          setHasDot(false);
        } else {
          if (!hasDot) {
            if (char === ".") {
              setHasDot(true);
            }
            setEquals((prevEquals) => prevEquals + char);
          } else if (char !== ".") {
            setEquals((prevEquals) => prevEquals + char);
          }
        }
      } else {
        setEquals(char);
        if (/=/.test(formula)) {
          setFormula(equals);
        }
      }
      const lastChar = formula.charAt(formula.length - 1);
      const last2ndChar = formula.charAt(formula.length - 2);
      

      if (!hasDot || char!=='.') {
        console.log('last '+lastChar);
        if(lastChar==='-' && last2ndChar!=='-' && char==='-' ){
          setFormula((prevFormula) => prevFormula + char);
          console.log("1");
          
        }else if((char==='+' || char==='/' || char==='*') && (isNaN(parseInt(lastChar))) || isNaN(parseInt(formula.charAt(0))) ){
          if(isNaN(parseInt(last2ndChar)) && last2ndChar!='.'){
            setFormula((prevFormula) => prevFormula.slice(0, -2) + char);
          }else{
            setFormula((prevFormula) => prevFormula.slice(0, -1) + char);
          }
          console.log('2');
          
        }else{
          console.log("3");
          setFormula((prevFormula) => prevFormula + char);
        }
      } 
    }
  };

  return (
    <>
      <div className="container">
        <div id="screen">
          <div className="formulaScreen">{formula}</div>
          <div className="outputScreen" id="display">
            {equals}
          </div>
        </div>
        <div className="row-right">
          <button id="clear" onClick={() => handleClick("clear")}>
            AC
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("7")} id="seven">
            7
          </button>
          <button onClick={() => handleClick("8")} id="eight">
            8
          </button>
          <button onClick={() => handleClick("9")} id="nine">
            9
          </button>
          <button onClick={() => handleClick("/")} id="divide">
            /
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("4")} id="four">
            4
          </button>
          <button onClick={() => handleClick("5")} id="five">
            5
          </button>
          <button onClick={() => handleClick("6")} id="six">
            6
          </button>
          <button onClick={() => handleClick("*")} id="multiply">
            x
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("1")} id="one">
            1
          </button>
          <button onClick={() => handleClick("2")} id="two">
            2
          </button>
          <button onClick={() => handleClick("3")} id="three">
            3
          </button>
          <button onClick={() => handleClick("-")} id="subtract">
            -
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("0")} id="zero">
            0
          </button>
          <button onClick={() => handleClick(".")} id="decimal">
            .
          </button>
          <button onClick={() => handleClick("=")} id="equals">
            =
          </button>
          <button onClick={() => handleClick("+")} id="add">
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
