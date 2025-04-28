
export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  category: "technical" | "aptitude" | "communication";
  content: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number; // in minutes
  tags: string[];
  dateAdded: string;
}

export const studyMaterials: StudyMaterial[] = [
  // Technical Materials
  {
    id: "tech-js-basics",
    title: "JavaScript Fundamentals",
    description: "Core concepts of JavaScript programming language",
    category: "technical",
    content: `
# JavaScript Fundamentals

## Variables and Data Types

JavaScript has several data types:
- **Primitive Types**: String, Number, Boolean, Null, Undefined, Symbol, BigInt
- **Reference Types**: Object, Array, Function

\`\`\`javascript
// Variable declarations
let name = "John"; // String
const age = 30; // Number
var isStudent = true; // Boolean

// Arrays
const fruits = ["apple", "banana", "orange"];

// Objects
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};
\`\`\`

## Functions

Functions are first-class citizens in JavaScript:

\`\`\`javascript
// Function declaration
function greet(name) {
  return "Hello, " + name;
}

// Arrow function
const greetArrow = (name) => {
  return "Hello, " + name;
};

// Function expression
const greetExpr = function(name) {
  return "Hello, " + name;
};
\`\`\`

## Control Flow

JavaScript provides traditional control flow statements:

\`\`\`javascript
// If-else
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// Loops
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
\`\`\`
    `,
    difficulty: "beginner",
    estimatedTime: 30,
    tags: ["javascript", "web development", "programming"],
    dateAdded: "2023-01-15"
  },
  {
    id: "tech-react-intro",
    title: "Introduction to React",
    description: "Basic concepts of React library for building user interfaces",
    category: "technical",
    content: `
# Introduction to React

React is a JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer and allows you to create reusable UI components.

## Core Concepts

### 1. Components

Components are the building blocks of React applications. They are reusable pieces of code that return React elements describing what should appear on the screen.

\`\`\`jsx
// Functional component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
\`\`\`

### 2. Props

Props are inputs to components. They are data passed from a parent component to a child component.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
\`\`\`

### 3. State

State is a JavaScript object that stores dynamic data in a component. Unlike props, state can be changed.

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### 4. Lifecycle Methods

React components have lifecycle methods that allow you to run code at specific times in a component's life.

\`\`\`jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
    this.setState({date: new Date()});
  }
  
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
\`\`\`
    `,
    difficulty: "intermediate",
    estimatedTime: 45,
    tags: ["react", "javascript", "web development", "frontend"],
    dateAdded: "2023-02-10"
  },
  
  // Aptitude Materials
  {
    id: "apt-quant-basics",
    title: "Quantitative Aptitude Basics",
    description: "Fundamental concepts in mathematical aptitude for job interviews",
    category: "aptitude",
    content: `
# Quantitative Aptitude Basics

## Number Systems

A number system is a way of representing numbers. The most common is the decimal (base-10) system.

### Types of Numbers

- **Natural Numbers**: 1, 2, 3, 4, ...
- **Whole Numbers**: 0, 1, 2, 3, ...
- **Integers**: ..., -3, -2, -1, 0, 1, 2, 3, ...
- **Rational Numbers**: Numbers that can be expressed as p/q where p and q are integers and q ≠ 0
- **Irrational Numbers**: Numbers that cannot be expressed as a ratio of integers

## Percentage

Percentage means "out of 100". It is denoted by the symbol %.

### Formula

Percentage = (Value / Total Value) × 100

### Examples

1. What is 25% of 80?
   25% of 80 = (25/100) × 80 = 20

2. 15 out of 75 is what percent?
   (15/75) × 100 = 20%

## Ratio and Proportion

### Ratio

A ratio compares values. It shows how much of one thing there is compared to another thing.

- If there are 8 men and 6 women, the ratio of men to women is 8:6, which can be simplified to 4:3.

### Proportion

A proportion is an equation that states that two ratios are equal.

- If a:b = c:d, then a×d = b×c

### Example

If 3:5 = x:20, then x = (3×20)/5 = 12

## Time and Work

### Basic Formula

If A can do a work in n days, then A's 1 day's work = 1/n

### Examples

1. If A can complete a task in 10 days, what part of the task can A complete in 1 day?
   A's 1 day's work = 1/10

2. If A can complete a task in 8 days and B can complete the same task in 12 days, how many days will they take to complete the task working together?
   A's 1 day's work = 1/8
   B's 1 day's work = 1/12
   (A+B)'s 1 day's work = 1/8 + 1/12 = (3+2)/24 = 5/24
   So, they will complete the task in 24/5 = 4.8 days
    `,
    difficulty: "beginner",
    estimatedTime: 35,
    tags: ["aptitude", "mathematics", "quantitative"],
    dateAdded: "2023-01-20"
  },
  {
    id: "apt-logical-reasoning",
    title: "Logical Reasoning",
    description: "Techniques to solve logical reasoning problems",
    category: "aptitude",
    content: `
# Logical Reasoning

Logical reasoning assesses your ability to analyze information and draw conclusions. It's commonly tested in job interviews and entrance exams.

## Types of Logical Reasoning

### 1. Deductive Reasoning

Deductive reasoning starts with a general statement and examines the possibilities to reach a specific, logical conclusion.

**Example:**
- All mammals are warm-blooded animals.
- Dolphins are mammals.
- Therefore, dolphins are warm-blooded animals.

### 2. Inductive Reasoning

Inductive reasoning starts with specific observations and moves toward broader generalizations and theories.

**Example:**
- Every crow I've ever seen is black.
- Therefore, all crows are probably black.

### 3. Abductive Reasoning

Abductive reasoning starts with an observation then seeks the simplest and most likely explanation.

**Example:**
- The grass is wet.
- If it rained, the grass would be wet.
- Therefore, it probably rained.

## Common Types of Questions

### 1. Syllogisms

Syllogisms are logical arguments that involve two premises and a conclusion.

**Example:**
- All doctors are rich people.
- Some rich people are musicians.
- Can we conclude that some doctors are musicians?

(Answer: No, we cannot make this conclusion based on the given premises.)

### 2. Analogy

Analogies test your ability to identify relationships between pairs of words.

**Example:**
- Book is to Reading as Fork is to:
  a) Drawing
  b) Writing
  c) Eating
  d) Cooking

(Answer: c) Eating - A book is used for reading, similarly, a fork is used for eating.)

### 3. Classifications

Classification questions test your ability to identify which item does not belong in a group.

**Example:**
Which of the following does not belong?
a) Circle
b) Square
c) Rectangle
d) Ball

(Answer: d) Ball - All others are 2D shapes, while a ball is a 3D object.)

### 4. Series Completion

Series completion tests your ability to identify patterns and predict the next item in a sequence.

**Example:**
What comes next in the series: 2, 6, 12, 20, ?
a) 28
b) 30
c) 32
d) 36

(Answer: b) 30 - The pattern is adding consecutive even numbers: +4, +6, +8, +10)
    `,
    difficulty: "intermediate",
    estimatedTime: 40,
    tags: ["aptitude", "logical reasoning", "problem solving"],
    dateAdded: "2023-03-05"
  },
  
  // Communication Materials
  {
    id: "comm-interview",
    title: "Effective Interview Communication",
    description: "Techniques for clear and confident communication during job interviews",
    category: "communication",
    content: `
# Effective Interview Communication

Good communication skills are essential for success in job interviews. This guide covers key aspects of verbal and non-verbal communication to help you make a strong impression.

## Before the Interview

### Research and Preparation

- Research the company, role, and interviewers
- Prepare answers to common questions
- Prepare thoughtful questions to ask
- Practice your responses out loud

### Mental Preparation

- Visualize a successful interview
- Get enough rest the night before
- Plan to arrive 10-15 minutes early
- Review your resume and the job description

## Verbal Communication

### Language and Tone

- Speak clearly and at a moderate pace
- Vary your tone to emphasize important points
- Avoid filler words (um, like, you know)
- Use professional language; avoid slang

### Answering Questions

#### The STAR Method for Behavioral Questions

- **Situation**: Describe the context
- **Task**: Explain your responsibility
- **Action**: Detail the steps you took
- **Result**: Share the outcomes and what you learned

**Example:**
"Tell me about a time when you had to meet a tight deadline."

"In my previous role at XYZ Company, we had a client who suddenly moved up their product launch by two weeks (Situation). As the lead developer, I needed to ensure our software was ready for the launch (Task). I reorganized our team's priorities, delegated tasks based on strengths, and scheduled extra review sessions (Action). We delivered the software on time with zero critical bugs, and the client was so impressed they extended our contract for another year (Result)."

### Active Listening

- Give your full attention to the interviewer
- Nod occasionally to show understanding
- Ask clarifying questions when needed
- Reference earlier parts of the conversation to show engagement

## Non-Verbal Communication

### Body Language

- Maintain eye contact (without staring)
- Sit with good posture, slightly leaning forward
- Keep your hands visible, not crossed or hidden
- Smile naturally and appropriately

### First Impressions

- Dress appropriately for the company culture (but slightly more formal)
- Give a firm handshake
- Express enthusiasm and positivity
- Be mindful of your facial expressions

## After the Interview

### Follow Up

- Send a thank-you email within 24 hours
- Reference specific conversation points to show attention
- Briefly reiterate your interest and qualifications
- Keep it concise and professional

## Common Communication Mistakes to Avoid

- Interrupting the interviewer
- Speaking negatively about previous employers
- Giving overly rehearsed answers
- Checking your phone or watch
- Appearing disinterested or overly nervous
- Using technical jargon without explanation
- Providing vague or generic answers
    `,
    difficulty: "beginner",
    estimatedTime: 25,
    tags: ["communication", "interview skills", "soft skills"],
    dateAdded: "2023-02-28"
  },
  {
    id: "comm-public-speaking",
    title: "Public Speaking Fundamentals",
    description: "Essential techniques for effective presentations and speeches",
    category: "communication",
    content: `
# Public Speaking Fundamentals

Public speaking is a valuable skill for career advancement. Whether presenting to colleagues, clients, or at conferences, these fundamentals will help you become more confident and effective.

## Preparation

### Know Your Audience

- What's their knowledge level?
- What are their interests and needs?
- How will your content benefit them?
- What questions might they have?

### Structure Your Speech

The classic structure:
1. **Introduction**
   - Grab attention with a hook (story, statistic, question)
   - Establish credibility
   - Preview your main points

2. **Body**
   - Limit main points (3-5 is ideal)
   - Support with evidence, examples, and stories
   - Use transitions between points

3. **Conclusion**
   - Summarize key points
   - End with a call to action or memorable statement

### Practice Effectively

- Rehearse out loud, not just in your head
- Time yourself
- Practice in front of a mirror or record yourself
- Seek feedback from others

## Delivery

### Vocal Variety

- **Volume**: Vary for emphasis, avoid monotone
- **Rate**: Speed up for excitement, slow down for emphasis
- **Pitch**: Change to convey emotion and maintain interest
- **Pauses**: Use them strategically for impact

### Body Language

- **Posture**: Stand tall with shoulders back
- **Movement**: Move purposefully; avoid pacing
- **Gestures**: Use natural hand movements to emphasize points
- **Eye contact**: Connect with different audience members

### Visual Aids

- Keep slides simple (6x6 rule: max 6 points, 6 words per point)
- Use high-quality images
- Graphs and charts for data
- Don't read from slides

## Managing Nervousness

### Physical Techniques

- Deep breathing from the diaphragm
- Progressive muscle relaxation
- Arrive early to familiarize yourself with the space
- Stay hydrated

### Mental Strategies

- Visualize success
- Focus on your message, not yourself
- Remember: audiences want you to succeed
- Reframe nervousness as excitement

## Handling Q&A Sessions

- Anticipate likely questions
- Listen carefully to the entire question
- Repeat complex questions
- Be concise in your responses
- It's okay to say "I don't know, but I'll find out"

## Improving Over Time

- Join a public speaking group like Toastmasters
- Record yourself and analyze your performance
- Seek feedback from trusted colleagues
- Watch great speakers and learn from them
    `,
    difficulty: "intermediate",
    estimatedTime: 30,
    tags: ["communication", "public speaking", "soft skills", "presentations"],
    dateAdded: "2023-04-10"
  }
];
