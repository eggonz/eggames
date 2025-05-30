import React, { useEffect, useState } from "react"
import { FaMagic, FaMinus, FaPlus } from "react-icons/fa"
import CounterInput from "../../components/CounterInput"
import MainUiButton from "../../components/MainUiButton"
import SliderInput from "../../components/SliderInput"
import ToggleInput from "../../components/ToogleInput"
import { TEAM_COLORS } from "../../constants/colors"
import type { WordGuessConfig } from "../../types/GameConfig"
import type { Player } from "../../types/Player"
import type { Team } from "../../types/Team"
import { shuffle } from "../../utils/arrayOps"
import { getStoredPlayers } from "../../utils/playersStorage"
import { minutesToString } from "../../utils/timeFunctions"
import styles from './WordGuessSettings.module.css'

// Constants
const N_TEAMS_MIN = 2
const N_TEAMS_MAX = 6
const T_TURN_MIN = 15
const T_TURN_MAX = 120
const T_TURN_STEP = 15
const W_POINTS_MIN = 5
const W_POINTS_MAX = 50
const W_POINTS_STEP = 5

// Functions
function estimateTime(config: WordGuessConfig): string {
  const time = Math.ceil(config.numTeams *
    // (config.turnDuration / 60 + (config.allowInfiniteSkips? 0.6 : 0.5)) *
    (config.turnDuration / 60 + 0.5) * // skips don't take time because timer is not reset
    config.pointsToWin) // min
  return minutesToString(time)
}

function maxTeams() {
  return Math.min(getStoredPlayers().length, N_TEAMS_MAX)
}


// Main Component
interface SettingsProps {
  config: WordGuessConfig
  setConfig: React.Dispatch<React.SetStateAction<WordGuessConfig>>
  setConfigured: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WordGuessSettings({ config, setConfig, setConfigured }: SettingsProps) {

  const [savedTeams, setSavedTeams] = useState<Team[]>(config?.teams)
  const [savedN, setSavedN] = useState<number>(config?.numTeams)

  useEffect(() => {
    // On config change, check if criteria are met
    const isConfiguredOk: boolean = !!config.teams && config.teams.length == config.numTeams
    setConfigured(isConfiguredOk)
  }, [config.numTeams, config.teams, setConfigured])

  // Render

  const handleNumTeamsChange = (direction: -1 | 1) => {
    setConfig(prev => {
      const n = Math.max(N_TEAMS_MIN, Math.min(maxTeams(), prev.numTeams + direction))
      return ({
        ...prev,
        numTeams: n,
        teams: n === savedN ? savedTeams : []
      })
    })
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
    const colors = shuffle(TEAM_COLORS).slice(0, numTeams)

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
                        max={maxTeams()}
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
        <div className={styles.teamsContainer}>
          <label>Teams</label>
            {config.teams.map((team, index) => (
              <ul key={index} className={styles.teamList}>
                {team.players.map((player, index2) => (
                  <li key={index2}
                      style={{backgroundColor: team.color.soft}}>
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