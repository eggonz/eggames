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
    label: 'Classic',
    options: [
      { value: 'numbers', label: 'Numbers',
        prompts: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
          '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
          '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
          '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
          '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
          '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
          '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
          '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'
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