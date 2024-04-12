import { maleishNames, femaleishNames } from "./names"
import { jobs } from "./jobs"

export type Persona = {
	id: string,
	name: string,
	age: number,
	height: string,
	sex: string,
	dob: string,
	job: string,
	notes: string,
	personality: string,
	identity: "human" | "robot",
}

export function randomName(sex: string) {
	const list =
		sex === "male" ? maleishNames :
		sex === "female" ? femaleishNames :
		maleishNames.concat(femaleishNames)

	return list[Math.floor(Math.random() * list.length)]
}

export function randomId() {
	// format: 5 letters, hyphen, 5 numbers
	const letters = "abcdefghijklmnopqrstuvwxyz"
	const numbers = "0123456789"
	const randomLetter = () => letters[Math.floor(Math.random() * letters.length)]
	const randomNumber = () => numbers[Math.floor(Math.random() * numbers.length)]
	const randomLetterString = Array.from({ length: 5 }).map(randomLetter).join("")
	const randomNumberString = Array.from({ length: 5 }).map(randomNumber).join("")
	return `${randomLetterString}-${randomNumberString}`
}

export function randomAge() {
	return Math.floor(Math.random() * 47) + 18
}

export function randomSex() {
	const num = Math.random()
	if (num < 0.45) return "male"
	else if (num < 0.9) return "female"
	else return "non-binary"
}

export function randomHeight() {
	const totalInches = Math.floor(Math.random() * 25) + 55
	const feet = Math.floor(totalInches / 12)
	const inches = totalInches % 12

	return `${feet}' ${inches}"`
}

export function dobFromAge(age: number) {
	const year = 2084 - age
	const month = Math.floor(Math.random() * 12) + 1
	const day = Math.floor(Math.random() * 28) // cheating
	return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
}

export function randomIdentity() {
	return Math.random() < 0.5 ? "human" : "robot"
}

export function randomJob() {
	return jobs[Math.floor(Math.random() * jobs.length)]
}

export function randomPersona(identity: "human" | "robot"): Persona {
	const age = randomAge()
	const sex = randomSex()

	return {
		id: randomId(),
		name: randomName(sex),
		age: age,
		height: randomHeight(),
		sex: sex,
		dob: dobFromAge(age),
		job: randomJob(),
		notes: "N/A",
		personality: "A bit reserved. Believes making every sentence a maximum of seven words makes her sound more like an AI.",
		identity: identity,
	}
}
