const fs = require('fs')

let obsidianUri = '/Users/louis/Documents/obsidian2022/TaskWarrior/'
let dir = obsidianUri
const res = {
  fileCreated: false,
  folderCreated: false,
}

const addNote = (task) => {
  const fileName = `tw-${task.description.replace(' ', '-')}.md`
  
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
      ---
    `
    fs.writeFileSync(`${dir}${fileName}`, fileData);
    res.fileCreated = true
    res.task = task
    return res
  }
  return res
}
module.exports = addNote