import { ForwardableEmailMessage } from "@cloudflare/workers-types";

// Replace with your own ID
const USER_ID: string = "1013270483560579165";

export interface Env {
  WEBHOOK_URL: string;
}

export default {
  async email(message: ForwardableEmailMessage, env: Env, _ctx: any) {
    const embed = embedBuilder(message);

    await fetch(env.WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(embed),
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });

    await message.forward("meppu@proton.me");
  },
};

// Build discord embed from email message
function embedBuilder({ from, to, rawSize }: ForwardableEmailMessage) {
  return {
    content: `Hey <@${USER_ID}>!`,
    embeds: [
      {
        title: "Received An Email",
        color: 0xffd6fe,
        fields: [
          {
            name: "From",
            value: `\`${from}\``,
            inline: true,
          },
          {
            name: "To",
            value: `\`${to}\``,
            inline: true,
          },
        ],
        footer: {
          text: `Raw size is ${rawSize}`,
        },
      },
    ],
  };
}
