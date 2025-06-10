const fields = ['name', 'email', 'phone', 'age', 'subject', 'message'];
const stats = {};

fields.forEach(id => {
  let startTime, keyCount = 0, text = '', freq = {};

  const el = document.getElementById(id);
  el.addEventListener('focus', () => startTime = new Date());

  el.addEventListener('input', (e) => {
    const char = e.data;
    if (char) {
      keyCount++;
      text = el.value;
      freq[char] = (freq[char] || 0) + 1;
    }
  });

  el.addEventListener('blur', () => {
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000;
    const topKey = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || "Aucune";
    stats[id] = {
      count: keyCount,
      text: text,
      topKey: topKey,
      time: duration
    };
  });
});

document.getElementById("keystroke-form").addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.setItem("keystrokeData", JSON.stringify(stats));
  window.location.href = "result.html";
});
