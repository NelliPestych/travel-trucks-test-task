import Header from './components/Header/Header.jsx';
import AppRouter from './routes/AppRouter';

function App() {
    return (
        <>
            <Header/>
            <main>
                <AppRouter/>
            </main>
        </>
    );
}

export default App;
