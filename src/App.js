import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Quiz from './components/Quiz'
import SummaryQuiz from './components/SummaryQuiz'

function App() {
	return (
		<Router>
			<div className='container'>
				<Switch>
					<Route exact path='/' component={Quiz} />
					<Route exact path='/summary' component={SummaryQuiz} />
				</Switch>
			</div>
		</Router>
	)
}

export default App
