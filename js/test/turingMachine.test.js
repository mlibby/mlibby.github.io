import test from "ava";
import TuringMachine from "../app/turingMachine.js";

test("syntax error - case 1", (t) => {
  let errorMessage;
  try {
    const tm = new TuringMachine("a");
  }
  catch (error) {
    errorMessage = error.message;
  }

  t.is(errorMessage, "Syntax Error, Line 1");
});

test("syntax error - case 2", (t) => {
  let errorMessage;
  try {
    const tm = new TuringMachine("a *");
  }
  catch (error) {
    errorMessage = error.message;
  }

  t.is(errorMessage, "Syntax Error, Line 1");
});

test("parse simplest valid m-configuration possible", (t) => {
  const tm = new TuringMachine("a * R a");
  t.deepEqual(tm.mConfig, ["a * R a"]);
  t.deepEqual(tm.byteCode, {"a": {"*": [["R"], "a"]}});
});

test("parse simplest m-configuration possible", (t) => {
  const tm = new TuringMachine("a * R a");
  t.deepEqual(tm.mConfig, ["a * R a"]);
  t.deepEqual(tm.byteCode, {"a": {"*": [["R"], "a"]}});
});

test("parse multiple command single line m-config", (t) => {
  const tm = new TuringMachine("a * R,R,P1 a");
  t.deepEqual(tm.byteCode, {"a": {"*": [["R", "R", "P1"], "a"]}})
});



