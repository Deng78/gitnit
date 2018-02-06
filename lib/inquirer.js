const inquirer = require('inquirer');
const files = require ('./files');

module.exports = {
    askGithubCredentials: () =>{
        const questions = [
            {
            name: 'username',
            type: 'input',
            message: 'Please Enter your Github username or email:',
            validate: value =>{
                if(value.length){
                    return true;
                }else{
                    return 'Please enter your username or email.';
                }
            }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your password:',
                validate: value =>{
                    if(value.length){
                        return true;
                    }else{
                        return 'Please enter your username or email.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
    askRepoDetails: () =>{
        const argv = require('minimist')(process.argv.splice(2));
        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the repo:',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: value =>{
                    if(value.length){
                        return true
                    }else{
                        return 'Please enter a name for the repository.'
                    }
                }
            },
            {
                type: 'name',
                name: 'Description',
                default: argv._[1] || null,
                message: '*Optional Enter a description of the repository:'
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or Private',
                choices: ['public', 'private'],
                default: 'public'
            }
        ];
        return inquirer.prompt(questions);
    },
    askIgnoreFiles: filelist =>{
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select the files and/or folders to ignore:',
                choices: filelist,
                default: ['node_modules', 'bower_components']
            }
        ];
        return inquirer.prompt(questions);
    }
}