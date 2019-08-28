import * as fetch from 'node-fetch';
import * as moment from 'moment';
import { readFileSync } from 'fs';


const url = 'https://www.ctvrtkon.cz/feed-1.json';


export async function main() {
    const payload = await fetch(url).then(response => response.json());
    const lastEventDate = moment(payload.items[0].time, 'DD.MM.YYYY HH:mm');
    const template = readFileSync('./template.html').toString();
    if (lastEventDate.isValid() && lastEventDate.isSame(new Date(), 'day')) {
        return template.replace('{{ text }}', 'JE.');
    }
    return template.replace('{{ text }}', 'Není :-(');
}
