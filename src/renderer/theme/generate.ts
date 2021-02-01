const fs = require('fs-extra');
const { join } = require('path');

/**
 * 自动生成覆盖方法
 */
class OverrideGenerator {
  constructor() {
    this.generateOverrideColors();
  }
  defaultColorPalettes: string[] = [
    'blue',
    'purple',
    'cyan',
    'green',
    'magenta',
    'pink',
    'red',
    'orange',
    'yellow',
    'volcano',
    'geekblue',
    'lime',
    'gold',
  ];

  overrideList: Record<string, string> = {
    colors: '',
  };

  /**
   * 根据色板生成覆盖色token
   * @param colorPalettes
   */
  generateOverrideColors = (
    colorPalettes: string[] = this.defaultColorPalettes,
  ) => {
    let overrideStr = '// overrides color palettes \n\n';
    colorPalettes.forEach((color) => {
      overrideStr += `@${color}-base: var(--${color}-base);\n`;

      for (let i = 1; i <= 10; i += 1) {
        const str = `@${color}-${i}: var(--${color}-${i});\n`;

        overrideStr += `${str}`;
      }
      overrideStr += '\n';
    });

    this.overrideList.colors = overrideStr;

    return overrideStr;
  };

  /**
   * 根据变量名称生成方法
   * @param name
   */
  generateOverrideToken = (name: string) => {
    return `@${name}: var(--${name});\n`;
  };

  /**
   * 生成文件
   * @param path 生成地址,默认是 override 地址
   * @param fileMaps 字符串与文件映射关系
   */
  generateFiles = (
    path: string = __dirname,
    fileMaps: string[] = ['colors'],
  ) => {
    let fileContent = `/**
 * AUTO GENERATED OVERRIDE FILES!
 * Please add this file to .gitignore
 */\n`;

    fileMaps.forEach((key) => {
      // 如果在输出列表里, 那么进行输出
      if (key in this.overrideList) {
        fileContent += this.overrideList[key];
        fileContent += '\n\n';
      }
    });
    this.writeFileHelper(path, 'override.less', fileContent);
  };

  /**
   * 私有的写入方法
   * @param dir
   * @param fileName
   * @param content
   */
  private writeFileHelper = (
    dir: string,
    fileName: string,
    content: string,
  ) => {
    fs.ensureDirSync(dir);
    fs.writeFileSync(join(dir, fileName), content, {
      encoding: 'utf-8',
    });
  };
}

export default OverrideGenerator;
