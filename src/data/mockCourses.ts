import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Foundations of Artificial Intelligence & Neural Networks',
    description: 'Master the core mathematical and algorithmic principles behind modern AI, deep learning, gradient descent, and neural architectures.',
    category: 'AI & ML',
    level: 'Intermediate',
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Elena Vance',
    rating: 4.9,
    enrolledCount: 14250,
    chapters: [
      {
        title: 'Chapter 1: The Anatomy of a Neuron',
        lessons: [
          {
            id: 'l-1-1',
            title: 'Biological vs. Artificial Neurons',
            content: `### Introduction to Artificial Neurons
Artificial Neural Networks (ANNs) are inspired by the human brain. While biological neurons communicate via complex electrochemical signals across synapses, artificial neurons perform mathematical transformations on numerical inputs.

#### Key Components:
1. **Inputs ($x_1, x_2, ..., x_n$)**: Features or activation signals from preceding layers.
2. **Weights ($w_1, w_2, ..., w_n$)**: Parameters that determine the importance or strength of each input connection.
3. **Bias ($b$)**: An offset value that shifts the activation threshold, allowing the model to fit data even when inputs are zero.
4. **Activation Function**: A non-linear function (like ReLU, Sigmoid, or Tanh) that transforms the weighted sum into an output signal.

> **Formula:** 
> $$y = f(\\sum_{i=1}^{n} w_i x_i + b)$$

Without non-linear activation functions, stacked neural layers would collapse into a single linear transformation, limiting their expressive power.`,
            quiz: {
              question: 'What is the primary purpose of an activation function in a neural network?',
              options: [
                'To introduce non-linearity and enable learning complex patterns',
                'To store permanent database weights',
                'To speed up computer hardware fan speed',
                'To convert images into audio waveforms'
              ],
              correctIndex: 0,
              explanation: 'Activation functions introduce non-linear transformations so networks can model complex, non-linear relationships in data.'
            }
          },
          {
            id: 'l-1-2',
            title: 'Forward Propagation & Loss Functions',
            content: `### Forward Propagation
Forward propagation is the process where input data is fed through the network layers from left to right to generate a prediction $\\hat{y}$.

### Loss Functions
To know how well our model is performing, we calculate the **Loss** (or Cost) by comparing the prediction $\\hat{y}$ against the true target $y$.
- **Mean Squared Error (MSE)**: Used for regression tasks.
- **Binary Cross-Entropy**: Used for binary classification.
- **Categorical Cross-Entropy**: Used for multi-class classification.`,
            quiz: {
              question: 'Which loss function is standard for multi-class classification problems?',
              options: [
                'Mean Squared Error',
                'Categorical Cross-Entropy',
                'Linear Distance Loss',
                'Euclidean Vector Loss'
              ],
              correctIndex: 1,
              explanation: 'Categorical cross-entropy measures the difference between two probability distributions (predicted vs true labels) in multi-class problems.'
            }
          }
        ]
      },
      {
        title: 'Chapter 2: Optimization & Backpropagation',
        lessons: [
          {
            id: 'l-2-1',
            title: 'Gradient Descent & The Chain Rule',
            content: `### Gradient Descent
Gradient descent is an iterative optimization algorithm used to find the minimum of a loss function. Imagine walking down a foggy mountain by always stepping in the steepest downward direction.

#### The Update Rule:
$$w := w - \\eta \\frac{\\partial L}{\\partial w}$$
where $\\eta$ (eta) represents the **learning rate**—controlling the step size.

### Backpropagation
Backpropagation applies calculus (specifically the **chain rule**) backwards through the network to compute the gradient of the loss with respect to every weight, allowing efficient training.`,
            quiz: {
              question: 'What does the learning rate ($\\eta$) control in gradient descent?',
              options: [
                'The number of GPU cores used',
                'The step size taken during weight optimization',
                'The brightness of the screen',
                'The number of input features'
              ],
              correctIndex: 1,
              explanation: 'The learning rate determines how large of a step the optimizer takes down the gradient slope.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Quantum Mechanics & Quantum Computing',
    description: 'Explore qubits, superposition, entanglement, quantum gates, and how quantum computers solve complex problems exponentially faster.',
    category: 'Quantum Physics',
    level: 'Advanced',
    duration: '8 hours',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80',
    author: 'Prof. Marcus Thorne',
    rating: 4.8,
    enrolledCount: 9120,
    chapters: [
      {
        title: 'Chapter 1: Principles of Quantum Superposition',
        lessons: [
          {
            id: 'l-q-1',
            title: 'Qubits vs Classical Bits',
            content: `### The Quantum Bit (Qubit)
Unlike a classical bit which is strictly in state $|0\\rangle$ or $|1\\rangle$, a qubit can exist in a linear combination of both states simultaneously—a phenomenon known as **Superposition**.

#### State Representation:
$$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$$
where $|\\alpha|^2 + |\\beta|^2 = 1$.

When measured, the qubit collapses into either $|0\\rangle$ with probability $|\\alpha|^2$ or $|1\\rangle$ with probability $|\\beta|^2$.`,
            quiz: {
              question: 'What condition must the probability amplitudes $\\alpha$ and $\\beta$ satisfy for a valid qubit state?',
              options: [
                '$\\alpha + \\beta = 0$',
                '$|\\alpha|^2 + |\\beta|^2 = 1$',
                '$\\alpha = \\beta$',
                '$\\alpha \\times \\beta = 100$'
              ],
              correctIndex: 1,
              explanation: 'The sum of the squared magnitudes of the probability amplitudes must equal 1 (total probability of 100%).'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Modern Neuroscience: Decoding the Brain',
    description: 'Investigate synaptic plasticity, action potentials, neural mapping, and cognitive architectures of human consciousness.',
    category: 'Neuroscience',
    level: 'Intermediate',
    duration: '5 hours',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Sarah Lin',
    rating: 4.9,
    enrolledCount: 6840,
    chapters: [
      {
        title: 'Chapter 1: The Action Potential',
        lessons: [
          {
            id: 'l-n-1',
            title: 'Ion Channels & Membrane Potentials',
            content: `### Resting Membrane Potential
At rest, a neuron maintains a negative electrical potential of approximately -70mV inside relative to the outside, primarily maintained by the Sodium-Potassium pump ($Na^+/K^+$-ATPase).

### Action Potential Phases:
1. **Depolarization**: Voltage-gated sodium channels open; $Na^+$ rushes in.
2. **Repolarization**: Potassium channels open; $K^+$ rushes out.
3. **Hyperpolarization**: Potential dips below resting level before stabilizing.`,
            quiz: {
              question: 'Which ions primarily rush into the neuron during the depolarization phase of an action potential?',
              options: ['Sodium (Na+)', 'Calcium (Ca2+)', 'Chloride (Cl-)', 'Iron (Fe2+)'],
              correctIndex: 0,
              explanation: 'Sodium ions rush into the cell down their electrochemical gradient during depolarization.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Astrophysics: Black Holes & Cosmology',
    description: 'Journey through general relativity, event horizons, gravitational waves, cosmic inflation, and the origin of the universe.',
    category: 'Astrophysics',
    level: 'Beginner',
    duration: '7 hours',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Orion Vance',
    rating: 5.0,
    enrolledCount: 18900,
    chapters: [
      {
        title: 'Chapter 1: General Relativity & Spacetime Curvature',
        lessons: [
          {
            id: 'l-a-1',
            title: 'Gravity as Curvature',
            content: `### Einstein\'s Field Equations
According to General Relativity, space and time are fused into a 4-dimensional fabric called **spacetime**. Mass and energy tell spacetime how to curve, and curved spacetime tells mass how to move.

#### The Schwarzschild Radius ($r_s$):
The radius defining the event horizon of a non-rotating black hole:
$$r_s = \\frac{2GM}{c^2}$$`,
            quiz: {
              question: 'What does mass do to the fabric of spacetime according to General Relativity?',
              options: [
                'It creates magnetic repulsion',
                'It curves or warps spacetime',
                'It cools down ambient temperature',
                'It accelerates time universally'
              ],
              correctIndex: 1,
              explanation: 'Mass and energy warp the geometry of spacetime, which we experience as gravitational attraction.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-5',
    title: 'Philosophy of Mind & Ethics of Artificial General Intelligence',
    description: 'Examine the hard problem of consciousness, utilitarian ethics, alignment theory, and moral agency in artificial systems.',
    category: 'Philosophy',
    level: 'Advanced',
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    author: 'Prof. Arthur Pendelton',
    rating: 4.7,
    enrolledCount: 5200,
    chapters: [
      {
        title: 'Chapter 1: The Hard Problem of Consciousness',
        lessons: [
          {
            id: 'l-p-1',
            title: 'Qualia and Phenomenal Experience',
            content: `### What is the Hard Problem?
Philosopher David Chalmers distinguished between the "easy problems" of consciousness (such as cognitive processing, sensory discrimination, and verbal report) and the **Hard Problem**: *Why and how do physical processes in the brain give rise to subjective, qualitative experience (qualia)?*

#### Mary\'s Room Thought Experiment
Frank Jackson\'s famous thought experiment asks us to consider Mary, a brilliant scientist who knows every physical fact about color vision inside a black-and-white room, but has never seen color. When she steps outside and sees red for the first time, does she learn something new?`,
            quiz: {
              question: 'What does Mary\'s Room thought experiment aim to prove?',
              options: [
                'That physicalism/materialism might not capture the entirety of qualitative subjective experience (qualia)',
                'That humans cannot see infrared light',
                'That quantum mechanics governs vision',
                'That black and white are superior colors'
              ],
              correctIndex: 0,
              explanation: 'Mary learns something new (what red looks like), suggesting subjective experience has non-physical or qualitative dimensions not captured by mere physical facts.'
            }
          }
        ]
      }
    ]
  }
];

export const INITIAL_USER = {
  name: 'Alex Sterling',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  xp: 1250,
  streak: 5,
  completedCourses: ['course-4'],
  bookmarkedCourses: ['course-1', 'course-2'],
  badges: [
    {
      id: 'b-1',
      title: 'Cosmic Pioneer',
      description: 'Completed your first Astrophysics course',
      icon: '🚀',
      earned: true,
    },
    {
      id: 'b-2',
      title: 'Streak Master',
      description: 'Maintained a 5-day learning streak',
      icon: '🔥',
      earned: true,
    },
    {
      id: 'b-3',
      title: 'Quantum Novice',
      description: 'Solved 10 quantum computing quiz challenges',
      icon: '⚛️',
      earned: false,
    },
    {
      id: 'b-4',
      title: 'AI Architect',
      description: 'Generated a custom AI course',
      icon: '🤖',
      earned: false,
    }
  ]
};
