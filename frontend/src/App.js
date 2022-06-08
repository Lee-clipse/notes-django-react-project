import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'

function App() {
	return (
		<div className="App">
			{/* from components/Header.js */}
			<Header/>

			{/* from pages/NotesListPage.js */}
			<NotesListPage/>
		</div>
	);
}

export default App;
