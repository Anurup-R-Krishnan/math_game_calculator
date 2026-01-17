import React, { useState, useEffect } from 'react';

function App() {
  const [mode, setMode] = useState('calculator'); // 'calculator' or 'game'
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);
  
  // Game state
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const generateQuestion = () => {
    const operations = ['+', '-', '×'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer;
    
    if (difficulty === 'easy') {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
    } else if (difficulty === 'medium') {
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
    } else {
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 100) + 1;
    }
    
    switch (op) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        if (num2 > num1) [num1, num2] = [num2, num1];
        answer = num1 - num2;
        break;
      case '×':
        if (difficulty === 'easy') {
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = Math.floor(Math.random() * 10) + 1;
        }
        answer = num1 * num2;
        break;
      default:
        answer = 0;
    }
    
    setQuestion({ num1, num2, op, answer });
    setUserAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    if (mode === 'game' && !question) {
      generateQuestion();
    }
  }, [mode, question]);

  const handleSubmitAnswer = () => {
    const answer = parseInt(userAnswer);
    setAttempts(attempts + 1);
    
    if (answer === question.answer) {
      setScore(score + 1);
      setFeedback('🎉 Correct! Well done!');
      setTimeout(() => generateQuestion(), 1500);
    } else {
      setFeedback(`❌ Not quite! The answer is ${question.answer}`);
      setTimeout(() => generateQuestion(), 2500);
    }
  };

  // Calculator functions
  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '×': return prev * current;
      case '÷': return current !== 0 ? prev / current : 'Error';
      default: return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const CalcButton = ({ value, onClick, color = '#fff', textColor = '#333' }) => (
    <button
      onClick={onClick}
      style={{
        padding: '18px',
        fontSize: '20px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '12px',
        background: color,
        color: textColor,
        cursor: 'pointer',
        transition: 'transform 0.1s',
        boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
      }}
      onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
      onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
    >
      {value}
    </button>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      padding: '20px',
      fontFamily: 'Comic Sans MS, Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '25px',
        padding: '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#ff6b9d',
          marginBottom: '20px',
          fontSize: '32px'
        }}>
          🧮 Fun Math Zone! 🎮
        </h1>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '25px'
        }}>
          <button
            onClick={() => setMode('calculator')}
            style={{
              flex: 1,
              padding: '15px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '12px',
              background: mode === 'calculator' ? '#667eea' : '#e0e0e0',
              color: mode === 'calculator' ? 'white' : '#666',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🧮 Calculator
          </button>
          <button
            onClick={() => setMode('game')}
            style={{
              flex: 1,
              padding: '15px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '12px',
              background: mode === 'game' ? '#51cf66' : '#e0e0e0',
              color: mode === 'game' ? 'white' : '#666',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            🎮 Math Game
          </button>
        </div>

        {mode === 'calculator' ? (
          <>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '20px',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {display}
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px'
            }}>
              <CalcButton value="C" onClick={handleClear} color="#ff6b6b" textColor="white" />
              <CalcButton value="÷" onClick={() => handleOperation('÷')} color="#ffa502" textColor="white" />
              <CalcButton value="×" onClick={() => handleOperation('×')} color="#ffa502" textColor="white" />
              <CalcButton value="-" onClick={() => handleOperation('-')} color="#ffa502" textColor="white" />

              <CalcButton value="7" onClick={() => handleNumber('7')} />
              <CalcButton value="8" onClick={() => handleNumber('8')} />
              <CalcButton value="9" onClick={() => handleNumber('9')} />
              <CalcButton value="+" onClick={() => handleOperation('+')} color="#ffa502" textColor="white" />

              <CalcButton value="4" onClick={() => handleNumber('4')} />
              <CalcButton value="5" onClick={() => handleNumber('5')} />
              <CalcButton value="6" onClick={() => handleNumber('6')} />
              <CalcButton value="=" onClick={handleEquals} color="#51cf66" textColor="white" />

              <CalcButton value="1" onClick={() => handleNumber('1')} />
              <CalcButton value="2" onClick={() => handleNumber('2')} />
              <CalcButton value="3" onClick={() => handleNumber('3')} />
              <CalcButton value="0" onClick={() => handleNumber('0')} />
            </div>
          </>
        ) : (
          <>
            <div style={{
              background: '#f8f9fa',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
                Score: {score} / {attempts} {attempts > 0 && `(${Math.round(score/attempts*100)}%)`}
              </div>
              
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  generateQuestion();
                }}
                style={{
                  padding: '8px 15px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: '2px solid #ddd'
                }}
              >
                <option value="easy">Easy (1-10)</option>
                <option value="medium">Medium (1-50)</option>
                <option value="hard">Hard (1-100)</option>
              </select>
            </div>

            {question && (
              <div style={{
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                borderRadius: '20px',
                padding: '40px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  {question.num1} {question.op} {question.num2} = ?
                </div>

                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && userAnswer && handleSubmitAnswer()}
                  placeholder="Your answer"
                  style={{
                    width: '200px',
                    padding: '15px',
                    fontSize: '24px',
                    textAlign: 'center',
                    border: '3px solid #667eea',
                    borderRadius: '12px',
                    marginBottom: '15px'
                  }}
                />

                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer}
                  style={{
                    display: 'block',
                    width: '200px',
                    margin: '0 auto',
                    padding: '15px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'white',
                    background: userAnswer ? '#51cf66' : '#ccc',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: userAnswer ? 'pointer' : 'not-allowed',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => userAnswer && (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Submit Answer
                </button>

                {feedback && (
                  <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    background: feedback.includes('Correct') ? '#d3f9d8' : '#ffe3e3',
                    borderRadius: '10px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: feedback.includes('Correct') ? '#2f9e44' : '#c92a2a'
                  }}>
                    {feedback}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={generateQuestion}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                background: '#667eea',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              🔄 New Question
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;