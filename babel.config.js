module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-plus",
        "styleLibraryName": "theme-chalk"
      }
    ],
    /* ["import", {
      "libraryName": "ant-design-vue",
      "libraryDirectory": "es",
      "style": 'css',  // `style: true` 会加载 less 文件
    }], */
  ]
}
