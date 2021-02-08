import { isMacOS } from '@/common';
import { provideSingleton } from '@/utils';
import { systemPreferences } from 'electron';

@provideSingleton(SystemService)
export class SystemService {
  /**
   * 检查可用性
   */
  checkAccessibilityForMacOS() {
    if (!isMacOS) return;
    return systemPreferences.isTrustedAccessibilityClient(true);
  }
}
