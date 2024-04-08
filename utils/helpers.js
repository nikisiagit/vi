export function slugify (string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function unslugify (string) {
  return string.toString().toLowerCase()
    .replace(/-+/g, ' ') // Replace - with spaces
    .replace(/\b[a-z]/g, function(l) {
      return l.toUpperCase();
    }) // Uppercase first letter of each word
}

/** Distance between two strings */
export function distance (s1, s2) {
  // Exit early if either are empty.
  if (s1.length === 0 || s2.length === 0) {
    return 0
  }

  // Exit early if they're an exact match.
  if (s1 === s2) {
    return 1
  }

  const range = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1
  const s1Matches = new Array(s1.length)
  const s2Matches = new Array(s2.length)

  let m = 0
  for (let i = 0; i < s1.length; i++) {
    const low = (i >= range) ? i - range : 0
    const high = (i + range <= (s2.length - 1)) ? (i + range) : (s2.length - 1)

    for (let j = low; j <= high; j++) {
      if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
        ++m
        s1Matches[i] = s2Matches[j] = true
        break
      }
    }
  }

  // Exit early if no matches were found.
  if (m === 0) {
    return 0
  }

  // Count the transpositions.
  let j; let k = 0
  let numTrans = 0

  for (let i = 0; i < s1.length; i++) {
    if (s1Matches[i] === true) {
      for (j = k; j < s2.length; j++) {
        if (s2Matches[j] === true) {
          k = j + 1
          break
        }
      }

      if (s1[i] !== s2[j]) {
        ++numTrans
      }
    }
  }

  let weight = (m / s1.length + m / s2.length + (m - (numTrans / 2)) / m) / 3
  let l = 0
  const p = 0.1

  if (weight > 0.7) {
    while (s1[l] === s2[l] && l < 4) {
      ++l
    }

    weight = weight + l * p * (1 - weight)
  }

  return weight
}

export function sortBy(list, property){
  const arr = [...list]
  return arr.sort((a,b) => (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0))
}
