#!/usr/bin/env node
const readline = require('readline');
const args = require('minimist')(process.argv.slice(2));
const getData = require('./utils/processStdIn')
const main = async () => {
  const data = await getData()
  process.stdout.write(JSON.parse(data))
  if(args._ === 'add') {
  }
  // if command was `add` this means it was called via taskwarrior hooks
    // check for project arg
    // create file and project folder if non exist
      // if filename already exists add timestamp
      // set yaml frontmatter to task metadata
  
  // if command was `modify` this it was called via taskwarrior hooks
    // check metadata for existing note location, update metadata
    // if folder has changed, move file to new folder

  // if command was `open 37` find obs url in the task and open it in obsidian 
  
  // if command was `delete 37` find obs url and delete file 

  // if command was `complete 37` check env var to see if the user wants to delete the file on completion
    // delete file if yes 
  
}

main()