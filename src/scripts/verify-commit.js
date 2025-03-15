#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const messagePath = path.resolve('.git/COMMIT_EDITMSG')
const message = readFileSync(messagePath, 'utf8').trim()

const commitSummary = message.split('\n')[0]

const commitRE =
  /^(revert: )?(feat|fix|docs|style|refactor|perf|test|build|ci|chore|types|release)(\([\w\-\s]+\))?: .{5,100} \(#\d+\)$/

if (!commitRE.test(commitSummary)) {
  console.log('\n❌ [ERROR] Invalid commit message format!')
  console.log('\n📜 Your commit summary:')
  console.log(`   👉 ${commitSummary}`)
  console.log('\n✅ Expected format:')
  console.log('   🚀 feat(auth): add login with Google (#123)')
  console.log('   🛠 fix(ui): resolve navbar issue (#456)')
  console.log('   📖 docs(readme): update API documentation (#789)')
  console.log(
    '\n📌 Commit summary must include an issue number in the format (#123).'
  )
  console.log(
    '📌 Commit description (extra lines) is optional but recommended.'
  )
  process.exit(1)
}
