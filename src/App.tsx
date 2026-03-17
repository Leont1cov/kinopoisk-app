import { useEffect } from 'react';
import { movieService } from "./api/movieService.ts";

function App() {
    useEffect(() => {
        const testApi = async () => {
            try {
                console.log('Пробуем получить данные...');
                const data = await movieService.getMovies();
                console.log('Данные пришли:', data);
            } catch (error) {
                console.error('ОШИБКА ЗАПРОСА:', error);
            }
        };

        testApi();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Тест API Кинопоиска</h1>
            <p>Открой консоль браузера (F12), чтобы увидеть данные.</p>
        </div>
    );
}

export default App;
