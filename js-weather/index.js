const API_KEY = '4b5774e9f3d2a07b84f0f2f88e486224';

const ajax_ = (city) => {
	const ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + API_KEY, true);
	ajax.onload = function (e) {
		if (ajax.readyState === 4) {
			if (ajax.status === 200) {
				// constだと動かない
				const json = JSON.parse(ajax.responseText);
				// ここに各パターンを用意。caseでそれぞれのcity名に対してのtimeZoneの名前を設定する
				const location = (location_json)=>{
					switch (location_json) {
						case 'Tokyo':
							return 'Asia/Tokyo';
						case 'New York':
							return 'America/New_York';
						case 'London':
							return 'Europe/London';
						case 'Paris':
							return'Europe/Paris';
						case 'Indonesia':
							return'Asia/Jakarta';
					}
				}
				const date1 = new Date();
				const time = date1.toLocaleString('en-US', { timeZone: location(json.name) });
				const temperature = '気温：' + json.main.temp + '℃';
				const feelslike = '体感温度：' + json.main.feels_like + '℃';
				const humidity = '湿度：' + json.main.humidity + '％';
				// htmlに書き込む処理
				document.getElementById('time').innerHTML = time;
				document.getElementById('temperature').innerHTML = temperature;
				document.getElementById('feelslike').innerHTML = feelslike;
				document.getElementById('humidity').innerHTML = humidity;
			} else {
				alert('データの取得に失敗しました。時間を置いて再度お試しください');
			}
		}
	}
	ajax.send(null);
}

// 現在の天気を取得
const selectChange = () => {
	const selected_city = document.getElementById('w-location').value;
	ajax_(selected_city);
}
selectChange();
