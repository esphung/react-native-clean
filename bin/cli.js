#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('ls'); // This will execute the ls command

// get local directory
const fs = require('fs');
const path = require('path');

// get current working directory
const currentDir = process.cwd();
console.log(`Current working directory: ${currentDir}`);

const files = fs.readdirSync(currentDir);
console.log('Files in current directory:', files);

console.debug('nvm is installed, checking for .nvmrc file...');

// check if nvm cli is installed
if (!shell.which('nvm')) {
	console.error('nvm is not installed, please install it to set node version');
} else {
	// check if .nvmrc exists
	const nvmrcPath = path.join(currentDir, '.nvmrc');
	if (fs.existsSync(nvmrcPath)) {
		console.log('.nvmrc file exists, switching node version...');
		const nodeVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();
		shell.exec(`nvm use ${nodeVersion}`); // This will switch to the node version specified in .nvmrc
		console.log(`Switched to node version ${nodeVersion}`);
	} else {
		console.log('.nvmrc file does not exist, skipping node version switch...');
	}
}

// check if rvm cli is installed
if (!shell.which('rvm')) {
	console.error('rvm is not installed, please install it to set ruby version');
} else {
	// check if .ruby-version exists
	console.debug('rvm is installed, checking for .ruby-version file...');
	const rubyVersionPath = path.join(currentDir, '.ruby-version');
	if (fs.existsSync(rubyVersionPath)) {
		console.log('.ruby-version file exists, switching ruby version...');
		const rubyVersion = fs.readFileSync(rubyVersionPath, 'utf8').trim();
		shell.exec(`rvm use ${rubyVersion}`); // This will switch to the ruby version specified in .ruby-version
		console.log(`Switched to ruby version ${rubyVersion}`);
	} else {
		console.log(
			'.ruby-version file does not exist, skipping ruby version switch...',
		);
	}
}

// if node_modules exists
const nodeModulesPath = path.join(currentDir, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
	console.log('node_modules directory exists, removing it...');
	shell.exec('rm -rf node_modules'); // This will remove the node_modules directory
	console.log('node_modules directory removed');
}

// if Gemfile.lock exists
const gemfileLockPath = path.join(currentDir, 'Gemfile.lock');
if (fs.existsSync(gemfileLockPath)) {
	console.log('Gemfile.lock exists, removing it...');
	shell.exec('rm -f Gemfile.lock'); // This will remove the Gemfile.lock file
	console.log('Gemfile.lock file removed');
}

// if Podfile.lock exists
const podfileLockPath = path.join(currentDir, 'ios/Podfile.lock');
if (fs.existsSync(podfileLockPath)) {
	console.log('Podfile.lock exists, removing it...');
	shell.exec('rm -f Podfile.lock'); // This will remove the Podfile.lock file
	console.log('Podfile.lock file removed');
}

// if package-lock.json exists
const packageLockPath = path.join(currentDir, 'package-lock.json');
if (fs.existsSync(packageLockPath)) {
	console.log('package-lock.json exists, removing it...');
	shell.exec('rm -f package-lock.json'); // This will remove the package-lock.json file
	console.log('package-lock.json file removed');
}

// if yarn.lock exists
const yarnLockPath = path.join(currentDir, 'yarn.lock');
if (fs.existsSync(yarnLockPath)) {
	console.log('yarn.lock exists, removing it...');
	shell.exec('rm -f yarn.lock'); // This will remove the yarn.lock file
	console.log('yarn.lock file removed');
}

// install dependencies if .yarn exists
const yarnPath = path.join(currentDir, '.yarn');
if (fs.existsSync(yarnPath)) {
	console.log('.yarn directory exists, installing dependencies using yarn...');
	shell.exec('yarn install'); // This will install dependencies using yarn
	console.log('Dependencies installed using yarn');
} else {
	// install dependencies using npm
	console.log(
		'Installing dependencies using npm, as .yarn directory does not exist...',
	);
	shell.exec('npm install'); // This will install dependencies using npm
	console.log('Dependencies installed using npm');
}

// gem install bundler if not installed
shell.exec('gem install bundler');

// install gems if Gemfile exists
const gemfilePath = path.join(currentDir, 'Gemfile');
if (fs.existsSync(gemfilePath)) {
	console.log('Gemfile exists, installing gems...');
	shell.exec('bundle install'); // This will install gems
	console.log('Gems installed');
}

// install pods if ios/Podfile exists
const iosPath = path.join(currentDir, 'ios/Podfile');
if (fs.existsSync(iosPath)) {
	console.log('ios directory exists, installing pods...');
	shell.exec('cd ios && pod install'); // This will install pods for iOS
	console.log('Pods installed for iOS');
}
