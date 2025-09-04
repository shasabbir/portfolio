
import { Publication } from '@/types';

export const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'The Role of Quantum Entanglement in Neural Information Processing',
    authors: 'Gazi, N., & Chen, J.',
    venue: 'Journal of Cognitive Neuroscience',
    year: '2023',
    publicationType: 'Journal',
    doi: '10.1162/jocn_a_01234',
    abstract:
      'This paper explores the theoretical framework for how quantum entanglement could play a functional role in the brain, proposing a new model for long-range neural communication.',
    citation: {
      apa: 'Gazi, N., & Chen, J. (2023). The Role of Quantum Entanglement in Neural Information Processing. Journal of Cognitive Neuroscience, 35(4), 567-589.',
    },
  },
  {
    id: '2',
    title:
      'A Deep Learning Approach to Simulating Subatomic Particle Interactions',
    authors: 'Gazi, N., Kim, S., & Patel, A.',
    venue: 'Proceedings of the International Conference on Machine Learning',
    year: '2022',
    publicationType: 'Conference',
    url: '#',
    abstract:
      'We present a novel generative adversarial network (GAN) that learns to simulate complex particle interactions from raw accelerator data, achieving unprecedented accuracy.',
  },
  {
    id: '3',
    title: 'Topological Data Analysis for Uncovering AI Model Architectures',
    authors: 'Garcia, M., & Gazi, N.',
    venue: 'Nature Machine Intelligence',
    year: '2021',
    publicationType: 'Journal',
    doi: '10.1038/s42256-021-00456-7',
    abstract:
      'Using methods from topological data analysis, we demonstrate a new technique to visualize and understand the internal representational geometry of deep neural networks.',
  },
];
