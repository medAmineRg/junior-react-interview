import { useState } from "react";
import "./App.css";

function MakeCircle({ x, y }: { x: number; y: number }): JSX.Element {
  return (
    <div
      className="circle"
      style={{ position: "absolute", left: x, top: y }}></div>
  );
}
function App() {
  const [circle, setCircle] = useState<JSX.Element[]>([]);
  const [stack, setStack] = useState<JSX.Element[]>([]);

  return (
    <div
      className="container"
      onClick={(e) => {
        setCircle((prev) => [
          ...prev,
          MakeCircle({ x: e.clientX, y: e.clientY }),
        ]);
      }}>
      <div className="flex">
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (circle.length) {
                setCircle((prev: JSX.Element[]) => {
                  const popCircle = prev.pop()!;
                  setStack((prevStack) => [...prevStack, popCircle]);
                  return [...prev];
                });
              } else {
                alert("no circle to undo");
              }
            }}>
            undo
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (stack.length) {
                setStack((prev) => {
                  const popCircle = prev.pop()!;
                  setCircle((prevCircle) => [...prevCircle, popCircle]);
                  return [...prev];
                });
              } else {
                alert("nothing in the stack");
              }
            }}>
            redo
          </button>
        </div>
        <div className="circle-container flex">{circle?.map((cir) => cir)}</div>
      </div>
    </div>
  );
}

export default App;
