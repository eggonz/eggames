const TEAM_COLORS_SOFT: string[] = [
  '#ffc5c5',
  '#ffffb7',
  '#c7ffb8',
  '#a4e0ff',
  '#d3c9ff',
  '#ffdbff',
  '#ffd8be',
]

const TEAM_COLORS_1: string[] = [
  '#ff0000',
  '#ffd800',
  '#00ff00',
  '#00d9ff',
  '#3700ff',
  '#ff00ff',
  '#ff8000',
]

const TEAM_COLORS_2: string[] = [
  '#d60000',
  '#ffc200',
  '#00d500',
  '#00c4ff',
  '#0003c6',
  '#ba00ba',
  '#d15e00',
]

// Word Guess Game Views
enum Views {
  NEXT = 0,
  CARD = 1,
  TIMEUP = 2,
  GUESSED = 3,
  POINTS = 4,
  WINNER = 5,
}

export { TEAM_COLORS_SOFT, TEAM_COLORS_1, TEAM_COLORS_2, Views }