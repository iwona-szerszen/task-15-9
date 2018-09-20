class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchText: '',
			users: []
		};
	}
	onChangeHandle(event) {
		this.setState({
			searchText: event.target.value
		});
	}
	onSubmit(event) {
		event.preventDefault();
		const {searchText} = this.state;
		const url = `https://api.github.com/search/users?q=${searchText}`;
		fetch(url)
			.then(response => response.json())
			.then(responseJson => this.setState({
				users: responseJson.items
			}));
	}
	render() {
		return (
			<div>
				<h1>Welcome to GitHub Users Search Engine</h1>
				<form onSubmit={event => this.onSubmit(event)}>
					<label htmlFor="searchText">Search by user name</label>
					<input
						type="text"
						id="searchText"
						onChange={event => this.onChangeHandle(event)}
						value={this.state.searchText}
					/>
				</form>
				<UsersList users={this.state.users} />
			</div>
		);
	}
}

class UsersList extends React.Component {
	get users() {
		return this.props.users.map(user => <User key={user.id} user={user} />);
	}
	render() {
		if (this.users.length == 0) {
			return <div>{this.users}</div>
		} else {
			return (
				<div>
					<div className="results-number">{this.users.length} results found</div>
					<div>{this.users}</div>
				</div>
			);
		}
	}
}

class User extends React.Component {
	render() {
		return (
			<div className="user">
				<img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
				<div className="login"><a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a></div>
				<div className="score">score: {this.props.user.score.toFixed(2)}</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));