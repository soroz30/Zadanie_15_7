let pad0 = (value) => {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
};

class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			history: []
		};
	}

	reset = () => {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	format = () => {
		let minutes = this.state.times.minutes;
        let seconds = this.state.times.seconds;
        let miliseconds = this.state.times.miliseconds;
		return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
	}

	start = () => {
		if (!this.state.running) {
			this.state.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step = () => {
		if (!this.state.running) return;
		this.calculate();
	}

	calculate = () => {
		this.setState({ 
			times: {
				minutes: this.state.times.minutes,
				seconds: this.state.times.seconds,
				miliseconds: this.state.times.miliseconds + 1
			}
		});
		if (this.state.times.miliseconds >= 100) {
			this.setState({
				times: {
					minutes: this.state.times.minutes,
					seconds: this.state.times.seconds + 1,
					miliseconds: 0
				}
			});
		};
		if (this.state.seconds >= 60) {
			this.setState({
				times: {
					minutes: this.state.times.minutes + 1,
					seconds: 0,
					miliseconds: this.state.times.miliseconds
				}
			});
		};
	}

	stop = () => {
		this.state.running = false;
		clearInterval(this.watch);
	}

	resetStopwatch = () => {
		this.stop();
		this.reset();
	}

	addTime = () => {
		let newRecord = {
			id: this.state.history.length,
			record: this.format()
		};
		this.setState({ history: [...this.state.history, newRecord]});
	}

	clearHistory = () => {
		this.setState({ history: [] });
	}

	render() {
		return (
				<div>
					<nav className="controls">
						<a href='#' className='button' onClick={() => this.start()}>Start</a>
						<a href='#' className='button' onClick={() => this.stop()}>Stop</a>
						<a href='#' className='button' onClick={() => this.reset()}>Reset</a>
						<a href='#' className='button' onClick={() => this.addTime()}>Add Time</a>
						<a href='#' className='button' onClick={() => this.clearHistory()}>Clear Time List</a>
					</nav>
					<Display time={this.format()} />
					<Results history={this.state.history} />
				</div>
		)
	}
};

class Display extends React.Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		time: React.PropTypes.string.isRequired
	}

	render() {
		return (
			React.createElement('div', {className: 'stopwatch'}, this.props.time)
		)
	}
}

class Results extends React.Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		history: React.PropTypes.array.isRequired
	}

	render() {
		let results = this.props.history.map( ele  => { 
					      return React.createElement('li', {key: ele.id}, ele.record)
					  })
		return (
			React.createElement('ul', {className: 'results'}, results)
		)
	}
}

let stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById('stopwatch'));