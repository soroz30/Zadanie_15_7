'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pad0 = function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
};

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(props) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

		_this.reset = function () {
			_this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		};

		_this.format = function () {
			var minutes = _this.state.times.minutes;
			var seconds = _this.state.times.seconds;
			var miliseconds = _this.state.times.miliseconds;
			return pad0(minutes) + ':' + pad0(seconds) + ':' + pad0(Math.floor(miliseconds));
		};

		_this.start = function () {
			if (!_this.state.running) {
				_this.state.running = true;
				_this.watch = setInterval(function () {
					return _this.step();
				}, 10);
			}
		};

		_this.step = function () {
			if (!_this.state.running) return;
			_this.calculate();
		};

		_this.calculate = function () {
			_this.setState({
				times: {
					minutes: _this.state.times.minutes,
					seconds: _this.state.times.seconds,
					miliseconds: _this.state.times.miliseconds + 1
				}
			});
			if (_this.state.times.miliseconds >= 100) {
				_this.setState({
					times: {
						minutes: _this.state.times.minutes,
						seconds: _this.state.times.seconds + 1,
						miliseconds: 0
					}
				});
			};
			if (_this.state.seconds >= 60) {
				_this.setState({
					times: {
						minutes: _this.state.times.minutes + 1,
						seconds: 0,
						miliseconds: _this.state.times.miliseconds
					}
				});
			};
		};

		_this.stop = function () {
			_this.state.running = false;
			clearInterval(_this.watch);
		};

		_this.resetStopwatch = function () {
			_this.stop();
			_this.reset();
		};

		_this.addTime = function () {
			var newRecord = {
				id: _this.state.history.length,
				record: _this.format()
			};
			_this.setState({ history: [].concat(_toConsumableArray(_this.state.history), [newRecord]) });
		};

		_this.clearHistory = function () {
			_this.setState({ history: [] });
		};

		_this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			history: []
		};
		return _this;
	}

	_createClass(Stopwatch, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				null,
				React.createElement(
					'nav',
					{ className: 'controls' },
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: function onClick() {
								return _this2.start();
							} },
						'Start'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: function onClick() {
								return _this2.stop();
							} },
						'Stop'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: function onClick() {
								return _this2.reset();
							} },
						'Reset'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: function onClick() {
								return _this2.addTime();
							} },
						'Add Time'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: function onClick() {
								return _this2.clearHistory();
							} },
						'Clear Time List'
					)
				),
				React.createElement(Display, { time: this.format() }),
				React.createElement(Results, { history: this.state.history })
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

;

var Display = function (_React$Component2) {
	_inherits(Display, _React$Component2);

	function Display(props) {
		_classCallCheck(this, Display);

		return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
	}

	_createClass(Display, [{
		key: 'render',
		value: function render() {
			return React.createElement('div', { className: 'stopwatch' }, this.props.time);
		}
	}]);

	return Display;
}(React.Component);

Display.propTypes = {
	time: React.PropTypes.string.isRequired
};

var Results = function (_React$Component3) {
	_inherits(Results, _React$Component3);

	function Results(props) {
		_classCallCheck(this, Results);

		return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
	}

	_createClass(Results, [{
		key: 'render',
		value: function render() {
			var results = this.props.history.map(function (ele) {
				return React.createElement('li', { key: ele.id }, ele.record);
			});
			return React.createElement('ul', { className: 'results' }, results);
		}
	}]);

	return Results;
}(React.Component);

Results.propTypes = {
	history: React.PropTypes.array.isRequired
};


var stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById('stopwatch'));
