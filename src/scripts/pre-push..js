#!/usr/bin/env node
import { execSync } from 'node:child_process'

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

const branchRegex =
  /^(feature|bugfix|hotfix|release|prerelease|improvement|library|chore|test|refactor|docs|ci|config|deps|design|i18n|security)\/#\d+-[a-z0-9._-]+$/

if (!branchRegex.test(branchName)) {
  console.error(
    `❌ ERROR: Invalid branch name '${branchName}'.\nBranch names must follow: ${branchRegex.toString()}`
  )
  process.exit(1)
}
