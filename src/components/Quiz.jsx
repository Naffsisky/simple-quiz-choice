import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTimer } from 'react-timer-hook'

import { quiz as quizData } from './fakeData'

function Quiz() {
	const [quiz, setQuiz] = useState(quizData)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [score, setScore] = useState({
		correct: 0,
		false: 0,
	})

	const { header, question, options } = quiz[currentIndex]

	const timer = 10 * 60
	const time = new Date()
	time.setSeconds(time.getSeconds() + timer)

	const { seconds, minutes, hours } = useTimer({
		expiryTimestamp: time,
		onExpire: () => setCurrentIndex(quiz.length - 1),
	})

	useEffect(() => {
		handleScore()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quiz])

	const handleScore = () => {
		const questionAnswered = quiz.filter((item) => item.selected)
		const questionCorrect = questionAnswered.filter((item) =>
			item.options.find((option) => option.correct && option.selected === option.correct)
		)
		setScore({
			correct: questionCorrect.length,
			false: quiz.length - questionCorrect.length,
		})
	}

	const nextQuestion = () => {
		if (quiz.length - 1 === currentIndex) return
		setCurrentIndex(currentIndex + 1)
	}

	const previousQuestion = () => {
		if (currentIndex === 0) return
		setCurrentIndex(currentIndex - 1)
	}

	const handleSelectOption = (indexSelected, indexOptionSelected) => {
		setQuiz(
			quiz.map((item, index) =>
				index === indexSelected
					? {
							...item,
							selected: true,
							options: options.map((item, index) =>
								index === indexOptionSelected
									? { ...item, selected: true }
									: { ...item, selected: false }
							),
					  }
					: item
			)
		)
	}

	return (
		<React.Fragment>
			<h2 className='mt-5 mb-5 text-center'>
				Silahkan Kerjakan dalam waktu : {hours}:{minutes}:{seconds}
			</h2>
			<div className='card mb-3'>
				<div class='card-header'>Jumlah Soal</div>
				<div
					className='card-body'
					style={{ display: 'flex', padding: 10, flexWrap: 'wrap' }}
				>
					{quiz.map((item, index) => (
						<div
							key={index}
							className='d-flex justify-content-center align-items-center border border-primary font-weight-bold'
							style={{
								height: 40,
								width: 40,
								marginRight: 5,
								marginBottom: 5,
								borderRadius: 5,
								cursor: 'pointer',
								backgroundColor:
									index === currentIndex
										? 'greenyellow '
										: item?.selected
										? 'grey'
										: 'transparent',
							}}
							onClick={() => setCurrentIndex(index)}
						>
							{index + 1}
						</div>
					))}
				</div>
			</div>
			<div className='card '>
				<div className='card-header bg-white font-weight-bold' style={{ fontSize: 20 }}>
					{currentIndex + 1}. {header}
				</div>
				<div className='card-body'>
					<p>{question}</p>

					{options.map((item, index) => (
						<div
							className='d-flex align-items-center'
							style={{ justifyItems: 'center', fontSize: 18 }}
							key={index}
						>
							<p></p>
							<div
								style={{
									height: 20,
									width: 20,
									borderRadius: 100,
									backgroundColor: item?.selected ? 'greenyellow' : 'grey',
									cursor: 'pointer',
									marginRight: 5,
								}}
								onClick={() => handleSelectOption(currentIndex, index)}
							/>
							{item.title}
						</div>
					))}
				</div>
			</div>
			<div className='d-flex justify-content-between' style={{ paddingTop: 10 }}>
				<button
					className='btn btn-info col-sm-2'
					onClick={() => previousQuestion()}
					disabled={currentIndex === 0 ? true : false}
				>
					Previous
				</button>
				{quiz.length - 1 === currentIndex ? (
					<Link
						className='btn btn-success col-sm-2'
						to={{ pathname: '/summary', state: { quiz, score } }}
					>
						Finish
					</Link>
				) : (
					<button className='btn btn-primary col-sm-2' onClick={() => nextQuestion()}>
						Next
					</button>
				)}
			</div>
		</React.Fragment>
	)
}

export default Quiz
