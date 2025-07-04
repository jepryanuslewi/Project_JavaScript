const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "Opportunities don't happen. You create them.",
    author: "Chris Grosser"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Do not wait for the perfect time and place to enter, for you are already onstage.",
    author: "Unknown"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  }
];

function randomQuoted() {
    const randomIndex = Math.round(Math.random() * quotes.length);
    const quoted = quotes[randomIndex];
    document.getElementById('text-quoted').textContent = quoted.text;
    document.getElementById('author').textContent = `- ${quoted.author}`;
}
document.getElementById('button').addEventListener('click', randomQuoted);
randomQuoted();