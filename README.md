# Lightning Talk Presentation: Serverless 2
## Event driven architecture for dynamic frontend generation

This is the companion repo for the 
[Lightning Talk](https://youtu.be/QfAgaubdHOE) (find the [slides here](https://docs.google.com/presentation/d/1GsRBDc5fNog6a1UGnKUfCi9pKUqkr6rwxokIE8jFryw/edit?usp=sharing)).


## Requirements

* Node.js 12+
* [serverless cli](https://serverless.com/framework/docs/getting-started/)

## Install locally

* Duplicate `.env.example` and rename it conveniently (e.g. something like
 `.env.development`) 
  * Edit the values on your newly created `.env` file to match your own scenario
* `cd lightning-talk-serverless2`
* `npm install`
* `dotenv -e .env.development -- serverless deploy` (replace `.env
.development` by the name of your own file created in the first step)
  * _(optional if you use JetBrains)_ replace the values gotten after the
   deployment in the `requests.http`
