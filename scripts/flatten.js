import fs from "node:fs"

function main() {
  const text = fs.readFileSync("data/data.json", "utf8")
  try {
    const json = JSON.parse(text)
    const Content = json.Content
    const newContent = {}
    const keys = Object.keys(Content)
    for (const key of keys) {
      const newFiles = {}
      newContent[key] = newFiles
      const files = Content[key]
      const filesSet = new Set(Object.values(files))
      for (const file of filesSet) {
        const [name, timestamp] = file.split("?t=")
        newFiles[name] = timestamp
      }
    }

    // console.log(newContent)
    fs.writeFileSync(
      "data/new-content.json",
      JSON.stringify(newContent, null, 2) + "\n",
      "utf8"
    )
  } catch (error) {
    console.error(error)
  }
}

main()
