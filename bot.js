var twit = require('twit');
var config = require('./config.js');
var OAuth = require('oauth');

var twitter = new twit(config);

function randomItem(array) {
	if (!Array.isArray(array)) {
		throw new TypeError('Expected an array');
	}

	return array[Math.floor(Math.random() * array.length)];
}

randomItem.multiple = (array, count) => {
	if (!(Number.isInteger(count) && count >= 0)) {
		throw new TypeError('Expected a non-negative integer');
	}

	return Array.from({length: count}, () => randomItem(array));
};

var tReply = [
  ''
];

var tQuote = [
  ''
];

function BotInit() {
    var stream = twitter.stream('statuses/filter', { track: ''});

    stream.on('tweet', function (tweet) {
        console.log(tweet)

        twitter.post('statuses/update', {
            status: randomItem(tReply) + '\n\n' + randomItem(tQuote),
            in_reply_to_status_id: tweet.id_str,
            auto_populate_reply_metadata: true
        })
    });
}

BotInit();
