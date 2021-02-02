import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../app/config/server.config.js';
import { emptyCallback } from '../../app/utils/callbacks.js';
import compareObjectToSignature from '../../app/utils/compare-object-to-signature.js';
import sampleToken from '../sample-token.js';

export default async () => {
    const MESSAGE = '6.  POST    /game';
    return fetch(`http://${ HOST }:${ TEST_PORT }/game`, {
        method: 'POST',
        body: JSON.stringify({
            title: "Assassin’s Creed Valhalla",
            description: "Assassin's Creed Valhalla is an action role-playing video game developed by Ubisoft Montreal and published by Ubisoft",
            price: 69.90,
            platformids: [1, 2],
            categoryids: [5, 6, 7],
            year: 2020
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sampleToken
        }
    })
        .then(res => {
            if (res.status === 201) {
                return res.json();
            }
            else {
                return false;
            }
        })
        .then(
            /**
             * @param {{}[] | false} body
             * @returns {boolean}
             */
            body => {
                if (body === false) {
                    return body;
                }
                else {
                    return compareObjectToSignature(body, {
                        gameid: 'number'
                    });
                }
            })
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};