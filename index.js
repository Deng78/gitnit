#!/usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const configStore = require('configstore');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const github = require('./lib/github');
const repo = require('./lib/repo');

const conf = new configStore('gitnit')

console.log(
    chalk.yellow(
        figlet.textSync('Gitnit', {horizontalLayout: 'full'})
    )
)
if(files.directoryExists('.git')){
    console.log(chalk.red('Already a git repository!'));
    process.exit();
}
 const getStoredGithubToken = async () =>{
    // Fetch token from config store
    let token = github.getStoredGithubToken()
    if(token){
        return token;
    }
    // No token found, use credentials to access GitHub account
    await github.setGithubCredentials();

    // Register Token
    token = await github.registerNewToken();
    return token;
 }

const run = async () =>{
    try{
        // Retrieve & Set Authentication Token
        const token = await getStoredGithubToken();
        github.githubAuth(token);

        // Create remote repo
        const url = await repo.createRemoteRepo();

        await repo.createGitignore();

        //Set up local repo and push to remote
        const done = await repo.setupRepo(url);
        if(done){
            console.log(chalk.green('All done!'));
        }
    }catch(err){
        if(err){
            switch (err.code){
                case 401: 
                    console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
                    break;
                case 422:
                    console.log(chalk.red('A remote repository already exists with the same name'));
                    break;
                default:
                    console.log(err);
            }
        }
    }
}
run()