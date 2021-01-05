var API_KEY = '4b5774e9f3d2a07b84f0f2f88e486224';
var city = 'London';

function ajax() {
	var ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + API_KEY, true);
	ajax.onload = function (e) {
		if (ajax.readyState === 4) {
			if (ajax.status === 200) {
				var json = JSON.parse(ajax.responseText);
				// ここに各パターンを用意。caseでそれぞれのcity名に対してのtimeZoneの名前を設定する
				switch (json.name) {
					case 'Tokyo':
						var location = 'Asia/Tokyo';
						break;
					case 'New York':
						var location = 'America/New_York';
						break;
					case 'London':
						var location = 'Europe/London';
						break;
					case 'Paris':
						var location = 'Europe/Paris';
						break;
					case 'Indonesia':
						var location = 'Asia/Jakarta';
						break;
				}
				const date1 = new Date();
				var time = date1.toLocaleString('en-US', { timeZone: location });
				var weather = ['気温：' + json.main.temp + '℃', '体感温度：' + json.main.feels_like + '℃', '湿度：' + json.main.humidity + '％']
				// htmlに書き込む処理
				document.getElementById('time').innerHTML = time;
				document.getElementById('temperature').innerHTML = weather[0];
				document.getElementById('feelslike').innerHTML = weather[1];
				document.getElementById('humidity').innerHTML = weather[2];
			} else {
				'データの取得に失敗しました。時間を置いて再度お試しください'
			}
		}
	}
	ajax.send(null);
}
ajax();
// 現在の天気を取得
function selectChange() {
	var selected_city = document.getElementById('w-location').value;
	city = selected_city;
	ajax();
}
