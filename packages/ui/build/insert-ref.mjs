import fs from 'fs/promises'

const TYPES_PATH = './dist/types.d.ts'
const GLOBAL_TYPES = '/// <reference path="./components/global-components.d.ts" />\n'

async function run() {
    let content = await fs.readFile(TYPES_PATH, 'utf8')

    if (!content.startsWith(GLOBAL_TYPES)) {
        content = GLOBAL_TYPES + content
    }

    await fs.writeFile(TYPES_PATH, content, 'utf8')
}

run()
