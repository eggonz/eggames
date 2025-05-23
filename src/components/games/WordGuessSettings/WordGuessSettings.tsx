import React, { useEffect, useState } from "react"
import { FaMagic, FaMinus, FaPlus } from "react-icons/fa"
import type { WordGuessConfig } from "../../../types/GameConfig"
import type { Player } from "../../../types/Player"
import type { Team } from "../../../types/Team"
import { shuffle } from "../../../utils/arrayOps"
import { TEAM_COLORS_SOFT } from "../../../utils/constants"
import { getStoredPlayers } from "../../../utils/playersStorage"
import CounterInput from "../../CounterInput"
import MainUiButton from "../../MainUiButton"
import SliderInput from "../../SliderInput"
import ToggleInput from "../../ToogleInput"
import styles2 from '../WordGuess.module.css'
import styles from './WordGuessSettings.module.css'

// Constants
const N_TEAMS_MIN = 2
const N_TEAMS_MAX = 5
const T_TURN_MIN = 15
const T_TURN_MAX = 120
const T_TURN_STEP = 15
const W_POINTS_MIN = 5
const W_POINTS_MAX = 50
const W_POINTS_STEP = 5

// Functions
function minutes2string(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

function estimateTime(config: WordGuessConfig): string {
  const time = Math.ceil(config.numTeams *
    (config.turnDuration / 60 + (config.allowInfiniteSkips? 0.6 : 0.5)) *
    config.pointsToWin) // min
  return minutes2string(time)
}

// Components

// Main Component
interface SettingsProps {
  config: WordGuessConfig
  setConfig: React.Dispatch<React.SetStateAction<WordGuessConfig>>
  setConfigured: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WordGuessSettings({ config, setConfig, setConfigured }: SettingsProps) {

  const [savedTeams, setSavedTeams] = useState<Team[]>([])
  const [savedN, setSavedN] = useState<number>()

  useEffect(() => {
    // On config change, check if criteria are met
    const isConfiguredOk: boolean = !!config.teams && config.teams.length == config.numTeams
    setConfigured(isConfiguredOk)
  }, [config.numTeams, config.teams, setConfigured])

  // Render

  const handleNumTeamsChange = (direction: -1 | 1) => {
    setConfig(prev => ({
      ...prev,
      numTeams: Math.max(N_TEAMS_MIN, Math.min(N_TEAMS_MAX,
        prev.numTeams + direction)),
      teams: (Math.max(N_TEAMS_MIN, Math.min(N_TEAMS_MAX,
        prev.numTeams + direction)) === savedN)? savedTeams : [],
    }))
  }

  const handleTurnDurationChange = (direction: -1 | 1) => {
    setConfig(prev => ({
      ...prev,
      turnDuration: Math.max(T_TURN_MIN, Math.min(T_TURN_MAX,
        prev.turnDuration + (direction * T_TURN_STEP)))
    }))
  }

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      pointsToWin: parseInt(event.target.value)
    }))
  }

  const handleToggleChange = () => {
    setConfig(prev => ({
      ...prev,
      allowInfiniteSkips: !prev.allowInfiniteSkips
    }))
  }

  const handleGenerateTeams = () => {
    const players: Player[] = getStoredPlayers()
    const numTeams: number = config.numTeams
    const shuffledPlayers: Player[] = shuffle(players)
    // subset of TEAM_COLORS
    const colors: string[] = shuffle(TEAM_COLORS_SOFT).slice(0, numTeams)

    const teams: Team[] = Array.from({ length: numTeams }, (_, index) => ({
      id: index + 1,
      color: colors[index],
      players: shuffledPlayers.slice(
        Math.ceil(index * players.length / numTeams),
        Math.ceil((index + 1) * players.length / numTeams)
      )
    }))

    setConfig(prev => ({
      ...prev,
      teams: teams,
    }))
    setSavedTeams(teams)
    setSavedN(numTeams)
  }

  return (
    <form className={styles.settingsForm}>

      <div className={[styles.settingsItem, styles.sideItem].join(' ')}>
        <label>Number of Teams</label>
        <div className={styles.centering}>
          <CounterInput label={config.numTeams}
                        labelLeft={<FaMinus/>}
                        labelRight={<FaPlus/>}
                        value={config.numTeams}
                        min={N_TEAMS_MIN}
                        max={N_TEAMS_MAX}
                        onClick={handleNumTeamsChange}/>
        </div>
      </div>

      <div className={[styles.settingsItem, styles.sideItem].join(' ')}>
        <label>Turn Duration</label>
        <div className={styles.centering}>
          <CounterInput label={`${config.turnDuration}s`}
                        labelLeft={`-${T_TURN_STEP}s`}
                        labelRight={`+${T_TURN_STEP}s`}
                        value={config.turnDuration}
                        min={T_TURN_MIN}
                        max={T_TURN_MAX}
                        onClick={handleTurnDurationChange}/>
        </div>
      </div>

      <div className={[styles.settingsItem, styles.sideItem].join(' ')}>
        <label>Points to Win</label>
        <div className={styles.centering}>
          <SliderInput value={config.pointsToWin}
                       min={W_POINTS_MIN}
                       max={W_POINTS_MAX}
                       step={W_POINTS_STEP}
                       onChange={handleSliderChange} />
        </div>
      </div>

      <div className={[styles.settingsItem, styles.sideItem].join(' ')}>
        <label>Enable Infinite Skips</label>
        <ToggleInput isChecked={config.allowInfiniteSkips}
                     onChange={handleToggleChange} />
      </div>

      <div className={styles.estimatedTimeContainer}>
        <span className={styles.estimatedTimeLabel}>Estimated Game Duration:</span>
        <span className={styles.estimatedTimeValue}>{estimateTime(config)}</span>
      </div>

      {config.teams && config.teams.length > 0 && (
        <div className={styles2.teamsContainer}>
          <label>Teams</label>
            {config.teams.map((team, index) => (
              <ul key={index} className={styles2.teamList}>
                {team.players.map((player, index2) => (
                  <li key={index2}
                      style={{backgroundColor: team.color}}>
                    {player.name}
                  </li>
                ))}
              </ul>
            ))}
        </div>
      )}

      <div className={styles.generateBtnContainer}>
        <MainUiButton
          Icon={FaMagic}
          text={"Generate Teams"}
          onClick={handleGenerateTeams}
        />
      </div>

    </form>
  )
}