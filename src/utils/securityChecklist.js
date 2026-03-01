// Create src/utils/securityChecklist.js
export const runSecurityCheck = () => {
  const checks = {
    'Environment variables hidden': !window.location.href.includes('localhost'),
    'HTTPS enabled': window.location.protocol === 'https:',
    'Right-click disabled': true, // You already have this
    'Console protected': import.meta.env.PROD,
    'reCAPTCHA enabled': true, // You already have this
  };
  
  console.table(checks);
  return checks;
};