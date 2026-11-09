// Curated collection of inspiring quotes across diverse categories
const quotesData = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Motivation"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Wisdom"
  },
  {
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: "Philosophy"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Perseverance"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Motivation"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Courage"
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    category: "Happiness"
  },
  {
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein",
    category: "Creativity"
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant",
    category: "Wisdom"
  },
  {
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
    category: "Inspiration"
  },
  {
    text: "Two roads diverged in a wood, and I—I took the one less traveled by, and that has made all the difference.",
    author: "Robert Frost",
    category: "Life"
  },
  {
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa",
    category: "Kindness"
  },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
    category: "Mindfulness"
  },
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "Philosophy"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "Creativity"
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    category: "Motivation"
  },
  {
    text: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
    category: "Mindset"
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
    category: "Perseverance"
  },
  {
    text: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
    category: "Kindness"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "Hope"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    category: "Wisdom"
  },
  {
    text: "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde",
    category: "Life"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Courage"
  },
  {
    text: "Change your thoughts and you change your world.",
    author: "Norman Vincent Peale",
    category: "Mindset"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: "Courage"
  },
  {
    text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    author: "Marie Curie",
    category: "Science"
  },
  {
    text: "Not all those who wander are lost.",
    author: "J.R.R. Tolkien",
    category: "Life"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "Philosophy"
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "Life"
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
    category: "Wisdom"
  },
  {
    text: "An unexamined life is not worth living, but an unlived life is not worth examining.",
    author: "Oliver Wendell Holmes Jr.",
    category: "Philosophy"
  },
  {
    text: "Turn your wounds into wisdom.",
    author: "Oprah Winfrey",
    category: "Perseverance"
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
    category: "Success"
  },
  {
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso",
    category: "Creativity"
  },
  {
    text: "There are no shortcuts to any place worth going.",
    author: "Beverly Sills",
    category: "Perseverance"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    category: "Mindfulness"
  },
  {
    text: "A journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
    category: "Wisdom"
  },
  {
    text: "The best revenge is massive success.",
    author: "Frank Sinatra",
    category: "Success"
  },
  {
    text: "We don't see things as they are, we see them as we are.",
    author: "Anaïs Nin",
    category: "Perspective"
  },
  {
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    category: "Philosophy"
  },
  {
    text: "Knowing yourself is the beginning of all wisdom.",
    author: "Aristotle",
    category: "Wisdom"
  },
  {
    text: "Courage is not the absence of fear, but the triumph over it.",
    author: "Nelson Mandela",
    category: "Courage"
  },
  {
    text: "Art is the lie that enables us to realize the truth.",
    author: "Pablo Picasso",
    category: "Art"
  },
  {
    text: "If you look at what you have in life, you'll always have more.",
    author: "Oprah Winfrey",
    category: "Gratitude"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: "Hope"
  },
  {
    text: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman",
    category: "Optimism"
  },
  {
    text: "It is not death that a man should fear, but he should fear never beginning to live.",
    author: "Marcus Aurelius",
    category: "Philosophy"
  },
  {
    text: "I would rather die of passion than of boredom.",
    author: "Vincent van Gogh",
    category: "Passion"
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "Happiness"
  },
  {
    text: "Stay hungry, stay foolish.",
    author: "Stewart Brand",
    category: "Inspiration"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: "Action"
  },
  {
    text: "Doubt is the origin of wisdom.",
    author: "René Descartes",
    category: "Philosophy"
  },
  {
    text: "Do one thing every day that scares you.",
    author: "Eleanor Roosevelt",
    category: "Courage"
  },
  {
    text: "Nothing will work unless you do.",
    author: "Maya Angelou",
    category: "Motivation"
  },
  {
    text: "If you tell the truth, you don't have to remember anything.",
    author: "Mark Twain",
    category: "Honesty"
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    category: "Life"
  },
  {
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson",
    category: "Individuality"
  },
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: "Wisdom"
  },
  {
    text: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth",
    category: "Courage"
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    category: "Wisdom"
  },
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
    category: "Work Ethic"
  },
  {
    text: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    author: "Albert Einstein",
    category: "Creativity"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "Action"
  },
  {
    text: "Small deeds done are better than great deeds planned.",
    author: "Peter Marshall",
    category: "Action"
  },
  {
    text: "You cannot shake hands with a clenched fist.",
    author: "Indira Gandhi",
    category: "Peace"
  },
  {
    text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou",
    category: "Empathy"
  },
  {
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
    category: "Motivation"
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    category: "Growth"
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: "Success"
  },
  {
    text: "Difficulties strengthen the mind, as labor does the body.",
    author: "Seneca",
    category: "Philosophy"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "Impact"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Belief"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
    category: "Learning"
  },
  {
    text: "Life shrink or expands in proportion to one's courage.",
    author: "Anaïs Nin",
    category: "Courage"
  },
  {
    text: "Everything has beauty, but not everyone sees it.",
    author: "Confucius",
    category: "Perspective"
  },
  {
    text: "Be kind whenever possible. It is always possible.",
    author: "Dalai Lama",
    category: "Kindness"
  },
  {
    text: "Silence is a source of great strength.",
    author: "Lao Tzu",
    category: "Mindfulness"
  },
  {
    text: "What we achieve inwardly will change outer reality.",
    author: "Plutarch",
    category: "Growth"
  },
  {
    text: "The privilege of a lifetime is to become who you truly are.",
    author: "Carl Jung",
    category: "Self-discovery"
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    category: "Leadership"
  },
  {
    text: "Quality is not an act, it is a habit.",
    author: "Aristotle",
    category: "Excellence"
  },
  {
    text: "I attribute my success to this: I never gave or took any excuse.",
    author: "Florence Nightingale",
    category: "Success"
  },
  {
    text: "Waste no more time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius",
    category: "Philosophy"
  },
  {
    text: "Wisdom begins in wonder.",
    author: "Socrates",
    category: "Curiosity"
  },
  {
    text: "There is no substitute for hard work.",
    author: "Thomas Edison",
    category: "Work Ethic"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: "Strength"
  },
  {
    text: "If you want to go fast, go alone. If you want to go far, go together.",
    author: "African Proverb",
    category: "Collaboration"
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle",
    category: "Education"
  },
  {
    text: "Focus is a muscle; practice makes it stronger.",
    author: "Daniel Goleman",
    category: "Mindfulness"
  },
  {
    text: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
    category: "Hope"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: "Perseverance"
  },
  {
    text: "Adopt the pace of nature: her secret is patience.",
    author: "Ralph Waldo Emerson",
    category: "Patience"
  },
  {
    text: "When you reach the end of your rope, tie a knot in it and hang on.",
    author: "Franklin D. Roosevelt",
    category: "Resilience"
  },
  {
    text: "The power of imagination makes us infinite.",
    author: "John Muir",
    category: "Creativity"
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
    category: "Innovation"
  },
  {
    text: "Keep looking up... that's the secret of life.",
    author: "Charles M. Schulz",
    category: "Optimism"
  },
  {
    text: "Normality is a paved road: it's comfortable to walk, but no flowers grow on it.",
    author: "Vincent van Gogh",
    category: "Creativity"
  },
  {
    text: "No pressure, no diamonds.",
    author: "Thomas Carlyle",
    category: "Growth"
  },
  {
    text: "May your choices reflect your hopes, not your fears.",
    author: "Nelson Mandela",
    category: "Courage"
  }
];
