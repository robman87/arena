// Use to run bull-arena while developing this package

//const Arena = require('bull-arena'); // Use in production environment
const Arena = require('./index'); // Use when developing this package

// Mandatory import of queue library.
const Bull = require('bull');
const Bee = require('bee-queue');

const bullApp = Arena({
  Bull,
  queues: [
    {
      // Required for each queue definition.
      name: 'name_of_my_bull_queue',
      // User-readable display name for the host. Required.
      hostId: 'Queue Server 1',
      // Queue type (Bull or Bee - default Bull).
      //type: 'bull',
      // Queue key prefix. Defaults to "bq" for Bee and "bull" for Bull.
      //prefix: 'bull',
    },
  ],
});

const beeApp = Arena(
  {
    Bee,
    queues: [
      {
        // Required for each queue definition.
        name: 'name_of_my_bee_queue',
        // User-readable display name for the host. Required.
        hostId: 'Queue Server 1',
        type: 'bee',
        //prefix: 'bq',
      },
    ],
  },
  {port: 4568}
);
