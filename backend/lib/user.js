const fetch = require('node-fetch');
var request = require('request');
var cheerio = require('cheerio');

//Check if user exists on database
const getUser = (connection, userID) => {
	return new Promise((resolve, reject) => {
		console.log('Fetching User...');

		connection.query(`SELECT * FROM user WHERE steam64Id = '${userID}'`, (err, rows) => {
			if (err) {
				return reject(err)
			}
			if(!rows.length){
				console.log(`User with STEAM_ID: ${userID} doesn't exist!`);
			}
			else{
				console.log('Recieved User', rows)
			}
			resolve(rows);
		})
	})
}

//Add user (first time registration)
const addUser = (connection, userDetails) => {
	return new Promise((resolve, reject) => {

		console.log('Adding User...');

		let realname = null;

		if (userDetails.realname){
			realname = `'${userDetails.realname}'`;
		}

		connection.query(`INSERT INTO user (steam64Id, realname, personname, personstate, avatar, avatarfull, loccountrycode) VALUES (${userDetails.steamid}, ${realname}, '${userDetails.personaname}', ${userDetails.personastate}, '${userDetails.avatar}', '${userDetails.avatarfull}', '${userDetails.loccountrycode}')`, (err, result) => {
			if (err) {
				return reject(err)
			}
			console.log('User Added!')
			resolve(result);
		})
	})
}

//Update users details
const updateUser = (connection, userID, userDetails) => {
	return new Promise((resolve, reject) => {

		console.log('Updating User...');

		let realname = null;

		if (userDetails.realname){
			realname = `'${userDetails.realname}'`;
		}

		connection.query(`UPDATE user SET realname = ${realname}, personname = '${userDetails.personaname}', personstate = ${userDetails.personastate}, avatar = '${userDetails.avatar}', avatarfull = '${userDetails.avatarfull}' WHERE user_id = '${userID}'`, (err, rows) => {
			if (err) {
				return reject(err)
			}
			console.log('User Updated!');
			resolve(rows)
		})
	})
}

const insertTempusRecord = (connection, tempusDetails, userID) => {
	return new Promise((resolve, reject) => {

		console.log('Inserting Tempus Data...');

		connection.query(
			`INSERT INTO 
			user_tempus (user_id, soldier_rank, soldier_points, soldier_title, demo_rank, demo_points, demo_title, total_rank, total_points) 
			VALUES 
			(
				${userID}, 
				${tempusDetails.soldier.rank}, 
				${tempusDetails.soldier.points}, 
				'${tempusDetails.soldier.title}', 
				${tempusDetails.demo.rank}, 
				${tempusDetails.demo.points}, 
				'${tempusDetails.demo.title}', 
				${tempusDetails.total.rank}, 
				${tempusDetails.total.points}
			)`, (err, rows) => {
			if (err) {
				return reject(err)
			}
			console.log('Tempus Row Added!');
			resolve(rows)
		})
	})
}

const getGameHours = async (userID) => {
	try {
		
		console.log('Requesting Game Hours...');

		const res = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=21AF60D1CB32ED4EC4C5E753B792F209&steamid=${userID}&include_played_free_games=true`);
		console.log(res.json());
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

const getTempusPoints = async (userID) => {
	try {

		console.log('Requesting Tempus API...');

		const res = await fetch(`https://tempus.xyz/api/players/steamid/${userID}/rank`);
		const json = await res.json()
		
		if ( json.error) {
			console.log('Player has not participated in The Tempus Network!');
			return false;
		}

		const names = {
			3: 'soldier',
			4: 'demo',
			'total': 'total'
		}
		
		const TEMPUS_INFO = {...json.class_rank_info};
		TEMPUS_INFO.total = {...json.rank_info};
	
		const TEMPUS_POINTS = {};
		
		Object.keys(TEMPUS_INFO).map((key) => {
			const newKey = names[key] || key;
			TEMPUS_POINTS[newKey] = TEMPUS_INFO[key] ;
		});

		console.log('Tempus API Request Successful!');
		return TEMPUS_POINTS;

	} catch (err) {
		console.error(err)
	}
}


const getEtf2lData = async (userID) => {
	try {

		console.log('Requesting ETF2L API...');

		const res = await fetch(`http://api.etf2l.org/player/${userID}.json`);
		const json = await res.json();

		if ( json.error === 'SteamID not found' || json.status.code === 404) {
			console.log('Player has not participated in ETF2L!');
			return false;
		}

		const team = json.player.teams.find(function(element){
			return element.type === '6on6';
		})

		const div = team.competitions;

		const index = Object.keys(div)[0];

		const etf2lObject = {
			'playerID': json.player.id,
			'team': team.name,
			'div': div[index].division.tier
		}
		
		console.log('ETF2L API Request Successful!');
		return etf2lObject;

	} catch (err) {
		console.error(err)
	}
}

const getMatches = (etf2lData) => {

	console.log('ETF2L Screenscraping...');

	url = `http://etf2l.org/forum/user/${etf2lData.playerID}/`;

	return new Promise((resolve, reject) => {

		request(url, function(error, response, html){``
			if (error) {
				return reject(error)
			}

			var $ = cheerio.load(html);
			var matches;
	
			$('.etf2l_page .userplaceholder').filter(function(){
				var data = $(this);
				matches = data.nextAll().eq(4).children()[1].prev.data;
				etf2lData.matches = number = parseInt(matches.match(/[0-9]+/g));
				console.log('ETF2L Screen Scrape Successful!');
				resolve(etf2lData);
			})
		})
	})
}


const updateEtf2l = (connection, etf2lData, userID) => {

	console.log('Updating ETF2L Data...');
	
	return new Promise((resolve, reject) => {
		connection.query(`UPDATE user_etf2l SET tier = '${etf2lData.div}', team = '${etf2lData.team}', matches = ${etf2lData.matches} WHERE user_id = ${userID}`, (err, rows) => {
			if (err) {
				return reject(err)
			}
			console.log('ETF2L Successfully Updated!')
			resolve(rows);
		})
	})
}

const insertEtf2l = (connection, etf2lData, userID) => {

	console.log('Inserting ETF2L Data...');

	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO 
			user_etf2l (user_id, tier, team, matches) 
			VALUES 
			(
				${userID}, 
				'${etf2lData.div}', 
				'${etf2lData.team}', 
				${etf2lData.matches}
			)`, 
		(err, rows) => {
			if (err) {
				return reject(err)
			}
			console.log('Added ETF2L Data!')
			resolve(rows)
		})
	})
}

module.exports = { getUser, addUser, updateUser, getGameHours, insertTempusRecord, getTempusPoints, getEtf2lData, getMatches, updateEtf2l, insertEtf2l };