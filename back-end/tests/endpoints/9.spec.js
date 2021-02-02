import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../app/config/server.config.js';
import { emptyCallback } from '../../app/utils/callbacks.js';
import sampleToken from '../sample-token.js';

export default async () => {
    const MESSAGE = '9.  PUT     /game/:id';
    return fetch(`http://${ HOST }:${ TEST_PORT }/game/4`, {
        method: 'PUT',
        body: JSON.stringify({
            title: "Assassin’s Creed Valhalla",
            description: "Assassin's Creed Valhalla is an action role-playing video game developed by Ubisoft Montreal and published by Ubisoft",
            price: 69.90,
            platformids: [1, 2, 5, 6, 7],
            categoryids: [9],
            year: 2020
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sampleToken
        }
    })
        .then(res => res.status === 204)
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};