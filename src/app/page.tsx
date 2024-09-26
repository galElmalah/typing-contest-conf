"use client";

import { GameInfoSection } from "./Info";
import styles from "./page.module.css";
import { useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const Countdown = ({
  countdown,
  onDone,
}: {
  countdown: number;
  onDone: () => {};
}) => {
  const [time, setTime] = useState<number>(countdown);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startTimer = () => {
    setIsRunning(true);
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      onDone();
    }, 1000 * countdown);
  };

  return (
    <div className={styles.timer}>
      <button className={styles.start} onClick={startTimer}>
        Press Enter to Start the Countdown
      </button>
    </div>
  );
};

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function Home() {
  const [typedText, setTypedText] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [totalTyped, setTotalTyped] = useState<number>(0);

  const handleChar = (c: string) => {
    if (cursor === text.length) {
      return;
    }
    setTotalTyped(totalTyped + 1);
    if (c !== text[cursor]) {
      setErrorCount(errorCount + 1);
    }
    setTypedText(typedText + c);
    setCursor(cursor + 1);
  };

  const handleBackspace = () => {
    if (cursor === 0) {
      return;
    }
    setTypedText(typedText.slice(0, -1));
    setCursor(cursor - 1);
  };

  const calcAccuracyInPercentage = () => {
    if (typedText.length === 0) {
      return 0;
    }
    return ((typedText.length - errorCount) / typedText.length) * 100;
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    console.log(e.key, typedText);
    if (e.key === "Backspace") {
      return handleBackspace();
    }
    // ignore shift etc
    if (e.key.length > 1) {
      return;
    }

    handleChar(e.key);
  };

  return (
    <PrimeReactProvider>
      <div className="card flex justify-content-center">
        <Stepper>
          <StepperPanel header="Header I">
            <GameInfoSection />
          </StepperPanel>
          <StepperPanel header="Header II">
            <div
              tabIndex={0}
              className={styles.page}
              onKeyDown={handleOnKeyDown}
            >
              <main className={styles.main}>
                <Countdown countdown={60} />
                <p className={styles.text}>
                  {text.split("").map((c, i) => {
                    // add handelrs to letters that where already typed and color them differently if they were typed correctly or not
                    if (i < typedText.length) {
                      if (c === typedText[i]) {
                        return (
                          <span key={i} className={styles.correct}>
                            {c}
                          </span>
                        );
                      }
                      return (
                        <span key={i} className={styles.incorrect}>
                          {c}
                        </span>
                      );
                    }
                    if (i === typedText.length) {
                      return (
                        <span key={i} className={styles.cursor}>
                          {c}
                        </span>
                      );
                    }
                    return c;
                  })}
                </p>
              </main>
              <footer className={styles.footer}>JOIN US</footer>
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </PrimeReactProvider>
  );
}
