# Email Worker

This worker triggers a discord webhook to notify me for incoming emails.

## Setup

### Create Webhook

Follow [this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to create an one. Make sure to copy it is link and save somewhere else, we will use it later.

### Clone Repository

Clone the repository and cd into `email` folder:

```
git clone https://github.com/meppu/workers.git
cd workers/email
```

### Set Webhook URL

Run following commands to set `DISCORD_WEBHOOK`, `REVOLT_CHANNEL` and `REVOLT_TOKEN` secret:

```bash
$ wrangler secret put DISCORD_WEBHOOK
$ wrangler secret put REVOLT_CHANNEL
$ wrangler secret put REVOLT_TOKEN
```

### Publish

Run following command to publish it:

```
wrangler publish
```
