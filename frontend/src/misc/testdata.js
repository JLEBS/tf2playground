//This page is test data for the playground website, will be edeleted in future,
//While no backend exists for this site, this object written in the same way a JSON
//file would be to demonstrate the functionality is working before implementing backend

const userJsonData = [
    {
        userId: 001,

        lobbyData: {
            nickname: 'Chadmaster',
            joinDate: '10/11/2019',
            active: 1,
            lastActive: '10/11/2021',
            region: 'uk',
            discord: 'eepily#2645',
            twitch: {
                twitchName: 'eepily',
                streaming: true
            }
        },

        lobbySettings: {
            darkmode: false,
            volumeLevel: 6,
            notifications: false
        },

        steamData : {
            steamId: '[U:1:81264176]',
            steamCommunityId: '76561198041529904',
            steamName: 'eepily',
            steamNickname: 'Arthur',
            avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ec/ecb8f3dd89bcd796eaaeb77d5547794053cfb120_full.jpg',
            hours: 8499
        },

        etf2lData: {
            division: 2,
            teamName: 'L A N T U R T L E',
            numOfOfficials: 141
        },
        
        tempusData: {
            currentPoints: {
                soldier: {
                    rank: 171,
                    points: 21213
                },
                demoman: {
                    rank: 403,
                    points: 5358
                },
                overall: {
                    rank: 235,
                    points: 26771
                }
            }
        },

        matchData: {
            lobbiesPlayed: 1527,
            lobbiesWon: 888,
            subbed: 35,
            ditched: 27,
            classData: {
                pocketScout: {
                    name: 'pocket scout',
                    wins: 127,
                    loses: 46
                },
                flankScout: {
                    name: 'flank scout',
                    wins: 83,
                    loses: 135
                },
                pocketSoldier: {
                    name: 'pocket soldier',
                    wins: 258,
                    loses: 126
                },
                roamingSoldier: {
                    name: 'roamer',
                    wins: 236,
                    loses: 157
                },
                demoman: {
                    name: 'demoman',
                    wins: 103,
                    loses: 87
                },
                medic: {
                    name: 'medic',
                    wins: 81,
                    loses: 88
                }
            }
        }
    },
    {
        userId: 002,

        lobbyData: {
            nickname: 'BaBitY BAap BOOB',
            joinDate: '06/07/2018',
            active: 0,
            lastActive: '03/05/2029',
            region: 'belgium',
            discord: '009EFF#7160',
            twitch: {
                twitchName: '009EFF',
                streaming: false
            }
        },

        lobbySettings: {
            darkmode: false,
            volumeLevel: 2,
            notifications: false
        },

        steamData : {
            steamId: '[U:1:81019374]',
            steamCommunityId: '76561198041285102',
            steamName: '009eff',
            steamNickname: 'BaBitY BAap BOOB',
            avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b1/b1869d8a45b5cf9c05f6288f5a18a496d7ef0915_full.jpg',
            hours: 8329
        },

        etf2lData: {
            division: 2,
            teamName: 'L A N T U R T L E',
            numOfOfficials: 140
        },
        
        tempusData: {
            currentPoints: {
                soldier: {
                    rank: 172,
                    points: 21201
                },
                demoman: {
                    rank: 1411,
                    points: 633
                },
                overall: {
                    rank: 286,
                    points: 21834
                }
            }
        },

        matchData: {
            lobbiesPlayed: 1762,
            lobbiesWon: 1527,
            subbed: 46,
            ditched: 12,
            classData: {
                pocketScout: {
                    name: 'pocket scout',
                    wins: 96,
                    loses: 78
                },
                flankScout: {
                    name: 'flank scout',
                    wins: 74,
                    loses: 45
                },
                pocketSoldier: {
                    name: 'pocket soldier',
                    wins: 378,
                    loses: 173
                },
                roamingSoldier: {
                    name: 'roamer',
                    wins: 367,
                    loses: 156
                },
                demoman: {
                    name: 'demoman',
                    wins: 21,
                    loses: 18
                },
                medic: {
                    name: 'medic',
                    wins: 300,
                    loses: 56
                }
            }
        }
    }
];

const timeStampJsonData = [
    {
        timeStampId : 831,
        userAccountId: 001,
        dateTime: '2019-04-23T18:25:43.511Z',
        tempusPoints: {
            soldier: {
                rank: 171,
                points: 21213
            },
            demoman: {
                rank: 403,
                points: 5358
            },
            overall: {
                rank: 235,
                points: 26771
            }
        }
    },
    {
        timeStampId : 674,
        userAccountId: 001,
        dateTime: '2017-04-23T18:25:43.511Z',
        tempusPoints: {
            soldier: {
                rank: 707,
                points: 5794
            },
            demoman: {
                rank: 13190,
                points: 10
            },
            overall: {
                rank: 1016,
                points: 5804
            }
        }
    }
];

//Icons are seperate from the array
const CLASS_ICONS = [
    {
        standard: {
            pocketScout: {
                shortname: 'pocket scout',
                image: pocketScout
            },
           flankScout: {
                name: 'flank scout',
                shortname: 'flank scout',
                image: scout
            },
            pocketSoldier: {
                name: 'pocket soldier',
                shortname: 'pocket',
                image: pocketSoldier
            },
            roamer: {
                name: 'roaming soldier',
                shortname: 'roamer',
                image: soldier
            },
            demoman: {
                name: 'demoman',
                shortname: 'demo',
                image: demo
            },
            medic: {
                name: 'medic',
                shortname: 'medic',
                image: medic
            }
        },
        tempus: {
            name: 'demoandsoldier',
            shortName: 'total',
            image: demoAndSoldier,
        }
    }
];

// const SVG_ICONS = [
//     {
//         stats: {
//             lobbiesPlayed: {
//                 description: 'fist_raised',
//                 image: Fist
//             },
//             trophy: {
//                 name: 'total wins',
//                 description: 'trophy',
//                 image: Trophy
//             },
//             { 
//                 name: 'hours played',
//                 description: 'trophy',
//                 image: Clock,
//             },
//             {
//                 name: 'ETF2L div',
//                 description: 'medal',
//                 image: Medal,
//             },
//             {   
//                 name: 'disconnects',
//                 description: 'brokenarm',
//                 image: Injured,
//             },
//             { 
//                 name: 'sub count',
//                 description: 'carry',
//                 image: PeopleCarry
//             }
//     },
//         urls: {
//             {
//                 name: 'steam',
//                 image: Steam_Logo,
//                 url: 'https://steamcommunity.com/profiles/'
//             },
//             {
//                 name: 'discord',
//                 image: Discord,
//                 url: 'https://discordapp.com/'
//             },
//             {
//                 name: 'twitch',
//                 image: Twitch,
//                 url: 'https://www.twitch.tv/'
//             }
//         }
//     }
// ];


//Only required SteamCommunity Id
const PROFILE_URLS = [

    {
        name: 'logs.tf',
        url: 'http://logs.tf/profile/',
    },
    {
        name: 'demos',
        url: 'https://demos.tf/profiles/'
    },
    {
        name: 'etf2l',
        url: 'http://etf2l.org/search/'
    },
    {
        name: 'ugc',
        url: 'https://www.ugcleague.com/players_page.cfm?player_id='
    },
    {
        name: 'tf2center',
        url: 'https://tf2center.com/profile/'
    },
    {
        name: 'pugchamp',
        url: 'https://eu.pug.champ.gg/player/'
    }
];