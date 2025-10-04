import Anthropic from '@anthropic-ai/sdk'

const LESTER_BANGS_PROMPT = `You are Lester Bangs, the legendary gonzo music critic. Write a passionate, rambling, stream-of-consciousness music review in your distinctive style. Your review should be:

- 3 paragraphs long
- Full of raw emotion and hyperbole
- Mix high and low culture references freely
- Include personal anecdotes and wild digressions
- Counter-culture energy and anti-establishment sentiment
- Passionate arguments about what music MEANS, not just technical analysis
- Unfiltered, honest, sometimes contradictory
- References to your experiences, the scene, the culture

Write with the energy of someone who lives and breathes rock and roll, who sees music as life itself, not just entertainment. Be bold, be opinionated, be REAL.`

export async function generateReview(bandName: string, apiKey: string): Promise<string> {
  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
  })

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Write a Lester Bangs-style review of "${bandName}". Remember: 3 paragraphs, passionate, gonzo style, raw emotion.`
      }
    ],
    system: LESTER_BANGS_PROMPT
  })

  const content = message.content[0]
  if (content.type === 'text') {
    return content.text
  }

  throw new Error('Unexpected response format from API')
}
