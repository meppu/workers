import { ForwardableEmailMessage } from "@cloudflare/workers-types";

// Replace with your own ID
enum Platform {
  Discord = "1013270483560579165",
  Revolt = "01F6YN5JWMHJFKPDZVYB6434HX",
}

export interface Env {
  DISCORD_WEBHOOK: string;
  REVOLT_TOKEN: string;
  REVOLT_CHANNEL: string;
}

export default {
  async email(message: ForwardableEmailMessage, env: Env, _ctx: any) {
    const [discordMessage, revoltMessage] = [
      messageBuilder(message, Platform.Discord),
      messageBuilder(message, Platform.Revolt),
    ];

    await messageSender(discordMessage, Platform.Discord, env);
    await messageSender(revoltMessage, Platform.Revolt, env);

    await message.forward("meppu@proton.me");
  },
};

// Build message from email message for a platform
function messageBuilder(
  { from, to }: ForwardableEmailMessage,
  platform: Platform
): string {
  return `Hey <@${platform}>! Got an email from \`${from}\` to \`${to}\` :3`;
}

// Send notification for a platform
async function messageSender(
  content: string,
  platform: Platform,
  { DISCORD_WEBHOOK, REVOLT_TOKEN, REVOLT_CHANNEL }: Env
) {
  switch (platform) {
    case Platform.Discord: {
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });
      break;
    }
    case Platform.Revolt: {
      await fetch(
        `https://api.revolt.chat/channels/${REVOLT_CHANNEL}/messages`,
        {
          method: "POST",
          body: JSON.stringify({ content }),
          headers: {
            "content-type": "application/json;charset=UTF-8",
            "x-bot-token": REVOLT_TOKEN,
          },
        }
      );
      break;
    }
  }
}
