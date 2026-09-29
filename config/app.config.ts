export const APP = {
  name: "Code Roaster",
  version: "v3",
  edition: "Desi Edition",
  event: "DevFest Nashik 2026",
  tagline: "Your code. Our problem now.",
  subTagline: "Paste your code. Pick your roast. Get humbled. Get the fix.",
  eyebrow: "CODE BOL RAHA HAI · मला वाचवा!",
} as const;

export const AI = {
  model: "gemini-3.5-flash-lite",
  fallbackModel: "gemini-flash-latest",
  modelLabel: "Gemini 3.5 Flash-Lite",
  maxAttempts: 3,
} as const;

export const ROAST_LEVELS = [
  {
    id: "dry",
    label: "Halka (Dry)",
    shortLabel: "Halka",
    emoji: "☕",
    description: "Mild and deadpan. Gentle jabs, mostly helpful. Cutting chai level warmth.",
  },
  {
    id: "sharp",
    label: "Tikha (Sharp)",
    shortLabel: "Tikha",
    emoji: "🌶️",
    description: "Pointed and witty. Calls out every mistake directly like Misal Pav with extra rassa.",
  },
  {
    id: "savage",
    label: "Zanzanit (Savage)",
    shortLabel: "Zanzanit",
    emoji: "🔥",
    description: "Maximum burn. Brutally honest, zero filter, but strictly technically accurate.",
  },
] as const;

export const PERSONAS = [
  {
    id: "standup",
    label: "Stand-up Roaster",
    emoji: "🎤",
    description: "Stage comic doing merciless developer crowd-work.",
  },
  {
    id: "sharmaji",
    label: "Sharma ji ka Beta",
    emoji: "🏆",
    description: "Overachiever comparing your loops to his 100 percentile rank.",
  },
  {
    id: "professor",
    label: "Strict Professor",
    emoji: "👓",
    description: "Red-pen ready, zero attendance, deducting marks on sight.",
  },
  {
    id: "bhau",
    label: "Hostel Bhau",
    emoji: "☕",
    description: "Senior bhau reviewing code at 3 AM with cold cutting chai.",
  },
  {
    id: "recruiter",
    label: "Campus Recruiter",
    emoji: "👔",
    description: "Rejecting your algorithm for cultural fit and notice period.",
  },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "c", label: "C", extension: "c" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "savage",
  persona: "standup",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
} as const;

export const SAMPLE = {
  language: "python",
  code: `def calculate_fare(distance, passenger_type):
    # Base fare calculation for Panchavati Express
    base_fare = 20
    
    # Bug 1: Assignment instead of comparison
    if passenger_type = "student":
        discount = 0.5
    else:
        discount = 0.0

    # Bug 2: Adding distance list instead of scalar & string concat
    total = (base_fare + distance * 12) * (1 - discount)
    return total + " INR"
`,
  errorMessage: `File "main.py", line 5
    if passenger_type = "student":
                      ^
SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?`,
} as const;
