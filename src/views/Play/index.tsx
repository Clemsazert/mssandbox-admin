import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { GET_QUIZZ } from './graphql';
import { DotaLoader } from '../../components/Loaders';

type QuizzQuestion = {
  question: string;
  answers: string[];
  type: string;
  correct: number;
};

interface PlayProps {
  quizz: QuizzQuestion[];
  onQuizzEnd: (score: number) => void;
}

type Result = {
  score: number;
};

export const PlayTab: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<string>('BEFORE');
  const [result, setResult] = useState<Result | null>(null);
  const [getQuizz, { data, loading }] = useLazyQuery(GET_QUIZZ);
  useEffect(() => {
    if (data && gameStatus !== 'DONE') {
      setGameStatus('PLAY');
    }
  }, [data]);
  const startGame = () => {
    getQuizz();
  };
  const onQuizzEnd = (score: number) => {
    setGameStatus('DONE');
    setResult({ score });
  };

  const startNewGame = () => {
    setGameStatus('BEFORE');
    setResult(null);
    startGame();
  };

  const switchGameStatus = (status: string) => {
    switch (status) {
      case 'BEFORE':
        return <Button onClick={startGame}>Start a new game</Button>;
      case 'PLAY':
        if (data) {
          return <Play quizz={data.generateQuizz} onQuizzEnd={onQuizzEnd} />;
        }
        return <></>;
      case 'DONE':
        return (
          <div>
            <p>
              {result
                ? `Well Played ! Your score is ${result.score} !`
                : 'Well Played !'}
            </p>
            <Button onClick={startNewGame}>Play again</Button>
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <div className="w-100 h-100 pl-4 pr-4">
      <DotaLoader show={loading} />
      <p>{'Let\'s Play !'}</p>
      {switchGameStatus(gameStatus)}
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
  const [statusMap, setStatusMap] = useState<ButtonStatus[]>(
    new Array(quizz[0].answers.length).fill('default')
  );
  const generateStatusMap = (
    input: number,
    answersNumber: number,
    correct: number
  ) => {
    const res = new Array(answersNumber).fill('secondary');
    res[input] = 'danger';
    res[correct] = 'success';
    return res;
  };
  const validateAnswer = (index: number) => () => {
    let newScore = score;
    if (index === currentQuestion.correct) {
      newScore += 1;
      setScore(newScore);
    }
    setStatusMap(
      generateStatusMap(
        index,
        currentQuestion.answers.length,
        currentQuestion.correct
      )
    );
    setTimeout(() => {
      if (cursor < questionNumber - 1) {
        setCurrentQuestion(quizz[cursor + 1]);
        setCursor(cursor + 1);
        setStatusMap(new Array(quizz[0].answers.length).fill('default'));
      } else {
        onQuizzEnd(newScore);
      }
    }, 2000);
  };

  return (
    <div>
      <Row>
        <Col>
          <p>
            Question {cursor + 1}/{questionNumber} :
          </p>
          <p>{currentQuestion.question}</p>
        </Col>
      </Row>
      <Row>
        {currentQuestion.answers.map((answer, index) => (
          <Col>
            <AnswerButton
              handlePress={validateAnswer(index)}
              answer={answer}
              status={statusMap[index]}
            />
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
}) => (
  <Button className={`bg-${status}`} onClick={handlePress}>
    {answer}
  </Button>
);
