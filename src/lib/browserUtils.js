export function getBrowserInfo(userAgent) {
    const ua = userAgent || '';
    let browserName = 'Unknown Browser';
  
    if (ua.includes('Opera') || ua.includes('OPR')) {
      browserName = 'Opera';
    } else if (ua.includes('Chrome') && !ua.includes('Edge')) {
      browserName = 'Chrome';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      browserName = 'Safari';
    } else if (ua.includes('Firefox')) {
      browserName = 'Firefox';
    } else if (ua.includes('MSIE') || ua.includes('Trident')) {
      browserName = 'Internet Explorer';
    } else if (ua.includes('Edge')) {
      browserName = 'Edge';
    }
  
    return browserName;
  }
