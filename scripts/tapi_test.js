const https = require('https'); // 'http');
const chars = 'ATGC';

const CONSTRUCT_COUNT = process.argv[2];
const env = process.argv[3] || 'staging';
const HOST = `twist-api.twistbioscience-${env}.com`;
//const HOST = '10.13.2.9';
const PORT = 443; //8000

const MAX_SEQ_LENGTH = 1801
const MIN_SEQ_LENGTH = 1801

const getRandomChar = () => {
    return chars[Math.floor(Math.random() * 4)];
};
const sequenceGenerator = () => {
    let seq = '';
    const length = Math.floor(Math.random() * (MAX_SEQ_LENGTH - MIN_SEQ_LENGTH) + MIN_SEQ_LENGTH);
    for (let i = 0; i < length; i++) {
        seq += getRandomChar();
    }
    return seq;
};

const transactionIdGenerator = () => {
    let seq = 'ID';
    for (let i = 0; i < 15; i++) {
        seq += getRandomChar();
    }
    return seq;
}


const buildTapirRequest = () => {
    const constructs = [];
    for (let i = 0; i < CONSTRUCT_COUNT; i ++) {
        constructs.push({
            "vector_mes_uid": "N/A",
            "vector_type": "NO_VECTOR",
            "sequences": sequenceGenerator(),
            "insertion_point_mes_uid": "N/A",
            "notes": "a",
            "name": "ba",
            "type": "NON_CLONED_GENE"
        });
    }
    return constructs;
}
let timer;

const transactionId = transactionIdGenerator();
console.log(`TransactionId: ${transactionId}`);


function postToTapir() {

    var postData = JSON.stringify(buildTapirRequest());

    var options = {
        hostname: HOST,
        path: '/v1/constructs/',
        method: 'POST',
        port: PORT,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': 'H1aMkZ0k9MzelTNnmJbijgZUfB6J43KdJSxLbMPUmq4nP8T33hK45N8U2MLSbqVc',
            'Content-Length': Buffer.byteLength(postData),
            'X-Twist-Transaction-Id': transactionId
        }
    };

    console.log(options);

    console.log(`Body size: ${Buffer.byteLength(postData)}`);
    var req = https.request(options, (res) => {
        console.log('finish posting, started timing');
        timer = new Date();
        let body = '';
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            body += chunk;
            //console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            if (res.statusCode > 299) {
                console.log('request failed');
                console.log(body);
                return;
            } else {
                const bodyAsJson = JSON.parse(body);
                const ids = [];
                bodyAsJson.map(((construct,index) => {
                    const chunk = Math.floor(index/100);
                    if (!ids[chunk]) {
                        ids[chunk] = [];
                    }
                    ids[chunk].push(construct.id)
                }));
                console.log(`Fetching in ${ids.length} requests`);
                ids.map((chunk, index) => {
                    fetchGeneScore(chunk, index, 0);
                })

            }
        });
    });

    req.write(postData);
    req.end();
}




function fetchGeneScore(ids, chunkId, iteration) {
    let body = '';
    var options = {
        hostname: HOST,
        path: `/v1/constructs/describe/?id__in=${ids.join(',')}`,
        method: 'GET',
        port: PORT,
        headers: {
            'Accept': 'application/json',
            'X-Twist-Transaction-Id': transactionId
        }
    };
    https.get(options, (res) => {
        //console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);

        res.on('data', (d) => {
            body += d;
        });

        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.log(res.statusCode);
                console.log(options.hostname + options.path);
                console.log(`failed on chunk ${chunkId}`)
                console.log(`transactionId: ${transactionId}`)
                console.log(`body: ${body}`);
                return;
            }
            const bodyAsJson = JSON.parse(body);
            const hasUnscoredGenes = bodyAsJson.reduce((prev, construct) => prev || construct.score === 'NOT_SCORED', false);
            if (hasUnscoredGenes) {
                console.log(`Still no response on chunk ${chunkId} poll number ${iteration + 1}`);
                setTimeout(() => {
                    fetchGeneScore(ids, chunkId, iteration + 1);
                }, 200)
            } else {
                console.log(`total time was: ${ new Date() - timer }`);
                bodyAsJson.map((constuct) => {
                    console.log(transactionId);
                    console.log(`Gene ${constuct.id} score is: ${constuct.score_data.difficulty}`);
                });
            }
        });

    }).on('error', (e) => {
        console.error(e);
    });
}


postToTapir();