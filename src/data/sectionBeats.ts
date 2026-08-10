/**
 * Concept + Lyric + Visual section beats.
 * Swap `lyric` / `lyricCredit` anytime — keep concept + visualId stable.
 */
export type VisualId =
  | 'occam'
  | 'signal'
  | 'overfit'
  | 'gradient'
  | 'bias';

export type SectionBeat = {
  id: string;
  concept: string;
  lyric: string;
  lyricCredit: string;
  visualId: VisualId;
  /** Short data-scientist gloss under the concept */
  gloss: string;
};

export const heroBeat = {
  concept: "Occam's razor",
  primaryLyric: 'Since when has it become not cool to try',
  primaryCredit: 'A$AP Rocky',
  gloss: 'the simplest explanation tends to win',
  softLyric: 'I was just a child, walking in the wild, learning my name',
  softCredit: 'Skegss',
} as const;

export const sectionBeats: SectionBeat[] = [
  {
    id: 'process',
    concept: 'Gradient descent',
    lyric: 'Going down the only road I\'ve ever known',
    lyricCredit: 'Lynyrd Skynyrd',
    visualId: 'gradient',
    gloss: 'Take the slope. Step. Repeat. That\'s how anything gets built.',
  },
  {
    id: 'work',
    concept: 'Signal vs. noise',
    lyric: 'I can see clearly now, the rain is gone',
    lyricCredit: 'Johnny Nash',
    visualId: 'signal',
    gloss: 'Most of the data is texture. The red shape is the point.',
  },
  {
    id: 'lessons',
    concept: 'Overfitting vs. generalization',
    lyric: 'Stuck in a moment and you can\'t get out of it',
    lyricCredit: 'U2',
    visualId: 'overfit',
    gloss: 'Memorize the training set and the next point cracks you open.',
  },
  {
    id: 'balance',
    concept: 'Bias–variance tradeoff',
    lyric: 'I\'ve looked at life from both sides now',
    lyricCredit: 'Joni Mitchell',
    visualId: 'bias',
    gloss: 'Too sharp misses the world. Too soft misses the edge. Hold both.',
  },
];
