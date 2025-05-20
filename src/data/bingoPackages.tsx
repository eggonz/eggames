interface BingoPackage {
  value: string
  label: string
  prompts: string[]
}

interface BingoPackageGroup {
  label: string
  options: BingoPackage[]
}

export const BINGO_PACKAGES: BingoPackageGroup[] = [
  {
    label: 'Popular',
    options: [
      { value: 'eurovision', label: 'Eurovision 2025',
        prompts: [
          '12 points to neighbor',
          'Singer laying on the floor',
          'Act seems suspiciously similar',
          'Fireworks/Fire visuals',
          'Public boo\'s',
          'Non ESC-genre song',
          'French Ballad',
          'Mid-song Outfit change',
          'Political voting',
          'Men dancing in heels',
          // 'Non-EU country competes',
          'LGBTQ+ contender or song',
          'Reference or mention of Joost',
          'Presenter awkwardly fills time',
          'Presenter makes a bad joke',
          'Someone wears a skimpy outfit',
          'Hilariously bad fake instrument playing',
          'Song in native language',
          'Smuggled flags',
          'Political song',
          'Someone wears a weird/silly outfit',
          'Singer sings out of tune',
          'The BEST song doesn\'t win',
          'Worst part of act shown in recaps',

          'Winking at camera',
          'la la la la la la la la',
          // 'Pearls',
          'Long high note',
          'Kissing on stage',
          'Host flirting',
          'Mirrors',
          'Shot of the Swiss mountains',
          '(Half) naked dancers',
          'Performer with full face paint',
          'Yodeling',
          'Host tries calming down audience',
          'Surprise high televote',
          'Awkward time delay',
          'Gay joke',
          'Twinks on stage',
          'Off-key singing',
          'Body glitter',

          'Man with extremely bleach hair',
          '360 camera spin',
          'Flute',
          'Awkward rap bit',
          'Fake rain',
          'Tear open shirt',
          'Glitter cannon',
          'Brexit reference',
          'Feathers on outfit',
          'Animals in any form',
          'Upside down flag',
          'Castle drone-shot',
          'Audience face paint',
          'Folk costume',
          'Overly sexual backup dancers',
          'Heavy breathing into mic',
          'Excessive smoke',
          'UK less than 10 points in total',
          'Dancing with the audience',

          'Singer forgets lyrics',
          'Spain bottom 3',
          'UK 0 points in televote',
        ]
      },
    ],
  },
  {
    label: 'Dummy',
    options: [
      { value: 'chocolate', label: 'Chocolate', prompts: ['Chocolate'] },
      { value: 'strawberry', label: 'Strawberry', prompts: ['Strawberry'] },
      { value: 'vanilla', label: 'Vanilla', prompts: ['Vanilla'] },
    ],
  }
]