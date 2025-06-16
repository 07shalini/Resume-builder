const natural = require("natural");
const stringSimilarity = require("string-similarity");
const tokenizer = new natural.WordTokenizer();

// Function to extract keywords from text
function extractKeywords(text) {
  // Convert to lowercase and tokenize
  const tokens = tokenizer.tokenize(text.toLowerCase());

  // Remove common stop words and short words
  const stopWords = new Set([
    "the",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "with",
    "by",
    "about",
    "as",
    "of",
    "from",
  ]);
  const keywords = tokens.filter(
    (token) => token.length > 2 && !stopWords.has(token)
  );

  return [...new Set(keywords)]; // Remove duplicates
}

// Function to calculate similarity score between two texts
function calculateSimilarity(text1, text2) {
  const keywords1 = extractKeywords(text1);
  const keywords2 = extractKeywords(text2);

  // Calculate keyword match percentage
  const matchingKeywords = keywords1.filter((keyword) =>
    keywords2.some((k) => stringSimilarity.compareTwoStrings(keyword, k) > 0.8)
  );

  const keywordScore =
    (matchingKeywords.length / Math.max(keywords1.length, keywords2.length)) *
    100;

  // Calculate overall text similarity
  const textSimilarity = stringSimilarity.compareTwoStrings(text1, text2) * 100;

  // Combine scores (70% keyword match, 30% overall similarity)
  return keywordScore * 0.7 + textSimilarity * 0.3;
}

// Function to analyze job title match
function analyzeJobTitle(resumeText, jobTitle) {
  const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());
  const jobTitleTokens = tokenizer.tokenize(jobTitle.toLowerCase());

  // Check if job title appears in resume
  const titleMatch = jobTitleTokens.every((token) =>
    resumeTokens.some((t) => stringSimilarity.compareTwoStrings(token, t) > 0.8)
  );

  return titleMatch ? 100 : 0;
}

// Main function to score resume against job description
function scoreResume(resumeText, jobDescription) {
  // Extract job title (assuming it's the first line or sentence)
  const jobTitle = jobDescription.split("\n")[0].trim();

  // Calculate different scores
  const keywordScore = calculateSimilarity(resumeText, jobDescription);
  const titleScore = analyzeJobTitle(resumeText, jobTitle);
  const skillsScore = calculateSimilarity(resumeText, jobDescription);

  // Combine scores (40% keyword match, 30% title match, 30% skills match)
  const overallScore = Math.round(
    keywordScore * 0.4 + titleScore * 0.3 + skillsScore * 0.3
  );

  // Extract matching keywords
  const matchingKeywords = extractKeywords(resumeText).filter((keyword) =>
    extractKeywords(jobDescription).some(
      (k) => stringSimilarity.compareTwoStrings(keyword, k) > 0.8
    )
  );

  // Generate suggestions based on the analysis
  const suggestions = [];
  if (keywordScore < 70) {
    suggestions.push(
      "Add more keywords from the job description to your resume"
    );
  }
  if (titleScore < 70) {
    suggestions.push(
      "Make sure your job title matches the position you're applying for"
    );
  }
  if (skillsScore < 70) {
    suggestions.push(
      "Highlight more of your relevant skills that match the job requirements"
    );
  }
  if (matchingKeywords.length < 5) {
    suggestions.push("Include more industry-specific keywords in your resume");
  }

  return {
    overallScore,
    keywordMatch: Math.round(keywordScore),
    skillsMatch: Math.round(skillsScore),
    matchingKeywords,
    suggestions,
  };
}

module.exports = {
  scoreResume,
  extractKeywords,
  calculateSimilarity,
  analyzeJobTitle,
};
