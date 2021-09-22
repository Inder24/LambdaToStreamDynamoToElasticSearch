const axios = require('axios');

const host = 'https://search-blogs-lp7zgx5u.ap-southeast-1.es.amazonaws.com';
const index = 'blogs';
const type = 'blog';
const url = `${host}/${index}/${type}/`
//const url = `${host}/${index}/`
const headers = { "Content-Type": "application/json" }
exports.handler = async (event, context) => {
    let count = 0;
    for (const record of event.Records) {
        const id = record.dynamodb.Keys.id.S;
        console.log(record);
    if (record.eventName == 'REMOVE') {
            await axios.delete(url + id, {} ,{
                auth: {
                   username: 'admin',
                   password: 'Admin'
               } 
            });
            return 'Item removed'
        }
        else {
            const document = record.dynamodb.NewImage;
            console.log('Adding document');
            console.log(document)
            await axios.put(url + id, document ,{
               auth: {
                   username: 'admin',
                   password: 'Admin'
               } 
            });
        }
        count += 1;
    }
    return `Successfully processed ${count} records.`;
};
