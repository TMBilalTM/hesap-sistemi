export function getDeviceType(userAgent) {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad/.test(ua)) {
    return 'Tablet';
  } else if (/mobile/.test(ua)) {
    return 'Mobile';
  } else if (/win/.test(ua)) {
    return 'Windows';
  } else if (/mac/.test(ua)) {
    return 'Mac';
  } else if (/linux/.test(ua)) {
    return 'Linux';
  } else {
    return 'Unknown';
  }
}
