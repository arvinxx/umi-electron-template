import { defineConfig } from 'umi';
import Config from '../../config/config';
import theme from './theme/theme';

export default defineConfig({ ...Config, theme });
