const fetch = require('node-fetch');

//Check if user exists on database
const getUser = (connection, userID) => {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM user WHERE steam64Id = '${userID}'`, (err, rows) => {
			if (err) {
				return reject(err)
			}
			
			//getGameHours(userID).then(res => console.log(res.response.games));
			// getTempusPoints(userID).then(res => console.log(res));

			resolve(rows);
		})
	})
}

//Add user (first time registration)
const addUser = (connection, userDetails) => {
	return new Promise((resolve, reject) => {

		let realname = null;

		if (userDetails.realname){
			realname = `'${userDetails.realname}'`;
		}

		connection.query(`INSERT INTO user (steam64Id, realname, personname, personstate, avatar, avatarfull, loccountrycode) VALUES (${userDetails.steamid}, ${realname}, '${userDetails.personaname}', ${userDetails.personastate}, '${userDetails.avatar}', '${userDetails.avatarfull}', '${userDetails.loccountrycode}')`, (err, result) => {
			if (err) {
				return reject(err)
			}

			resolve(result);
		})
	})
}

//Update users details
const updateUser = (connection, userID, userDetails) => {
	return new Promise((resolve, reject) => {

		let realname = null;

		if (userDetails.realname){
			realname = `'${userDetails.realname}'`;
		}

		connection.query(`UPDATE user SET realname = ${realname}, personname = '${userDetails.personaname}', personstate = ${userDetails.personastate}, avatar = '${userDetails.avatar}', avatarfull = '${userDetails.avatarfull}' WHERE steam64Id = '${userID}'`, (err, rows) => {
			if (err) {
				return reject(err)
			}

			resolve(rows)
		})
	})
}

const insertTempusRecord = (connection, tempusDetails, userID) => {
	return new Promise((resolve, reject) => {

		console.log(tempusDetails);


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
				)`, 
				(err, rows) => {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

const getGameHours = async (userID) => {
	try {
		const res = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=21AF60D1CB32ED4EC4C5E753B792F209&steamid=${userID}&include_played_free_games=true`);
		
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

const getTempusPoints = async (userID) => {
	try {
		const res = await fetch(`https://tempus.xyz/api/players/steamid/${userID}/rank`);
		const json = await res.json()
		
		if ( json.error === 'SteamID not found') {
			return;
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

		return TEMPUS_POINTS;

	} catch (err) {
		console.error(err)
	}
}


const getEtf2lData = async (userID) => {
	try {

		//Current Team Name === Player -> teams[1] -> name
		//Current Division === player ->teams[1] -> compeitions[0] -> division['tier']
		const etf2lStats = `http://api.etf2l.org/player/${userID}`;

		//in general these are paginated at 10 per page, this can be modified to include 100 results per page
		//however this significantly slow down the speed of the API,
		//Potentially multiple API requests will have to be made to get all the result data.
		//The number of officials played will be equal to the number of results across all pages
		const officialCount = `http://api.etf2l.org/player/${userID}/results/0?since=0&per_page=100`;
		
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

//Shouldn't use this anymore, this calls on the API rather than the SQL Database Will be used for registration instead
// const {data, loading, error} = useFetch(`https://tempus.xyz/api/players/steamid/${props.match.params.steamID}/rank`);
// if (data) {
	
	// {
	// 	"player_info": {
	// 		"steamid": "STEAM_0:0:40509687",
	// 		"name": "BaBitY BAap BOOB",
	// 		"country": null,
	// 		"first_seen": 1441552428.0847,
	// 		"id": 111037,
	// 		"last_seen": 1566643290.06724
	// 	},

	// 	"class_rank_info": {
	// 		"3": {
	// 		"total_ranked": 53009,
	// 		"points": 22870,
	// 		"rank": 180,
	// 		"title": "Noble"
	// 		},

	// 		"4": {
	// 		"total_ranked": 36898,
	// 		"points": 708,
	// 		"rank": 1387,
	// 		"title": "Plebeian"
	// 		}

	// 	},

	// 	"rank_info": {
	// 	"total_ranked": 70862,
	// 	"points": 23578,
	// 	"rank": 295
	// 	}
	// }

    // const names = {
    //     3: 'data',
    //     4: 'data',
    //     'total': 'data'
    // }

    // const TEMPUS_INFO = {...data.class_rank_info};
    // TEMPUS_INFO.total = {...data.rank_info};

    // TEMPUS_POINTS = Object.keys(TEMPUS_INFO).map((key) => {
    //     const newKey = names[key] || key;
    //     return { [newKey] : TEMPUS_INFO[key] };
    // });

    // TEMPUS_POINTS[0].name = 'soldier';
    // TEMPUS_POINTS[0].image = soldier;
    // TEMPUS_POINTS[1].name = 'demo';
    // TEMPUS_POINTS[1].image = demo;
    // TEMPUS_POINTS[2].name = 'total';
    // TEMPUS_POINTS[2].image = demoAndSoldier;

	// console.log('testing tempus API', TEMPUS_POINTS);
	
	
// }

module.exports = { getUser, addUser, updateUser, getGameHours, insertTempusRecord, getTempusPoints };