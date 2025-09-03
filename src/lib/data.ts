import { Publication, Blog } from '@/types';

export const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'The Role of Quantum Entanglement in Neural Information Processing',
    authors: 'Reed, E., & Chen, J.',
    venue: 'Journal of Cognitive Neuroscience',
    year: '2023',
    doi: '10.1162/jocn_a_01234',
    pdf: '#',
    abstract:
      'This paper explores the theoretical framework for how quantum entanglement could play a functional role in the brain, proposing a new model for long-range neural communication.',
    citation: {
      apa: 'Reed, E., & Chen, J. (2023). The Role of Quantum Entanglement in Neural Information Processing. Journal of Cognitive Neuroscience, 35(4), 567-589.',
    },
  },
  {
    id: '2',
    title:
      'A Deep Learning Approach to Simulating Subatomic Particle Interactions',
    authors: 'Reed, E., Kim, S., & Patel, A.',
    venue: 'Proceedings of the International Conference on Machine Learning',
    year: '2022',
    url: '#',
    abstract:
      'We present a novel generative adversarial network (GAN) that learns to simulate complex particle interactions from raw accelerator data, achieving unprecedented accuracy.',
  },
  {
    id: '3',
    title: 'Topological Data Analysis for Uncovering AI Model Architectures',
    authors: 'Garcia, M., & Reed, E.',
    venue: 'Nature Machine Intelligence',
    year: '2021',
    doi: '10.1038/s42256-021-00456-7',
    pdf: '#',
    abstract:
      'Using methods from topological data analysis, we demonstrate a new technique to visualize and understand the internal representational geometry of deep neural networks.',
  },
];

export const mockBlogs: Blog[] = [
  {
    slug: 'bridging-the-gap',
    title: 'Bridging the Gap Between Theoretical Physics and AI',
    excerpt:
      'The intersection of theoretical physics and artificial intelligence is not just a fascinating academic exercise; it is a frontier of innovation that promises to reshape our world.',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'abstract technology',
    date: '2024-05-15',
    author: {
      name: 'Dr. Evelyn Reed',
      avatar: 'https://picsum.photos/100/100',
    },
    tags: ['AI', 'Physics', 'Innovation'],
    content: `
      <p>The intersection of theoretical physics and artificial intelligence is not just a fascinating academic exercise; it is a frontier of innovation that promises to reshape our world. For decades, these two fields have developed on parallel tracks, each with its own set of complex challenges and groundbreaking discoveries. Today, as we stand at a technological crossroads, the convergence of these disciplines is creating unprecedented opportunities for synergy and advancement.</p>
      <p>Theoretical physics, the realm of quantum mechanics and cosmology, seeks to understand the fundamental laws of the universe. It deals with concepts that are often counterintuitive and mathematically intensive. AI, particularly deep learning, excels at finding patterns in vast datasets and solving complex, high-dimensional problems. By applying AI to the abstract problems of physics, we can potentially accelerate discoveries that would otherwise take generations of human effort.</p>
      <h3 class="font-headline text-2xl font-bold my-4">Simulating the Universe</h3>
      <p>One of the most exciting applications of AI in physics is in cosmological simulations. Creating a virtual universe is computationally expensive, but AI models can learn to generate these simulations with remarkable fidelity at a fraction of the cost. This allows us to test more theories, explore more "what-if" scenarios, and gain a deeper understanding of cosmic evolution.</p>
      <p>Conversely, principles from physics, such as quantum computing, are inspiring new architectures for AI. The concept of a qubit, which can exist in multiple states simultaneously, opens the door to massively parallel computation that could solve problems currently intractable for even the most powerful supercomputers. This could revolutionize fields from drug discovery to materials science.</p>
    `,
  },
  {
    slug: 'the-quantum-mind',
    title: 'The Quantum Mind: Consciousness and Computation',
    excerpt:
      'Could the mysterious nature of human consciousness be explained by the even more mysterious laws of quantum mechanics? This question has captivated thinkers for decades.',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'quantum brain',
    date: '2024-04-22',
    author: {
      name: 'Dr. Evelyn Reed',
      avatar: 'https://picsum.photos/100/100',
    },
    tags: ['Quantum Physics', 'Consciousness', 'Neuroscience'],
    content: `
      <p>Could the mysterious nature of human consciousness be explained by the even more mysterious laws of quantum mechanics? This question, once relegated to the fringes of science and philosophy, is gaining new traction as our understanding of both the brain and quantum systems deepens. The "quantum mind" or "quantum consciousness" hypothesis proposes that classical mechanics cannot fully explain consciousness, and that quantum-mechanical phenomena, such as entanglement and superposition, may play a direct and crucial role in the brain's functions.</p>
      <p>This is a bold and controversial idea. The brain is a warm, wet, and noisy environment, seemingly ill-suited for the delicate quantum states that are typically observed only in highly controlled, isolated laboratory settings at near-absolute-zero temperatures. The challenge of "decoherence"—the process by which a quantum system loses its quantum properties and behaves classically due to interaction with its environment—is a major hurdle for any quantum theory of the mind.</p>
    `,
  },
  {
    slug: 'ai-ethics-in-research',
    title: 'Navigating the Ethical Landscape of AI in Scientific Research',
    excerpt:
      'As we integrate AI more deeply into the scientific process, we must confront a new set of ethical challenges that require careful consideration and proactive governance.',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'ethics technology',
    date: '2024-03-10',
    author: {
      name: 'Dr. Evelyn Reed',
      avatar: 'https://picsum.photos/100/100',
    },
    tags: ['Ethics', 'AI', 'Research'],
    content: `
      <p>The integration of artificial intelligence into scientific research is a double-edged sword. On one hand, it offers the potential to accelerate discovery, analyze unprecedented volumes of data, and solve problems that have long been beyond our grasp. On the other, it raises profound ethical questions about bias, transparency, accountability, and the very nature of scientific inquiry. As we delegate more cognitive tasks to algorithms, we must establish a robust ethical framework to guide their use.</p>
      <p>One of the most pressing concerns is algorithmic bias. AI models are trained on data, and if that data reflects existing societal or historical biases, the AI will learn and perpetuate them. In medical research, an AI trained primarily on data from one demographic might make less accurate predictions for others, exacerbating health disparities. In criminal justice, biased algorithms can lead to discriminatory outcomes. Ensuring fairness and equity in AI-driven research requires careful dataset curation, bias detection, and mitigation strategies.</p>
    `,
  },
];
