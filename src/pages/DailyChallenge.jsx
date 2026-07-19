import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { io } from 'socket.io-client'
import PageTransition from '../components/PageTransition'
import '../styles/daily-challenge.css'

/* Configuration — same backend as the vanilla site */
const BACKEND_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '')
  ? 'http://localhost:3010'
  : 'https://protocol-backend-idxa.onrender.com'

/* Helper for seamless server wake-up (Retries if Render is sleeping/502s) */
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      if (response.ok || response.status === 500 || (response.status < 500 && response.status >= 400)) {
        return response
      }
      if (i === retries - 1) return response
    } catch (err) {
      if (i === retries - 1) throw err
    }
    await new Promise(res => setTimeout(res, backoff))
  }
}

const FALLBACK_QUESTIONS = [
  { id: 1, question_text: 'What does HTML stand for?', option_a: 'Hyper Text Markup Language', option_b: 'High Tech Modern Language', option_c: 'Hyper Transfer Markup Language', option_d: 'None of the above' },
  { id: 2, question_text: 'Which programming language is known as the backbone of web development?', option_a: 'Python', option_b: 'C++', option_c: 'JavaScript', option_d: 'Java' },
  { id: 3, question_text: 'What does CSS stand for?', option_a: 'Computer Style Sheets', option_b: 'Cascading Style Sheets', option_c: 'Creative Style Sheets', option_d: 'Colorful Style Sheets' },
  { id: 4, question_text: 'Which protocol is used to secure data transfer on the web?', option_a: 'HTTP', option_b: 'FTP', option_c: 'HTTPS', option_d: 'SMTP' },
  { id: 5, question_text: 'What does API stand for?', option_a: 'Application Programming Interface', option_b: 'Advanced Programming Interface', option_c: 'Application Process Integration', option_d: 'Automated Programming Interface' },
  { id: 6, question_text: 'What is the main function of a DNS?', option_a: 'Storing web pages', option_b: 'Translating domain names to IP addresses', option_c: 'Securing web connections', option_d: 'Routing physical data' },
  { id: 7, question_text: 'Which language is used for structuring web pages?', option_a: 'CSS', option_b: 'Python', option_c: 'HTML', option_d: 'JavaScript' },
  { id: 8, question_text: 'What does SQL stand for?', option_a: 'Standard Query Language', option_b: 'Structured Query Language', option_c: 'Simple Query Language', option_d: 'System Query Language' },
  { id: 9, question_text: 'Which HTML tag is used to define an internal style sheet?', option_a: '<script>', option_b: '<css>', option_c: '<style>', option_d: '<link>' },
  { id: 10, question_text: 'Which of the following is NOT a JavaScript framework/library?', option_a: 'React', option_b: 'Angular', option_c: 'Vue', option_d: 'Django' },
]

const FALLBACK_ANSWERS = { 1: 'A', 2: 'C', 3: 'B', 4: 'C', 5: 'A', 6: 'B', 7: 'C', 8: 'B', 9: 'C', 10: 'D' }
const FALLBACK_EXPLANATIONS = {
  1: 'HTML stands for Hyper Text Markup Language.',
  2: 'JavaScript is the backbone of dynamic web development.',
  3: 'CSS stands for Cascading Style Sheets.',
  4: 'HTTPS secures data transfer over the web.',
  5: 'API stands for Application Programming Interface.',
  6: 'DNS translates human-readable domain names to IP addresses.',
  7: 'HTML provides the basic structure of sites.',
  8: 'SQL stands for Structured Query Language.',
  9: 'The <style> tag defines internal CSS.',
  10: 'Django is a Python framework, not JavaScript.',
}

export default function DailyChallenge() {
  const [view, setView] = useState('username') // username | quiz | results | loading
  const [username, setUsername] = useState(() => localStorage.getItem('daily_quiz_username') || '')
  const [error, setError] = useState('')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({}) // { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [correctAnswers, setCorrectAnswers] = useState(null)
  const [explanations, setExplanations] = useState(null)
  const [score, setScore] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const socketRef = useRef(null)
  const currentUserRef = useRef(null)

  useEffect(() => {
    // Non-blocking background warm-up
    fetchWithRetry(`${BACKEND_URL}/api/health`).catch(() => {})

    const socket = io(BACKEND_URL)
    socketRef.current = socket
    socket.on('leaderboard_update', lb => setLeaderboard(lb))
    return () => socket.disconnect()
  }, [])

  async function loadLeaderboard() {
    try {
      const res = await fetchWithRetry(`${BACKEND_URL}/api/leaderboard`)
      const data = await res.json()
      setLeaderboard(data.leaderboard || [])
    } catch {
      /* leaderboard unavailable offline */
    }
  }

  async function startQuiz() {
    const name = username.trim()
    if (!name) {
      setError('Please enter a username')
      return
    }
    setError('')
    setView('loading')
    currentUserRef.current = name
    localStorage.setItem('daily_quiz_username', name)

    try {
      const statusRes = await fetchWithRetry(`${BACKEND_URL}/api/daily-status?username=${encodeURIComponent(name)}`)
      if (!statusRes.ok) {
        const errData = await statusRes.json().catch(() => ({}))
        throw new Error(errData.error || `Server error: ${statusRes.status}`)
      }
      const status = await statusRes.json()

      if (status.played) {
        await loadLeaderboard()
        setSubmitted(true)
        setScore(null)
        setView('results')
      } else {
        const questionsRes = await fetchWithRetry(`${BACKEND_URL}/api/questions?username=${encodeURIComponent(name)}`)
        if (!questionsRes.ok) {
          const errData = await questionsRes.json().catch(() => ({}))
          throw new Error(errData.error || 'Failed to load questions')
        }
        const qData = await questionsRes.json()
        setQuestions(qData.questions)
        setView('quiz')
      }
    } catch (e) {
      console.warn('Backend unavailable, starting offline fallback mode...', e)
      setQuestions(FALLBACK_QUESTIONS)
      setView('quiz')
    }
  }

  async function submitQuiz() {
    const answered = Object.keys(answers).length
    if (answered < questions.length) {
      if (!confirm("You haven't answered all questions. Submit anyway?")) return
    }

    const payload = Object.entries(answers).map(([qid, sel]) => ({ questionId: Number(qid), selected: sel }))

    try {
      const res = await fetchWithRetry(`${BACKEND_URL}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUserRef.current, answers: payload }),
      })
      const result = await res.json()

      if (res.status === 403) {
        alert(result.error || 'You have already played today!')
        await loadLeaderboard()
        setSubmitted(true)
        setView('results')
      } else if (!res.ok || result.error) {
        throw new Error(result.error || 'Server error: ' + res.status)
      } else {
        setCorrectAnswers(result.correctAnswers)
        setExplanations(result.explanations || null)
        setScore(result.score)
        setLeaderboard(result.leaderboard || [])
        setSubmitted(true)
      }
    } catch (e) {
      console.warn('Fallback submit mode', e)
      let offlineScore = 0
      for (const [qid, sel] of Object.entries(answers)) {
        if (FALLBACK_ANSWERS[qid] === sel) offlineScore++
      }
      setCorrectAnswers(FALLBACK_ANSWERS)
      setExplanations(FALLBACK_EXPLANATIONS)
      setScore(offlineScore)
      setLeaderboard([
        { username: 'Protocol_Bot', score: 9 },
        { username: currentUserRef.current, score: offlineScore },
        { username: 'Guest_User', score: 5 },
      ])
      setSubmitted(true)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const optionKeys = ['a', 'b', 'c', 'd']

  return (
    <PageTransition>
      <main className="quiz-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <motion.div
                className="quiz-box"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.21, 0.6, 0.35, 1] }}
              >
                <h1 className="quiz-title quiz-title-react">Daily Challenge</h1>

                <AnimatePresence mode="wait">
                  {/* SECTION 1: USERNAME INPUT */}
                  {view === 'username' && (
                    <motion.div
                      key="username"
                      className="text-center"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                    >
                      <p className="mb-4">Enter your username to begin today's challenge.</p>
                      <div className="d-flex justify-content-center gap-2">
                        <input
                          type="text"
                          className="form-control w-50"
                          placeholder="Username"
                          maxLength={20}
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && startQuiz()}
                        />
                        <button className="btn btn-pill btn-light-fill" onClick={startQuiz}>Start Quiz</button>
                      </div>
                      {error && <p className="text-danger mt-3">{error}</p>}
                    </motion.div>
                  )}

                  {/* LOADING SPINNER */}
                  {view === 'loading' && (
                    <motion.div
                      key="loading"
                      className="text-center py-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="text-info small mt-3">
                        Waking up server (this may take up to 2 minutes if it's the first visit of the day)...
                      </p>
                    </motion.div>
                  )}

                  {/* SECTION 2: QUIZ */}
                  {view === 'quiz' && (
                    <motion.div
                      key="quiz"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {(submitted && score !== null) && (
                        <div className="alert alert-dark text-center mb-4">
                          You scored: <strong style={{ color: 'var(--muted-pink)', fontSize: '1.5rem' }}>{score}</strong> / 10
                        </div>
                      )}

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                      >
                        {questions.map((q, index) => (
                          <motion.div
                            className="question-card"
                            key={q.id}
                            variants={{
                              hidden: { opacity: 0, y: 24 },
                              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                            }}
                          >
                            <div className="mb-3">
                              <h5 className="condensed text-white">Q{index + 1}. {q.question_text}</h5>
                            </div>
                            <div className="options-group">
                              {optionKeys.map(k => {
                                const letter = k.toUpperCase()
                                const isSelected = answers[q.id] === letter
                                const revealed = submitted && correctAnswers
                                const isCorrect = revealed && correctAnswers[q.id] === letter
                                const isWrongPick = revealed && isSelected && correctAnswers[q.id] !== letter
                                return (
                                  <label
                                    key={k}
                                    className={`option-label ${isCorrect ? 'correct' : ''} ${isWrongPick ? 'incorrect' : ''} ${isSelected && !revealed ? 'selected' : ''}`}
                                    style={isCorrect ? { fontWeight: 'bold' } : undefined}
                                  >
                                    <input
                                      type="radio"
                                      name={`q${q.id}`}
                                      value={letter}
                                      checked={isSelected}
                                      disabled={submitted}
                                      onChange={() => setAnswers(a => ({ ...a, [q.id]: letter }))}
                                    />
                                    {letter}. {q[`option_${k}`]}
                                  </label>
                                )
                              })}
                              {submitted && explanations && explanations[q.id] && (
                                <div className="explanation-text mt-2 text-white" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                  <strong>Explanation:</strong> {explanations[q.id]}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {!submitted && (
                        <div className="mt-4 text-center">
                          <button className="btn btn-pill btn-light-fill px-5" onClick={submitQuiz}>Submit Answers</button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SECTION 3: LEADERBOARD / RESULTS */}
                {(view === 'results' || submitted) && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <h3 className="text-center condensed mb-3 mt-4">Today's Leaderboard</h3>

                    <div className="table-responsive">
                      <table className="table leaderboard-table text-center">
                        <thead>
                          <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.map((entry, idx) => {
                            const rank = idx + 1
                            const rankClass = rank <= 3 ? `rank-${rank}` : ''
                            return (
                              <tr key={entry.username + idx}>
                                <td className={rankClass}>{rank}</td>
                                <td>{entry.username} {entry.username === currentUserRef.current ? '(You)' : ''}</td>
                                <td>{entry.score}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-center mt-4">
                      <p className="mt-4 daily-footer-msg" style={{ fontFamily: "'Josefin Sans'", fontSize: '0.9rem' }}>
                        Come back tomorrow for new questions!
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
