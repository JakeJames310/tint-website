'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Quote,
  User,
  Building,
  Zap
} from 'lucide-react';
import ErrorBoundary from '../ErrorBoundary';

interface ReviewCardProps {
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

interface Review {
  id: number;
  name: string;
  company: string;
  role: string;
  rating: number;
  content: string;
  highlights: string[];
  avatar?: string;
}

export default function ReviewCardWrapper({ 
  className = '', 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: ReviewCardProps) {
  return (
    <ErrorBoundary>
      <ReviewCard 
        className={className} 
        autoPlay={autoPlay} 
        autoPlayInterval={autoPlayInterval} 
      />
    </ErrorBoundary>
  );
}

export function ReviewCard({ 
  className = '', 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: ReviewCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      company: 'TechFlow Solutions',
      role: 'CEO & Founder',
      rating: 5,
      content: 'Tesseract transformed our entire operation. What used to take weeks now happens in hours. The AI implementation was seamless, and the results were immediate. Our revenue increased by 200% within the first quarter.',
      highlights: [
        '200% revenue increase',
        'Seamless implementation',
        'Immediate results'
      ]
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      company: 'InnovateCorp',
      role: 'Operations Director',
      rating: 5,
      content: 'The automation solutions they built for us are game-changing. We\'ve reduced operational costs by 60% while improving customer satisfaction scores. The team at Tesseract truly understands business needs.',
      highlights: [
        '60% cost reduction',
        'Improved satisfaction',
        'Game-changing automation'
      ]
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      company: 'FutureScale Inc.',
      role: 'CTO',
      rating: 5,
      content: 'Working with Tesseract was like having a crystal ball for our business. Their predictive analytics and AI insights helped us make decisions that propelled us ahead of our competition. Absolutely phenomenal results.',
      highlights: [
        'Predictive analytics',
        'Competitive advantage',
        'Phenomenal results'
      ]
    }
  ];

  const nextReview = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevReview = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const goToReview = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextReview();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, nextReview]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      nextReview();
    } else {
      prevReview();
    }
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Client </span>
            <span className="text-innovation">Reviews</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients say about 
            <span className="text-innovation font-semibold"> bridging the intelligence dimension</span>.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Main Review Card */}
          <div className="relative bg-neutral border border-border rounded-3xl p-8 lg:p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(37, 252, 17, 0.1) 1px, transparent 1px),
                  radial-gradient(circle at 80% 80%, rgba(12, 129, 2, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }} />
            </div>

            {/* Quote Icon */}
            <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
              <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-2xl flex items-center justify-center opacity-20">
                <Quote size={24} className="text-primary" />
              </div>
            </div>

            <div className="relative z-10">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  {/* Review Content */}
                  <div className="text-center lg:text-left">
                    {/* Rating */}
                    <div className="flex items-center justify-center lg:justify-start mb-6">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${
                              i < reviews[currentIndex].rating
                                ? 'text-innovation fill-current'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-3 text-sm text-muted-foreground">
                        {reviews[currentIndex].rating}/5
                      </span>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed mb-8 max-w-4xl mx-auto lg:mx-0">
                      &ldquo;{reviews[currentIndex].content}&rdquo;
                    </blockquote>

                    {/* Highlights */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                      {reviews[currentIndex].highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-innovation/10 border border-innovation/20 rounded-full text-sm text-innovation font-medium"
                        >
                          <Zap size={12} className="mr-1" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Author Info */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-innovation to-trust rounded-full flex items-center justify-center">
                        <User size={24} className="text-primary" />
                      </div>
                      <div className="text-center lg:text-left">
                        <h3 className="text-lg font-bold text-white">
                          {reviews[currentIndex].name}
                        </h3>
                        <p className="text-innovation font-medium">
                          {reviews[currentIndex].role}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center justify-center lg:justify-start">
                          <Building size={14} className="mr-1" />
                          {reviews[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-innovation/5 to-transparent" />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-neutral border border-border rounded-full flex items-center justify-center hover:border-innovation hover:shadow-glow-innovation transition-all duration-300 group z-20 touch-manipulation min-w-[48px] min-h-[48px]"
          >
            <ChevronLeft 
              size={20} 
              className="text-muted-foreground group-hover:text-innovation transition-colors duration-300" 
            />
          </button>

          <button
            onClick={nextReview}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-neutral border border-border rounded-full flex items-center justify-center hover:border-innovation hover:shadow-glow-innovation transition-all duration-300 group z-20 touch-manipulation min-w-[48px] min-h-[48px]"
          >
            <ChevronRight 
              size={20} 
              className="text-muted-foreground group-hover:text-innovation transition-colors duration-300" 
            />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 touch-manipulation min-w-[12px] min-h-[12px] ${
                  index === currentIndex
                    ? 'bg-innovation scale-125'
                    : 'bg-muted-foreground hover:bg-innovation/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-innovation/10 to-trust/10 border border-innovation/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to <span className="text-innovation">Join Them</span>?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              See what AI transformation can do for your business. Start your success story today.
            </p>
            <button className="btn btn-primary text-lg px-8 py-4 group">
              <span className="mr-2">Get Started</span>
              <Zap size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export individual review components for reuse
export function ReviewItem({ review, className = '' }: { review: Review; className?: string }) {
  return (
    <div className={`bg-neutral border border-border rounded-3xl p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="flex space-x-1 mr-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < review.rating
                  ? 'text-innovation fill-current'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">{review.rating}/5</span>
      </div>
      
      <blockquote className="text-sm text-white mb-4 leading-relaxed">
        &ldquo;{review.content}&rdquo;
      </blockquote>
      
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-innovation to-trust rounded-full flex items-center justify-center">
          <User size={16} className="text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.role} at {review.company}</p>
        </div>
      </div>
    </div>
  );
}

// Export a simple review card for basic usage
export function SimpleReviewCard({ 
  name, 
  company, 
  role, 
  rating, 
  content 
}: {
  name: string;
  company: string;
  role: string;
  rating: number;
  content: string;
}) {
  return (
    <div className="group bg-neutral border border-border rounded-3xl p-6 hover:border-innovation hover:shadow-glow-innovation hover:bg-neutral/80 transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`${
                i < rating
                  ? 'text-innovation fill-current drop-shadow-sm'
                  : 'text-zinc-600'
              } transition-colors duration-300`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-innovation bg-innovation/10 px-2 py-1 rounded-full">{rating}/5</span>
      </div>
      
      <blockquote className="text-base text-white mb-6 leading-relaxed flex-1 group-hover:text-zinc-100 transition-colors duration-300">
        &ldquo;{content}&rdquo;
      </blockquote>
      
      <div className="flex items-center space-x-4 pt-4 border-t border-border/50">
        <div className="w-12 h-12 bg-gradient-to-br from-innovation to-trust rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <User size={20} className="text-black" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white group-hover:text-innovation transition-colors duration-300">{name}</p>
          <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 font-medium">{role}</p>
          <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">{company}</p>
        </div>
      </div>
    </div>
  );
}
