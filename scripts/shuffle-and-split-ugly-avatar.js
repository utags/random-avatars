import fs from "node:fs"

function shuffle(array) {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

function main() {
  const text = fs.readFileSync(
    "data/ugly-avatar-generated-filelist.txt",
    "utf8"
  )
  try {
    const array = text.split("\n").filter(v => { return !!v})
    const newArray = shuffle(shuffle(array))
    const length = newArray.length
    const SIZE_PER_FILE = Math.floor(length / 10)
    let start = 0
    let index = 1

    while (start < length) {
      const trunk = newArray.slice(
        start,
        Math.min(start + SIZE_PER_FILE, length)
      )
      start += SIZE_PER_FILE

      fs.writeFileSync(
        `public/ugly-avatar/ugly-avatar-${index}.json`,
        JSON.stringify(trunk, null, 2) + "\n",
        "utf8"
      )
      index++
    }
  } catch (error) {
    console.error(error)
  }
}

main()
