import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../app/config/server.config.js';
import { emptyCallback } from '../../app/utils/callbacks.js';
import sampleToken from '../sample-token.js';

export default async () => {
    const MESSAGE = '5.  PUT     /category/:id';
    return fetch(`http://${ HOST }:${ TEST_PORT }/category/5`, {
        method: 'PUT',
        body: JSON.stringify({
            catname: "Another",
            description: "Something else that's different"
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