const fs = require('fs')

let obsidianUri = '/Users/louis/Documents/obsidian2022/TaskWarrior/'
let dir = obsidianUri
const res = {
  fileCreated: false,
  folderCreated: false,
}

const addNote = (task) => {
  let fileName = `tw-${task.description.replace(' ', '-')}-${task.uuid}.md`
  
  if (task.project && task.addnote) {
    dir = `${dir}/${task.project}/`
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      res.folderCreated = true
    }
  }
  
  if (task.addnote) {
    task.addnote = `${dir}${fileName}`
    const fileData = `
      ---
      uuid: ${task.uuid}
      description: ${task.uuid}
      entry: ${task.entry}
      modified: ${task.modified}
      status: ${task.status}
      ---
    `
    fs.writeFileSync(`${dir}${fileName}`, fileData);
    res.fileCreated = true
  }
  res.task = task
  return res
}
module.exports = addNote