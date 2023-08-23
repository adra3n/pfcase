/**
 * Fonksiyon 1 - Verilen kelimeyi dizide bulma.
 * @param {Array.<string>} data - Harfleri içeren string array. Örn: ["DALN","LIMO","KASA"]
 * @param {string} word - Aranacak kelime. Örn: "DAL"
 * @returns {Array.<{i: Number, j: Number}>}  - Örn: [ {i: 0, j: 0}, {i: 0, j: 1}, {i: 0, j: 2} ]
 * @description Fonksiyondan dönen obje dizisinde konum bilgileri sıralı yer almalıdır.
 * 'i' satır numarasını, j ise sutün numarasını temsil etmektedir.
 */

//word[0] lari bulup tek tek test edecek bir döngü
//word[0] bulunca 2. harf için yukarı, aşağı, sol, sağ, kontrol et. (Recursive fonks. kullanılabilir.)

//2. fonksiyon için 1. fonksiyondaki word u buradan aktarıyorum.
let usedWord = ''
function find(data, word) {
  let result = []
  //2. fonksiyonda kullanmak üzere kelimeyi saklıyorum.
  usedWord = word

  //satırları döngü ile tek tek dönüyoruz.
  for (let i = 0; i < data.length; i++) {
    let row = data[i]
    //satır içinde harfleri dönüyoruz
    for (let j = 0; j < row.length; j++) {
      //eğer word[0] harfe eşitse bu scopeta işlem yapıyoruz.
      if (row[j] === word[0]) {
        //Harf tutuyorsa recursive findWord fonksiyonu ile
        //harfi kontrol edip sonunda push luyoruz.
        if (findWord(data, word, i, j, 1)) {
          result.push({ i: i, j: j })

          //i ve j ters verildiğinde burada reverse ettim.
          return result.reverse()
        }
      }
    }
  }
  // Recursive function ile tek tek yönleri kontrol ediyoruz.
  function findWord(data, word, i, j, index) {
    // Tüm kelime bulundu mu kontrol et
    if (index === word.length) {
      return true
    }

    //4 yönü de kontrol ediyoruz.
    //Eğer 2 tane harf ihtimali varsa çakışma olup bir den fazla harf seçmesin diye
    //return yaparak döngüden çıkıyorum.

    // Yukarı
    //sinirlarin icinde mi ve kelimenin harfini içeriyor mu kontrol ediyoruz

    if (i - 1 >= 0 && data[i - 1][j] === word[index]) {
      //index+1 yapıp recursive olarak kontrole devam ediyoruz.

      if (findWord(data, word, i - 1, j, index + 1)) {
        //result içinde bu harf daha önceden eklenmiş mi diye kontrol ediyoruz, uygunsa pushluyoruz.

        result.push({ i: i - 1, j: j })
        return true
      }
    }

    // aşağı
    if (i + 1 < data.length && data[i + 1][j] === word[index]) {
      if (findWord(data, word, i + 1, j, index + 1)) {
        result.push({ i: i + 1, j: j })
        return true
      }
    }

    // sol
    if (j - 1 >= 0 && data[i][j - 1] === word[index]) {
      if (findWord(data, word, i, j - 1, index + 1)) {
        result.push({ i: i, j: j - 1 })
        return true
      }
    }

    // Sağ
    if (j + 1 < data[i].length && data[i][j + 1] === word[index]) {
      if (findWord(data, word, i, j + 1, index + 1)) {
        result.push({ i: i, j: j + 1 })
        return true
      }
    }

    // hiçbiri tutmzsa false döndür
    return false
  }

  // Satırları döngü ile tek tek dönüyoruz.
  for (let i = 0; i < data.length; i++) {
    let row = data[i]
    // satır içinde harfleri dönüyoruz
    for (let j = 0; j < row.length; j++) {
      // Eğer word[0] harfe eşitse bu scopeta işlem yapıyoruz.
      if (row[j] === word[0]) {
        // Harf tutuyorsa recursive findWord fonksiyonu ile
        // harfi kontrol edip sonunda push luyoruz.
        if (findWord(data, word, i, j, 1)) {
          result.push({ i: i, j: j })
        }
      }
    }
  }
  //i ve j yi ters aldığımdan reverse ile result içeriğini döndürüyorum.
  return result.reverse()
}

/**
 * Fonksiyon 2 - İstenilen kelimeyi diziye ekleme.
 * @param {Array.<string>} data - Harfleri içeren string array. Örn: ["   N","LIMO","KASA"]
 * @returns {Array.<string>}  - Örn: ["AABF","IKLM","NOPS"]
 * @description Boşluklar string içinde ' ' şeklinde bulunmaktadır.
 * Verilen örnekte ilk satırda 3 adet boşluk ve sonrasında 'N' harfi bulunmaktadır.
 * Boşluklar eşsiz harfler ile doldurulmalıdır.
 * Örnek: ["BFPN","LIMO","KASA"]
 * Sonrasında bu array alfabetik sıraya göre sıralanmalıdır ve sıralanan array döndürülmelidir.
 * Örnek: ["AABF","IKLM","NOPS"]
 */
function getNewData(data) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const rowLength = data[0].length
  console.log('data init', data)
  // Kullanılan harfleri belirliyoruz. find functiondan usedWord (word) değişkenini de kullanıyoruz.
  const usedLetters = [...usedWord, ...data.join(' ').replace(/ /g, '')]

  // alfabe (letters) içinden usedLetters ayıklanp availableLetters olarak spread op. ile yeni bir array oluşturuyoruz.
  const availableLetters = [...letters].filter(
    (letter) => !usedLetters.includes(letter)
  )

  console.log('available', availableLetters)

  //boşlukları uniqLetter ile dolduruyoruz yeni row dönüyoruz.
  const newData = data.map((row) => {
    let newRow = ''
    for (let j = 0; j < rowLength; j++) {
      if (row[j] === ' ') {
        let uniqLetter = availableLetters.shift()
        newRow += uniqLetter
      } else {
        newRow += row[j]
      }
    }
    return newRow
  })

  // sort etmeden önce split edip join ediyoruz
  const allLetters = newData.join('').split('')
  allLetters.sort()

  const resultArray = []
  for (let i = 0; i < allLetters.length; i += rowLength) {
    resultArray.push(allLetters.slice(i, i + rowLength).join(''))
  }
  return resultArray
}

export { find, getNewData }
