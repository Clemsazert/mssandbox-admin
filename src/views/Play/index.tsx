import React, { useState, useCallback } from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DotaLoader } from '../../components/Loaders';

enum GameState {
  BEFORE = 'BEFORE',
  WAITING = 'WAITING',
  PLAY = 'PLAY',
  DONE = 'DONE'
}

type QuizzQuestion = {
  question: string;
  answers: string[];
  correct: number;
};

interface PlayProps {
  quizz: QuizzQuestion[];
  onQuizzEnd: (score: number) => void;
}

const dummyQuizz = [
  {
    question: 'QUi est le meilleur joueur de posiiton 5 ?',
    answers: ['Puppey', 'Notail', 'Insania', 'Kuroky'],
    correct: 1
  },
  {
    question: 'Qui est le meilleur coach ?',
    answers: ['Loda', 'Bulba', 'Ceeeeeeb', 'Dendi'],
    correct: 2
  }
];

type Result = {
  score: number
}

export const PlayTab: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<string>('BEFORE');
  const [result, setResult] = useState<Result | null>(null);
  const startGame = () => {
    setGameStatus('WATING');
    setTimeout(() => setGameStatus('PLAY'), 1000);
  };
  const onQuizzEnd = (score: number) => {
    setGameStatus('DONE');
    setResult({ score });
  };

  const switchDisplay = (status: string) => {
    switch (status) {
      case 'BEFORE':
        return <Button onClick={startGame}>Start a new game</Button>;
      case 'WAITING':
        return <p>Retrieving that questions !</p>;
      case 'PLAY':
        return <Play quizz={dummyQuizz} onQuizzEnd={onQuizzEnd} />;
      case 'DONE':
        return <p>{result ? `Well Played ! Your score is ${result.score} !` : 'Well Played !'}</p>;
      default:
        return <></>;
    }
  };
  return (
    <div className="w-100 h-100 pl-4 pr-4">
      <p>Lets play !</p>
      <DotaLoader show={false} />
      {switchDisplay(gameStatus)}
    </div>
  );
};

enum ButtonStatus {
  'default',
  'danger',
  'secondary',
  'success'
}

const Play: React.FC<PlayProps> = ({ quizz, onQuizzEnd }) => {
  const questionNumber = quizz.length;
  const [cursor, setCursor] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizzQuestion>(
    quizz[0]
  );
  const [score, setScore] = useState<number>(0);
  const [statusMap, setStatusMap] = useState<ButtonStatus[]>((new Array(quizz[0].answers.length)).fill('default'));
  const generateStatusMap = (input: number, answersNumber: number, correct: number) => {
    const res = (new Array(answersNumber)).fill('secondary');
    res[input] = 'danger';
    res[correct] = 'success';
    return res;
  };
  const validateAnswer = useCallback(
    (index: number) => () => {
      console.log(
        'Answer',
        index,
        index === currentQuestion.correct ? 'is the right one' : 'is wrong'
      );
      if (index === currentQuestion.correct) {
        setScore(score + 1);
      }
      setStatusMap(generateStatusMap(index, currentQuestion.answers.length, currentQuestion.correct));
      setTimeout(() => {
        if (cursor < questionNumber) {
          setCurrentQuestion(quizz[cursor + 1]);
          setCursor(cursor + 1);
        } else {
          onQuizzEnd(score);
        }
      }, 2000);
    },
    [currentQuestion, cursor]
  );
  return (
    <div>
      <Row>
        <Col>{currentQuestion.question}</Col>
      </Row>
      <Row>
        {currentQuestion.answers.map((answer, index) => (
          <Col>
            <AnswerButton handlePress={validateAnswer(index)} answer={answer} status={statusMap[index]} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

interface AnswerButtonProps {
  answer: string;
  handlePress: () => void;
  status?: ButtonStatus;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  answer,
  handlePress,
  status = 'default'
}) => {
  return (
    <Button className={`bg-${status}`} onClick={handlePress}>
      {answer}
    </Button>
  );
};
