<script setup>
import { ColorPalette, ThemeColor } from '@/_color_';
</script>

# 色彩体系

Meetcode UI 基于**HCT 色彩空间**创建全新的色彩体系。保障易生产、易维护、易上手和符合无障碍设计等特点。

## 主题色

<Color title="primary" :theme-color="ThemeColor.PRIMARY" :palette="ColorPalette.GREEN" />
<Color title="secondary" :theme-color="ThemeColor.SECONDARY" :palette="ColorPalette.C1" style="margin-top: 18px"  />
<Color title="tertiary" :theme-color="ThemeColor.TERTIARY" :palette="ColorPalette.C2" style="margin-top: 18px"  />

## 辅助色

除了主题色外，需要在不同的场景中使用不同的场景颜色 (例如，危险的颜色表示危险的操作)。

<Color title="info" :theme-color="ThemeColor.INFO" :palette="ColorPalette.BLUE"  />
<Color title="success" :theme-color="ThemeColor.SUCCESS" :palette="ColorPalette.GREEN" style="margin-top: 18px"  />
<Color title="warning" :theme-color="ThemeColor.WARNING" :palette="ColorPalette.ORANGE" style="margin-top: 18px"  />
<Color title="danger" :theme-color="ThemeColor.DANGER" :palette="ColorPalette.RED" style="margin-top: 18px"  />

## 其他配色

<Color title="pink" :theme-color="ColorPalette.PINK[5]" :palette="ColorPalette.PINK" style="margin-top: 18px"  />
<Color title="purple" :theme-color="ColorPalette.PURPLE[5]" :palette="ColorPalette.PURPLE" style="margin-top: 18px"  />

## 中性色

<Color title="neutral" :theme-color="ThemeColor.NEUTRAL" :palette="ColorPalette.GRAY" style="margin-top: 18px"  />
