import styles from "./page.module.css";

export const GameInfoSection = () => {
    return (
      <div className={styles.gameInfo}>
        Once you click enter you will have 5 seconds before a 60 seconds timer
        starts. You will have to type the text below as fast as you can. The timer
        will stop when you finish typing or when the time runs out. Good luck! *
        During the game you will be stopped and asked to participate side quests
        for additial points. You will have 10 seconds to react to each of these
        prompts
      </div>
    );
  };