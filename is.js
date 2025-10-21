function playFlames() {
  const name1 = document.getElementById('name1').value.toLowerCase().trim();
  const name2 = document.getElementById('name2').value.toLowerCase().trim();
  const result = document.getElementById('result');

  if (!name1 || !name2) {
    result.innerHTML = "Please enter both names! 😅";
    result.style.color = "red";
    return;
  }

  let n1 = name1.split('');
  let n2 = name2.split('');

  for (let i = 0; i < n1.length; i++) {
    for (let j = 0; j < n2.length; j++) {
      if (n1[i] === n2[j]) {
        n1[i] = n2[j] = '';
        break;
      }
    }
  }

  let remainCount = (n1.join('') + n2.join('')).length;
  let flames = ['F', 'L', 'A', 'M', 'E', 'S'];

  while (flames.length > 1) {
    let cutIndex = (remainCount % flames.length) - 1;
    if (cutIndex >= 0) {
      flames = flames.slice(cutIndex + 1).concat(flames.slice(0, cutIndex));
    } else {
      flames.pop();
    }
  }

  let meaning = {
    F: "Friends ❤️",
    L: "Love 💖",
    A: "Affection 💞",
    M: "Marriage 💍",
    E: "Enemies 💢",
    S: "Siblings 💛"
  };

  let relationship = meaning[flames[0]];
  result.style.color = "#ff2a6d";
  result.innerHTML = `Your relationship is: ${relationship}`;

  // SEND TO GOOGLE SHEET WEB APP
  const scriptURL = "https://script.google.com/macros/s/AKfycbw3Zvl_hDPQPctTlnyAZVdIFArRRDORbWJxWMbzdH_pZA_P8M5YEZcaZxWODvrvRwXu0w/exec";
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      name1: name1,
      name2: name2,
      relationship: relationship
    }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(txt => console.log("Saved:", txt))
  .catch(err => console.error("Error:", err));
}
