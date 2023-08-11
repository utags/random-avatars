import fs from "node:fs"

function main() {
  const text = fs.readFileSync("data/new-content.json", "utf8")
  try {
    const Content = JSON.parse(text)
    const newContent = []
    const keys = Object.keys(Content)
    for (const key of keys) {
      const files = Content[key]
      for (const [name, timestamp] of Object.entries(files)) {
        newContent.push(`${key}/${name}?t=${timestamp}`)
      }
    }

    // console.log(newContent)
    fs.writeFileSync(
      "data/new-content-array.json",
      JSON.stringify(newContent, null, 2) + "\n",
      "utf8"
    )
  } catch (error) {
    console.error(error)
  }
}

main()
