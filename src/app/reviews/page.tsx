'use client';

import { motion } from 'framer-motion';
import { SimpleReviewCard } from '../components/cards/ReviewCard';

export default function ReviewsPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const reviews = [
    {
      name: "Sarah Chen",
      company: "TechFlow Solutions",
      role: "CEO & Founder",
      rating: 5,
      content: "Tesseract transformed our entire operation. What used to take weeks now happens in hours. The AI implementation was seamless, and the results were immediate."
    },
    {
      name: "Marcus Rodriguez",
      company: "InnovateCorp",
      role: "Operations Director",
      rating: 5,
      content: "The automation solutions they built for us are game-changing. We've reduced operational costs by 60% while improving customer satisfaction scores."
    },
    {
      name: "Dr. Emily Watson",
      company: "FutureScale Inc.",
      role: "CTO",
      rating: 5,
      content: "Working with Tesseract was like having a crystal ball for our business. Their predictive analytics and AI insights helped us make decisions that propelled us ahead."
    },
    {
      name: "James Mitchell",
      company: "Digital Dynamics",
      role: "Founder",
      rating: 5,
      content: "The ROI was immediate and substantial. Tesseract didn't just implement AI—they reimagined our entire business model for the digital age."
    },
    {
      name: "Lisa Park",
      company: "NextGen Retail",
      role: "VP of Operations",
      rating: 5,
      content: "Their approach to digital transformation is unmatched. They understood our industry challenges and delivered solutions that exceeded our expectations."
    },
    {
      name: "David Thompson",
      company: "Streamline Systems",
      role: "CEO",
      rating: 5,
      content: "Tesseract's automation solutions have revolutionized our workflow. We're now operating at a level of efficiency we never thought possible."
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-black text-white pt-24 pb-16"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="w-full max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Client </span>
            <span className="text-innovation">Reviews</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our clients say about 
            bridging the intelligence dimension.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={itemVariants}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <SimpleReviewCard {...review} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-innovation/10 to-trust/10 border border-innovation/20 rounded-3xl p-8 lg:p-12 text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to <span className="text-innovation">Join Them</span>?
          </h2>
          <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
            See what AI transformation can do for your business. Start your success story today.
          </p>
          <button className="bg-innovation text-black font-bold px-8 py-4 rounded-2xl hover:bg-innovation/90 transition-colors duration-300">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}