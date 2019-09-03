const fetch = require('node-fetch');

//Check if user exists on database
const getUser = (connection, userID) => {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM user WHERE steam64Id = '${userID}'`, (err, rows) => {
			if (err) {
				return reject(err)
			}
			
			//getGameHours(userID).then(res => console.log(res.response.games));
			getTempusPoints(userID).then(res => console.log(res));


			resolve(rows)
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

		connection.query(`INSERT INTO user (steam64Id, realname, personname, personstate, avatar, avatarfull, loccountrycode) VALUES (${userDetails.steamid}, ${realname}, '${userDetails.personaname}', ${userDetails.personastate}, '${userDetails.avatar}', '${userDetails.avatarfull}', '${userDetails.loccountrycode}')`, (err, rows) => {
			if (err) {
				return reject(err)
			}

			resolve(rows)
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
		return res.json()
	} catch (err) {
		console.error(err)
	}
}


const insertTempusRecord = (connection, tempusDetails, userID) => {
	return new Promise((resolve, reject) => {

		connection.query(`INSERT INTO user_tempus (user_id, soldier_rank, soldier_points, soldier_title, demo_rank, demo_points, demo_title, total_rank, total_points) VALUES (${userID}, ${tempusDetails.soldier_rank}, ${tempusDetails.soldier_points}, '${tempusDetails.soldier_title}', ${tempusDetails.demo_rank}, ${tempusDetails.demo_points}, '${tempusDetails.demo_title}', ${tempusDetails.total_rank}, ${tempusDetails.total_points})`, (err, rows) => {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}




//Shouldn't use this anymore, this calls on the API rather than the SQL Database Will be used for registration instead
// const {data, loading, error} = useFetch(`https://tempus.xyz/api/players/steamid/${props.match.params.steamID}/rank`);
// if (data) {
    
//     const names = {
//         3: 'data',
//         4: 'data',
//         'total': 'data'
//     }

//     const TEMPUS_INFO = {...data.class_rank_info};
//     TEMPUS_INFO.total = {...data.rank_info};

//     TEMPUS_POINTS = Object.keys(TEMPUS_INFO).map((key) => {
//         const newKey = names[key] || key;
//         return { [newKey] : TEMPUS_INFO[key] };
//     });

//     TEMPUS_POINTS[0].name = 'soldier';
//     TEMPUS_POINTS[0].image = soldier;
//     TEMPUS_POINTS[1].name = 'demo';
//     TEMPUS_POINTS[1].image = demo;
//     TEMPUS_POINTS[2].name = 'total';
//     TEMPUS_POINTS[2].image = demoAndSoldier;

//     console.log('testing tempus API', TEMPUS_POINTS);
// }

module.exports = { getUser, addUser, updateUser, getGameHours };