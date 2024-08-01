import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 21 * 60 }); // 21 minutes in seconds

export default cache;
