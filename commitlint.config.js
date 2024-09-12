module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    commit => '',
    commit => /^Merge branch/.test(commit) // 新增忽略合并提交的规则
  ],
  defaultIgnores: false
};
