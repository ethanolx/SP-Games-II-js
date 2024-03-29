import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../app/config/server.config.js';
import { emptyCallback } from '../../app/utils/callbacks.js';
import sampleToken from '../sample-token.js';

export default async () => {
    const MESSAGE = '4.  POST    /category';
    return fetch(`http://${ HOST }:${ TEST_PORT }/category`, {
        method: 'POST',
        body: JSON.stringify({
            catname: "Action",
            description: "An action game emphasizes physical challenges, including hand–eye coordination and reaction-time"
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