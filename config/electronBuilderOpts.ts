/* eslint-disable no-template-curly-in-string */

export default {
  /**
   *  app 基础信息
   */
  appId: 'com.arvinxx.umi-electron-template',
  productName: 'Umi Electron Template',
  copyright: 'Copyright © 2021 Arvin Xu | All Right Reserved.',

  /**
   * 配置 notarize dmg
   * 在 `.env` 里添加两个环境变量
   *
   * APPLE_ID=你的apple id
   * APPLE_ID_PASSWORD= app-specific 密码 可以在 appleid.apple.com 创建
   *
   */
  afterSign: 'electron-builder-notarize',

  /**
   * win 配置项
   */
  win: {
    artifactName: '${name}_setup_${version}.${ext}',
    target: ['nsis'],
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowToChangeInstallationDirectory: true,
    license: 'build/license.txt',
  },

  /**
   * mac 配置项
   */
  mac: {
    category: 'public.app-category.developer-tools',
    target: ['dmg'],
    artifactName: '${name}_setup_${version}.${ext}',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    darkModeSupport: true,
    entitlements: 'build/entitlements.mac.plist',
    entitlementsInherit: 'build/entitlements.mac.plist',
  },
  dmg: {
    icon: 'build/volume.icns',
    background: 'build/background.png',
    title: '${productName}',
    iconSize: 80,
    window: {
      height: 422,
      width: 600,
    },
    contents: [
      {
        type: 'file',
        x: 144,
        y: 199,
      },
      {
        type: 'link',
        path: '/Applications',
        x: 451,
        y: 199,
      },
    ],
  },
  mas: {
    hardenedRuntime: false,
    darkModeSupport: true,
    provisioningProfile: 'build/embedded.provisionprofile',
    category: 'public.app-category.productivity',
    entitlements: 'build/entitlements.mas.plist',
    entitlementsInherit: 'build/entitlements.mas.inherit.plist',
    asarUnpack: [],
  },

  /**
   * linux 配置项
   */
  linux: {
    artifactName: '${name}_setup_${version}.${ext}',
    icon: 'build/icon.png',
    synopsis: 'umi electron template',
    category: 'Development',
  },

  /**
   * Publish 配置
   */
  publish: ['github'],

  /**
   * 构建配置项
   */
  compression: 'maximum', // 压缩比例
  npmRebuild: false,
  // asar: {
  //   smartUnpack: true,
  // },
};
