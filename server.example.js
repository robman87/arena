// Use to run bull-arena while developing bull-arena

//const Arena = require('bull-arena'); // Use in production environment
const Arena = require('./index'); //

// Mandatory import of queue library.
const Bull = require('bull');

Arena({
    // All queue libraries used must be explicitly imported and included.
    Bull,

    // Set `Bee` when using bee.

    queues: [
        {
            // Required for each queue definition.
            name: 'name_of_my_queue',

            // User-readable display name for the host. Required.
            hostId: 'Queue Server 1',

            // Queue type (Bull or Bee - default Bull).
            type: 'bull',

            // Queue key prefix. Defaults to "bq" for Bee and "bull" for Bull.
            prefix: 'foo',
        },
    ],
});