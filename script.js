const API_KEY = 'af6291a95a09e4ca90d4baa55cbd1798'; 

const depts = {
    "01": "Ain", "02": "Aisne", "03": "Allier", "04": "Alpes-de-Haute-Provence", "05": "Hautes-Alpes", "06": "Alpes-Maritimes", "07": "Ardèche", "08": "Ardennes", "09": "Ariège", "10": "Aube", "11": "Aude", "12": "Aveyron", "13": "Bouches-du-Rhône", "14": "Calvados", "15": "Cantal", "16": "Charente", "17": "Charente-Maritime", "18": "Cher", "19": "Corrèze", "2A": "Corse-du-Sud", "2B": "Haute-Corse", "21": "Côte-d'Or", "22": "Côtes-d'Armor", "23": "Creuse", "24": "Dordogne", "25": "Doubs", "26": "Drôme", "27": "Eure", "28": "Eure-et-Loir", "29": "Finistère", "30": "Gard", "31": "Haute-Garonne", "32": "Gers", "33": "Gironde", "34": "Hérault", "35": "Ille-et-Vilaine", "36": "Indre", "37": "Indre-et-Loire", "38": "Isère", "39": "Jura", "40": "Landes", "41": "Loir-et-Cher", "42": "Loire", "43": "Haute-Loire", "44": "Loire-Atlantique", "45": "Loiret", "46": "Lot", "47": "Lot-et-Garonne", "48": "Lozère", "49": "Maine-et-Loire", "50": "Manche", "51": "Marne", "52": "Haute-Marne", "53": "Mayenne", "54": "Meurthe-et-Moselle", "55": "Meuse", "56": "Morbihan", "57": "Moselle", "58": "Nièvre", "59": "Nord", "60": "Oise", "61": "Orne", "62": "Pas-de-Calais", "63": "Puy-de-Dôme", "64": "Pyrénées-Atlantiques", "65": "Hautes-Pyrénées", "66": "Pyrénées-Orientales", "67": "Bas-Rhin", "68": "Haut-Rhin", "69": "Rhône", "70": "Haute-Saône", "71": "Saône-et-Loire", "72": "Sarthe", "73": "Savoie", "74": "Haute-Savoie", "75": "Paris", "76": "Seine-Maritime", "77": "Seine-et-Marne", "78": "Yvelines", "79": "Deux-Sèvres", "80": "Somme", "81": "Tarn", "82": "Tarn-et-Garonne", "83": "Var", "84": "Vaucluse", "85": "Vendée", "86": "Vienne", "87": "Haute-Vienne", "88": "Vosges", "89": "Yonne", "90": "Territoire de Belfort", "91": "Essonne", "92": "Hauts-de-Seine", "93": "Seine-Saint-Denis", "94": "Val-de-Marne", "95": "Val-d'Oise", "971": "Guadeloupe", "972": "Martinique", "973": "Guyane", "974": "La Réunion", "976": "Mayotte"
};
const patoisConditions = {
    'Clear': "Grand soulail", 'Clouds': "In p'tit peu d'brousas", 'Rain': "Ç'est r'trempé (Pluie)",
    'Drizzle': "In p'tit crachin", 'Thunderstorm': "Y' drague (Orage)", 'Snow': "Y' neije",
    'Mist': "In beau fâ (Brouillard)", 'Fog': "In beau fâ", 'Haze': "Y' brouillasse"
};

const chouanSayings = {
    'Clear': [
        "In temps à aller à la dauge ! Profite du soulail, mon gâs.",
        "Y' fait in temps de demoiselle, va donc virer dehors !",
        "Boune journée pour aller à la plage, t'as point d'excuse."
    ],
    'Clouds': [
        "C'est tout bousillé le temps là, on voit point le soulail.",
        "In temps de r'vunche, on sait point si ça va tomber.",
        "Le ciel est tout barbouillé, reste pas là à bayer aux corneilles."
    ],
    'Rain': [
        "A'ç't'heure, ça tombe comme à la fesse d'un gendarme !",
        "T'es r'trempé comme une soupe, rentre donc la r'sserrée.",
        "V'là la r'guignée, les canards vont être contents."
    ],
    'Thunderstorm': [
        "Attention, y' drague dur ! Rentre tes abattis !",
        "V'là le tonnerre, on va se prendre une sacrée r'napée."
    ],
    'Mist': [
        "On y voit point à une coudée dans ce fâ-là !",
        "C'est tout embrumé, on dirait qu'on est dans le marais."
    ]
};

const icons = { 'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️', 'Thunderstorm': '⛈️', 'Snow': '❄️', 'Mist': '🌫️' };

const selectedBox = document.getElementById('selected-item');
const optionsList = document.getElementById('options-list');

document.getElementById('date').innerText = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

function init() {
    for (let code in depts) {
        let div = document.createElement('div');
        div.innerText = `${code} - ${depts[code]}`;
        div.onclick = () => {
            selectedBox.querySelector('span').innerText = div.innerText;
            optionsList.classList.add('select-hide');
            // IMPORTANT : On passe le nom du département à l'API
            fetchWeather(depts[code]); 
        };
        optionsList.appendChild(div);
    }
    // Préréglage au démarrage
    selectedBox.querySelector('span').innerText = "85 - Vendée";
    fetchWeather("Vendée");
}

async function fetchWeather(city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},FR&units=metric&lang=fr&appid=${API_KEY}`);
        const data = await res.json();
        const main = data.weather[0].main;

        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('condition').innerText = patoisConditions[main] || data.weather[0].description;
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('wind').innerText = `${Math.round(data.wind.speed * 3.6)} km/h`;
        document.getElementById('weather-icon').innerText = icons[main] || '🌡️';

        const sayings = chouanSayings[main] || ["Faut point rester là !"];
        document.getElementById('threat-text').innerText = sayings[Math.floor(Math.random() * sayings.length)];
    } catch (e) {
        document.getElementById('threat-text').innerText = "V'là une erreur, c'est la berne !";
    }
}

selectedBox.onclick = (e) => { e.stopPropagation(); optionsList.classList.toggle('select-hide'); };
document.onclick = () => { optionsList.classList.add('select-hide'); };

init();