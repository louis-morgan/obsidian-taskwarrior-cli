#!/usr/bin/env node
const matter = require('gray-matter')
const fs = require('fs')
const args = require('minimist')(process.argv.slice(2));
const getData = require('./utils/processStdIn')
const addNote = require('./addNote');

const main = async () => {
  const data = await getData()
  const parsedData = data.map((task => JSON.parse(task)))
  // if command was `add` this means it was called via taskwarrior hooks
  if(args._.includes('add')) {
    // check for project arg
    // create file and project folder if non exist
    // if filename already exists add timestamp
    // set yaml frontmatter to task metadata
    const result = addNote(parsedData[0])
    if(!result.task) process.exit(1)

    const output = `${JSON.stringify(result.task)}`.replace(/\\n/g, '')
    process.stdout.write(output)
  }

  // if command was `modify` this it was called via taskwarrior hooks
  if(args._.includes('modify')) {
    // check metadata for existing note location, update metadata
    // if folder has changed, move file to new folder
    [originalTask, newTask] = parsedData

    if (!originalTask.addnote && newTask.addNote) {
      const res = addNote(newTask)
    }

    if (originalTask.addNote) {
      // new task is in different obsidian folder
      if (originalTask.project !== newTask.project) {
        newTask.addNote.replace(originalTask.project, newTask.project)
        fs.renameSync(originalTask.addnote, newTask.addnote)
      }
    }
    
    process.stdout.write(JSON.stringify(newTask))

  }
  

  // if command was `open 37` find obs url in the task and open it in obsidian 
  
  // if command was `delete 37` find obs url and delete file 

  // if command was `complete 37` check env var to see if the user wants to delete the file on completion
    // delete file if yes 
  
}

main()