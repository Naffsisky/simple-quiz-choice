import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function SummaryQuiz({ location }) {
	const history = useHistory()

	useEffect(() => {
		if (!location.state) history.push('/')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return !location.state ? (
		<h1>403 - Forbidden</h1>
	) : (
		<div className='mt-3'>
			<h1
				className='d-flex justify-content-center'
				style={{ flexDirection: 'row', marginBottom: 10 }}
			>
				Anda Berhasil Menjawab Benar:{' '}
				<div className='text-success'>{location.state.score.correct}</div>{' '}
			</h1>
			{location.state.quiz.map((item, index) => (
				<div className='card mb-3' key={index}>
					<div className='card-header bg-white'>
						<div className='font-weight-bold'>
							{index + 1}. {item.question}
						</div>
					</div>
					<div className='card-body'>
						{item.options.map((item, index) => (
							<div
								className='d-flex'
								style={{ justifyItems: 'center', fontSize: 18 }}
								key={index}
							>
								<div
									style={{
										height: 20,
										width: 20,
										borderRadius: 100,
										backgroundColor: item?.selected ? 'greenyellow' : 'grey',
										cursor: 'pointer',
										marginRight: 5,
									}}
								/>
								{item.title}
							</div>
						))}
					</div>
					<div className='card-footer bg-white'>
						{item.options.find(
							(option) => option.correct && option.selected === option.correct
						) ? (
							<div className='text-success'>
								Jawabanmu: {item.options.find((item) => item.correct).title}
							</div>
						) : (
							<>
								<div className='text-danger'>
									Jawabanmu :{' '}
									{item.options.find((item) => item.selected)?.title ??
										'Kamu Tidak Menjawab Pertanyaan Ini!'}
								</div>
								<div className='text-success'>
									Jawaban Benar : {item.options.find((item) => item.correct).title}
								</div>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	)
}

export default SummaryQuiz
