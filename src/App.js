import React from 'react';
import Header from './components/Header/Header';
import TextArea from './components/TextArea/TextArea';
import CalculatedTile from './components/CalculatedTile/CalculatedTile';
import TileArea from './components/TileArea/TileArea';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  initializeState = () => {
    return {
      wordCount: 0,
      letterCount: 0,
      longestWord: '-',
      averageWordLength: 0,
      readingDurationInSeconds: 0,
      medianWordLength: 0,
      medianWordLengthSorted: 0,
      mostCommonWords: ['-'],
      textLanguage: '-'
    };
  };

  state = {
    ...this.initializeState()
  };

  onTextAreaButtonClick = (textInput) => {
    // Return inital state if no input given
    if (textInput === '') {
      this.setState({ ...this.initializeState() });
      return;
    }
    // .match returns an array of items which match the RegExp (Return whole words that begin with one or more whitespace characters)
    const allWords = textInput.match(/(\b[^\s]+\b)/g);
    // If there are no words then return only the letter count (if it exists) besides the initial state 
    if (allWords === null) {
      const letters = textInput.match(/(.)/g);
      letters ? this.setState({ ...this.initializeState(), letterCount: letters.length }) : this.setState({ ...this.initializeState() });
      return;
    };
    const allWordsLength = allWords.length;
    const sortedWordsByLength = [...allWords].sort((a, b) => b.length - a.length);
    this.setState({
      wordCount: allWordsLength,
      // RegExp (Match any string which contains a single character, except newline or line terminator)
      letterCount: textInput.match(/(.)/g).length,
      // If a word is longer than the current longest word, make it the longest word
      longestWord: allWords.reduce((currLongest, currWord) => { return currWord.length > currLongest.length ? currWord : currLongest }).toLowerCase(),
      // Divide the sum of all word lengths by the amount of words
      averageWordLength: (allWords.reduce((sumOfLengths, currWord) => sumOfLengths + currWord.length, 0) / (allWordsLength)).toFixed(2),
      // We approximate the average reading speed to be 225 wpm, and that gives us 3.75 wps (225/60 because 1min = 60s)
      // Dividing the amount of words with 3.75 gives us the reading duration in seconds according to above calculations
      readingDurationInSeconds: (allWordsLength / 3.75).toFixed(2),
      // If the array is even, take the average of the 2 middle elements, otherwise return the middle element
      medianWordLength: allWordsLength % 2 === 0 ? ((allWords[allWordsLength / 2].length + allWords[(allWordsLength / 2) - 1].length) / 2).toFixed(2) : allWords[Math.floor(allWordsLength / 2)].length,
      // Above method but done on the length sorted array
      medianWordLengthSorted: allWordsLength % 2 === 0 ? ((sortedWordsByLength[allWordsLength / 2].length + sortedWordsByLength[(allWordsLength / 2) - 1].length) / 2).toFixed(2) : sortedWordsByLength[Math.floor(allWordsLength / 2)].length,
      mostCommonWords: this.findMostmostCommonWords(allWords),
      textLanguage: this.guessLanguage(allWords)
    });
  };

  findMostmostCommonWords = (wordsArray) => {
    let wordCount = {};
    let mostmostCommonWords = [];
    // Count how many times every word appears (We lowercase so "Okay" and "okay" count as the same word)
    wordsArray.forEach(word => {
      let wordLowerCased = word.toLowerCase();
      wordLowerCased in wordCount ? wordCount[wordLowerCased] += 1 : wordCount[wordLowerCased] = 1
    });
    // Sort object entries in descending order in a new object 
    const wordCountSorted = Object.fromEntries(
      Object.entries(wordCount).sort(([, a], [, b]) => b - a)
    );
    // Push first 5 words from sorted object to array which we will return
    let i = 0;
    for (const word in wordCountSorted) {
      if (i === 5) break;
      mostmostCommonWords.push(word);
      i += 1;
    };
    return mostmostCommonWords;
  };

  // Initalize arrays as class properties since the arrays are long (local function variables would create new instances every analyze call)
  englishStopWords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"];
  turkishStopWords = ["acaba", "altmyb", "alty", "ama", "bana", "bazy", "belki", "ben", "benden", "beni", "benim", "beb", "bin", "bir", "biri", "birkaç", "birkez", "birbey", "birbeyi", "biz", "bizden", "bizi", "bizim", "bu", "buna", "bunda", "bundan", "bunu", "bunun", "da", "daha", "dahi", "de", "defa", "diye", "doksan", "dokuz", "dört", "elli", "en", "gibi", "hem", "hep", "hepsi", "her", "hiç", "iki", "ile", "ise", "için", "katrilyon", "kez", "ki", "kim", "kimden", "kime", "kimi", "kyrk", "milyar", "milyon", "mu", "mü", "mý", "nasýl", "ne", "neden", "nerde", "nerede", "nereye", "niye", "niçin", "on", "ona", "ondan", "onlar", "onlardan", "onlari", "onlaryn", "onu", "otuz", "sanki", "sekiz", "seksen", "sen", "senden", "seni", "senin", "siz", "sizden", "sizi", "sizin", "trilyon", "tüm", "ve", "veya", "ya", "yani", "yedi", "yetmib", "yirmi", "yüz", "çok", "çünkü", "üç", "bey", "beyden", "beyi", "beyler", "bu", "buna", "bunda", "bundan", "bunu"];
  guessLanguage = (wordsArray) => {
    let turkishWords = 0;
    let englishWords = 0;
    // Return the language which has more of its stop words in the text, otherwise return unknown 
    wordsArray.forEach(word => {
      if (this.englishStopWords.includes(word)) englishWords += 1;
      if (this.turkishStopWords.includes(word)) turkishWords += 1;
    });
    if (englishWords === turkishWords) return 'unknown';
    return englishWords > turkishWords ? 'en' : 'tr'
  };

  render() {
    // Create array of tile components for calculated results from analyzed text 
    let calculatedTiles = Object.keys(this.state).map(key => (<CalculatedTile key={key} valueName={key} valueResult={this.state[key]} />));
    return (
      <>
        <Header title="Text Analyzer" subTitle="By Tarik Trokic" />
        <main>
          <TextArea handleTextAreaButtonClick={this.onTextAreaButtonClick} />
          <hr style={{ border: '3px solid var(--light-gray)', marginTop: '2rem' }} />
          <TileArea>
            {calculatedTiles}
          </TileArea>
        </main>
        <Footer text="Find out more about me and my work on social media!"/>
      </>
    );
  };
};

export default App;
