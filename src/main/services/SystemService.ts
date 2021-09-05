import { isMacOS } from '@/common/utils';
import { systemPreferences } from 'electron';
import { event, ServiceModule } from '.';

export default class SystemService extends ServiceModule {
  /**
   * 检查可用性
   */
  @event('/system/check-accessibility')
  checkAccessibilityForMacOS() {
    if (!isMacOS) return;
    return systemPreferences.isTrustedAccessibilityClient(true);
  }
}
