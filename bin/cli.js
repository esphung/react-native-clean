#!/usr/bin/env node

const inquirer = require('inquirer');
const axios = require('axios');

const someFunction = () => {
	inquirer.default
		.prompt([
			{
				type: 'input',
				name: 'pokemonName',
				message: 'Name of pokemon',
				default: 'pikachu',
			},
		])
		.then(async (answers) => {
			try {
				const res = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${answers.pokemonName}`,
				);
				console.log(res.data.types.map((type) => type.type.name));
			} catch (err) {
				console.log('Pokemon not found, try again');
			}
		});

	console.log('This is a function');
};

someFunction(); // This will call the function and log "This is a function" to the console
