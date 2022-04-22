/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const readline = require('readline-sync');

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);

	let students_length = parseInt(readline.question('\nQuantidade de alunos: '))

	let students = []

	let big_note = 0
	let id_student = 0

	for(let counter = 0; counter < students_length; counter++){
		let name = readline.question('\nNome do aluno: ')
		let note = parseInt(readline.question('Nota do aluno: '))
		
		if(note > big_note){
			big_note = note
			id_student = counter
		}

		students.push({
			id: counter,
			name: name,
			note: note
		})
	}

	for(let student of students){
		console.log(`\nID: ${student.id}, Nome: ${student.name}, Nota: ${student.note}`)
	}
	
	const student_big_note = students.find(item => {
		return item.id == id_student
	})

	console.log(`\nO aluno ${student_big_note?.name} tem a maior nota(${student_big_note?.note})`)
});
