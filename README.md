# Smart-Dashboard
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ved's Buckeye Command Center</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --osu-scarlet: #BA0C2F;
            --osu-gray: #A7B1B7;
            --text-dark: #2d2926;
            --glass-bg: rgba(255, 255, 255, 0.88);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), 
                        url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Ohio_Stadium_Overhead.jpg') no-repeat center center fixed;
            background-size: cover;
            min-height: 100vh;
            padding: 30px;
            color: white;
            overflow-x: hidden;
        }

        /* --- Rival Entry Overlay --- */
        #overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.96); backdrop-filter: blur(30px);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999; transition: opacity 0.8s ease;
        }
        .rival-container { position: relative; cursor: pointer; text-align: center; width: 350px; }
        .rival-img { width: 100%; height: auto; }
        #red-x {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0);
            font-size: 500px; color: var(--osu-scarlet); pointer-events: none;
            transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            opacity: 0.98; z-index: 10000; text-shadow: 0 0 50px rgba(0,0,0,1);
        }
        .ttun-text { margin-top: 40px; font-weight: 900; color: white; letter-spacing: 4px; text-transform: uppercase; font-size: 1.2em; }

        /* --- Dashboard Layout --- */
        .container { max-width: 1400px; margin: 0 auto; }
        header { margin-bottom: 25px; text-shadow: 2px 2px 12px rgba(0,0,0,0.9); }
        h1 { font-size: 2.8em; font-weight: 800; }
        .time-main { font-size: 1.3em; opacity: 0.9; }

        .dashboard {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 
                "weather quote"
                "todo playbook"
                "news news";
            gap: 20px;
        }

        .card {
            background: var(--glass-bg); backdrop-filter: blur(10px);
            border-radius: 20px; padding: 22px; color: var(--text-dark);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.25);
            display: flex; flex-direction: column;
            min-height: 230px;
        }

        .card h2 { 
            font-size: 1em; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; 
            color: var(--osu-scarlet); text-transform: uppercase; font-weight: 800;
        }

        /* Weather List */
        .weather-card { grid-area: weather; }
        .city-row { 
            display: grid; grid-template-columns: 1.2fr 1fr 60px; 
            padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.06); 
            font-weight: 600; font-size: 0.95em;
        }
        .city-time { color: #666; font-weight: 400; text-align: right; padding-right: 15px; }
        .city-temp { color: var(--osu-scarlet); font-weight: 800; text-align: right; }
        
        /* Quote Area */
        .quote-card { grid-area: quote; justify-content: center; }
        #quote-widget { font-style: italic; line-height: 1.5; color: #333; font-size: 1.1em; text-align: center; }

        /* Playbook */
        .playbook-card { grid-area: playbook; }
        .playbook-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; flex-grow: 1; }
        .play-link {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            text-decoration: none; color: var(--text-dark); transition: 0.2s;
            background: rgba(0,0,0,0.03); border-radius: 12px; padding: 10px;
        }
        .play-link:hover { background: white; transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .play-link i { font-size: 1.6em; margin-bottom: 5px; color: var(--osu-gray); transition: 0.3s; }
        .play-link:hover i { color: var(--osu-scarlet); }
        .play-link span { font-size: 0.7em; font-weight: 800; text-transform: uppercase; text-align: center; }

        /* --- Constant Scrolling News Ticker --- */
        .news-card { 
            grid-area: news; 
            overflow: hidden; 
            min-height: 140px !important; 
            padding-bottom: 10px;
        }
        .ticker-wrap {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
        }
        #news-slider {
            display: inline-flex;
            gap: 20px;
            animation: ticker 45s linear infinite;
        }
        #news-slider:hover {
            animation-play-state: paused;
        }

        @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .news-item {
            text-decoration: none;
            color: var(--text-dark);
            display: block;
            width: 320px; 
        }
        .news-box {
            background: rgba(0, 0, 0, 0.04);
            padding: 18px;
            border-radius: 12px;
            font-size: 0.85em;
            font-weight: 700;
            border-left: 4px solid var(--osu-gray);
            white-space: normal; 
            height: 100%;
            transition: 0.3s ease;
        }
        .news-item:hover .news-box {
            background: white;
            border-left-color: var(--osu-scarlet);
            color: var(--osu-scarlet);
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        /* Todo UI */
        .todo-card { grid-area: todo; }
        .todo-input-group { display: flex; gap: 8px; margin-bottom: 12px; }
        .todo-input-group input { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #ddd; outline: none; }
        .todo-input-group button { padding: 0 15px; background: var(--osu-scarlet); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
        #todo-list { overflow-y: auto; max-height: 180px; }
        .todo-item { display: flex; align-items: center; padding: 8px; background: rgba(0,0,0,0.02); margin-bottom: 5px; border-radius: 8px; font-size: 0.9em; font-weight: 600; }

        @media (max-width: 900px) {
            .dashboard { grid-template-columns: 1fr; grid-template-areas: "weather" "quote" "todo" "playbook" "news"; }
        }
    </style>
</head>
<body>

<div id="overlay">
    <div class="rival-container" onclick="defeatRival()">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/3840px-Michigan_Wolverines_logo.svg.png" alt="TTUN Logo" class="rival-img">
        <i class="fas fa-times" id="red-x"></i>
        <p class="ttun-text">CLICK TO BEAT TTUN</p>
    </div>
</div>

<div class="container">
    <header>
        <h1 id="greeting">O-H... Ved! 🌰</h1>
        <div class="time-main" id="current-time">Loading...</div>
    </header>

    <div class="dashboard">
        <div class="card weather-card">
            <h2><i class="fas fa-satellite-dish"></i> weather</h2>
            <div id="weather-widget">Loading data...</div>
        </div>

        <div class="card quote-card">
            <h2>quote of the day</h2>
            <div id="quote-widget">"Focus on the next play."</div>
        </div>

        <div class="card todo-card">
            <h2><i class="fas fa-check-circle"></i> Today's To-Dos</h2>
            <div class="todo-input-group">
                <input type="text" id="todo-input" placeholder="Call the play..." autocomplete="off">
                <button onclick="addTodo()">Add</button>
            </div>
            <ul id="todo-list" style="list-style:none;"></ul>
        </div>

        <div class="card playbook-card">
            <h2><i class="fas fa-drafting-compass"></i> Quick Links</h2>
            <div class="playbook-grid">
                <a href="https://carmen.osu.edu" target="_blank" class="play-link"><i class="fas fa-graduation-cap"></i><span>Carmen</span></a>
                <a href="https://gmail.com" target="_blank" class="play-link"><i class="fas fa-envelope"></i><span>Gmail</span></a>
                <a href="https://github.com" target="_blank" class="play-link"><i class="fab fa-github"></i><span>GitHub</span></a>
                <a href="https://chatgpt.com" target="_blank" class="play-link"><i class="fas fa-robot"></i><span>AI Lab</span></a>
                <a href="https://www.linkedin.com/in/ved-vyas-16a011386/" target="_blank" class="play-link"><i class="fab fa-linkedin"></i><span>LinkedIn</span></a>
                <a href="https://outlook.office.com/mail/" target="_blank" class="play-link"><i class="fas fa-envelope-open-text"></i><span>Outlook</span></a>
            </div>
        </div>

        <div class="card news-card">
            <h2><i class="fas fa-newspaper"></i> Global News</h2>
            <div class="ticker-wrap">
                <div id="news-slider">
                    </div>
            </div>
        </div>
    </div>
</div>

<script>
    function defeatRival() {
        const redX = document.getElementById('red-x');
        const overlay = document.getElementById('overlay');
        redX.style.transform = "translate(-50%, -50%) scale(1.2)";
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.style.display = 'none'; }, 800);
        }, 700);
    }

    const cities = [
        {name: "Columbus", lat: 39.96, lon: -82.99, zone: "America/New_York"},
        {name: "New York", lat: 40.71, lon: -74.00, zone: "America/New_York"},
        {name: "Chicago", lat: 41.87, lon: -87.62, zone: "America/Chicago"},
        {name: "Denver", lat: 39.73, lon: -104.99, zone: "America/Denver"},
        {name: "Los Angeles", lat: 34.05, lon: -118.24, zone: "America/Los_Angeles"}
    ];

    function updateMainTime() {
        const now = new Date();
        document.getElementById('current-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    async function fetchWeatherAndTime() {
        const widget = document.getElementById('weather-widget');
        try {
            const results = await Promise.all(cities.map(async (city) => {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m&temperature_unit=fahrenheit`);
                const data = await res.json();
                const localTime = new Date().toLocaleTimeString('en-US', { timeZone: city.zone, hour: '2-digit', minute: '2-digit', hour12: true });
                return `<div class="city-row"><span>${city.name}</span><span class="city-time">${localTime}</span><span class="city-temp">${Math.round(data.current.temperature_2m)}°F</span></div>`;
            }));
            widget.innerHTML = results.join('');
        } catch (e) { widget.innerHTML = "Offline."; }
    }

    async function fetchQuote() {
        const widget = document.getElementById('quote-widget');
        try {
            const res = await fetch('https://dummyjson.com/quotes/random');
            const data = await res.json();
            widget.innerHTML = `"${data.quote}"<br><small style="color:var(--osu-gray); font-weight:800;">— ${data.author}</small>`;
        } catch (e) { }
    }

    async function fetchNews() {
        const slider = document.getElementById('news-slider');
        const timestamp = new Date().getTime();
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/rss.xml&t=${timestamp}`);
            const data = await response.json();
            if(data.status === 'ok') {
                const headlines = data.items.slice(0, 10).map(item => `
                    <a href="${item.link}" target="_blank" class="news-item">
                        <div class="news-box">${item.title}</div>
                    </a>
                `).join('');
                slider.innerHTML = headlines + headlines;
            }
        } catch (e) { slider.innerHTML = `<div style="padding:20px;">News scouting failed.</div>`; }
    }

    let todos = JSON.parse(localStorage.getItem('ved_todos')) || [];
    function renderTodos() {
        const list = document.getElementById('todo-list');
        list.innerHTML = todos.map((t, i) => `
            <li class="todo-item">
                <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTodo(${i})" style="accent-color:var(--osu-scarlet)">
                <span style="flex:1; margin-left:10px; ${t.done ? 'text-decoration:line-through; opacity:0.5' : ''}">${t.text}</span>
            </li>
        `).join('');
        localStorage.setItem('ved_todos', JSON.stringify(todos));
    }
    function addTodo() {
        const input = document.getElementById('todo-input');
        if (input.value) { todos.push({text: input.value, done: false}); input.value = ''; renderTodos(); }
    }
    function toggleTodo(i) { todos[i].done = !todos[i].done; renderTodos(); }

    document.addEventListener('DOMContentLoaded', () => {
        updateMainTime();
        setInterval(updateMainTime, 60000);
        fetchWeatherAndTime();
        setInterval(fetchWeatherAndTime, 60000);
        fetchQuote();
        fetchNews();
        setInterval(fetchNews, 1800000);
        renderTodos();
        document.getElementById('todo-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') addTodo(); });
    });
</script>
</body>
</html>
