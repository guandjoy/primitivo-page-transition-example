import React from "react"
import { path, morphing } from "primitivo-svg"

var startPathParameters = {
  numOfSegments: 4,
  depth: 0,
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  centerX: 800,
  centerY: 700,
  rotate: 45,
  numOfGroups: 2,
  incircle: false,
  groups: [
    {
      type: "radial",
      round: 1,
      radius: 50,
      smartRound: true,
      adaptArms: true,
      lengthBasedRound: true,
    },
    {
      type: "linear",
      radius: 25,
      round: 1,
      smartRound: true,
      adaptArms: true,
    },
  ],
}

const startPathObj = path(startPathParameters)

const width = window.innerWidth
const height = window.innerHeight

const centerX = 400
const centerY = 250

var endPathParameters = {
  numOfSegments: 4,
  depth: 0,
  x: 0,
  y: 0,
  width,
  height,
  centerX,
  centerY,
  rotate: 45,
  numOfGroups: 2,
  incircle: false,
  groups: [
    {
      type: "radial",
      round: 0,
      distance: 1,
      smartRound: true,
      adaptArms: true,
    },
    {
      type: "linear",
      distance: 1,
      round: 1,
      smartRound: false,
      adaptArms: false,
    },
  ],
}

const endPathObj = path(endPathParameters)

const roundNum = number => Math.round(number * 1e2) / 1e2
function one() {
  // Phase one is a circle
  const phaseOneDur = 0.1
  // Phase two is a figure connected to corners
  const phaseTwoDur = 0.5
  // Phase three is end figure
  const phaseThreeDur = 0.4

  var progressions = []

  progressions.push(phaseOneDur)

  endPathObj.vertexes.forEach((vertex, index) => {
    let maxLength = endPathObj.parameters.maxLengthByGroup[vertex.group]
    let progression = maxLength / vertex.length
    if (vertex.group === 0) {
      let phaseTwoProgression = roundNum(
        phaseTwoDur / progression + phaseOneDur
      )
      progressions.push(phaseTwoProgression)
      console.log(
        `vertex ${index} length: ${vertex.length}, group: ${vertex.group}, progression: ${phaseTwoProgression}`
      )
    }
    if (vertex.group === 1) {
      let phaseThreeProgression = roundNum(
        phaseThreeDur / progression + phaseOneDur + phaseTwoDur
      )
      progressions.push(phaseThreeProgression)
      console.log("progression group 1", phaseThreeProgression)
    }
  })

  progressions = progressions.sort((a, b) => a - b)

  for (let i = 0; i < progressions.length; i++)
    if (progressions[i - 1] === progressions[i]) progressions.splice(i, 1)

  console.log("progressions", progressions)
}

const phaseOneDur = 0.1
const phaseTwoDur = 0.5
const phaseThreeDur = 0.4
var phaseOneProgressions = []
var phaseTwoProgressions = []
var phaseThreeProgressions = []

const numOfPhases = 3
const phasesDur = [0.1, 0.5, 0.4]
var phasesProgressions = [[], [], []]
var phasesEnd = [[], [], []]

// Generate
endPathObj.vertexes.forEach((keyVertex, keyIndex) => {
  let length
  let round
  let maxLength = endPathObj.parameters.maxLengthByGroup[keyVertex.group]
  let delta = maxLength / keyVertex.length
  for (let i = 0; i < numOfPhases; i++) {
    phasesEnd[i].push(false)
    if (i === 0) {
      phasesProgressions[i].push(phasesDur[i])
      continue
    }
    phasesProgressions[i].push(
      roundNum(phasesDur[i] / delta + phasesProgressions[i - 1][keyIndex])
    )
  }
})

// Compose
var progressions = phasesProgressions.flat()

// Sort
progressions = progressions.sort((a, b) => a - b)

// Remove dublicates
let i = 0
while (i < progressions.length) {
  if (progressions[i - 1] === progressions[i]) progressions.splice(i, 1)
  else i += 1
}

var progressionsLength = []
var progressionsRound = []

for (let progression of progressions) {
  let progressionLength = []
  let progressionRound = []
  endPathObj.vertexes.forEach((vertex, index) => {})
}

console.log("progressions", progressions)

console.log("start path object", startPathObj)
console.log("end path object", endPathObj)

var animateParameters = {
  numOfKeyPaths: 20,
  loop: true,
}

var pathsParameters = {
  numOfSegments: 4,
  depth: 0,
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  centerX: 240,
  centerY: 370,
  rotate: 45,
  numOfGroups: 2,
  incircle: false,
  groups: [
    {
      type: "radial",
      distance: [0.5, 1],
      round: [0.8, 1],
      radius: [40, 80],
      smartRound: true,
      adaptArms: true,
    },
    {
      type: "linear",
      distance: 0.1,
      radius: [30, 60],
      round: [0.8, 1],
      smartRound: true,
      adaptArms: true,
    },
  ],
}

function TransitionEffect(props) {
  const pathsObj = morphing(animateParameters, pathsParameters)
  console.log("animate obj", pathsObj)
  return (
    <svg
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      <path fill="yellow" opacity="0.4">
        <animate
          attributeName="d"
          dur="4s"
          repeatCount="indefinite"
          values={pathsObj.dValues}
        />
      </path>
      <path fill="blue" opacity="0.4">
        <animate
          attributeName="d"
          dur="4s"
          begin="0.2s"
          repeatCount="indefinite"
          values={pathsObj.dValues}
        />
      </path>
      <path fill="red" opacity="0.4">
        <animate
          attributeName="d"
          dur="4s"
          begin="0.4s"
          repeatCount="indefinite"
          values={pathsObj.dValues}
        />
      </path>
      <path fill="red" opacity="0.2" d={startPathObj.d} />
      <path fill="green" opacity="0.1" d={endPathObj.d} />
    </svg>
  )
}

export default TransitionEffect
