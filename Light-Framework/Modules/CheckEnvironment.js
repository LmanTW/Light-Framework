// Check Environment
export default () => {
  let browser = getBrowser()

  if (!['Chrome'].includes(browser)) console.warn(`Light-Framework May Not Work On "${browser}"`)
}

function getBrowser () {
  if (test(/opr\//i) || !!window.opr) return 'Opera'
  if (test(/edg/i)) return 'Edge'
  if (test(/chrome|chromium|crios/i)) return 'Chrome'
  if (test(/firefox|fxios/i)) return 'Firefox'
  if (test(/safari/i)) return 'Safari'
  if (test(/trident/i)) return 'IE'
}

// Test Regexp
function test (regexp) {
  return regexp.test(navigator.userAgent)
}
