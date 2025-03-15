#!/usr/bin/env node
import { execSync } from 'node:child_process'

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

const allowedBranches = ['main', 'master', 'dev', 'staging', 'production']

const branchRegex =
  /^(feature|bugfix|hotfix|release|improvement|chore|refactor|test|docs|ci|config|deps|design|i18n|security)\/#\d+-[a-z0-9._-]+$/

if (!allowedBranches.includes(branchName) && !branchRegex.test(branchName)) {
  console.error(`🚨 Invalid branch name: "${branchName}"`)
  console.error(
    '✅ Branch name must follow the format: <type>/#<issue-number>-<short-description>'
  )
  console.error('💡 Example: feature/#123-add-login or bugfix/#456-fix-bug')
  process.exit(1)
}
