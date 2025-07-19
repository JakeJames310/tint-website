'use client';

import { motion } from 'framer-motion';
import { 
  Settings, 
  Info, 
  FileText, 
  Mail, 
  Calendar, 
  Star,
  LucideIcon
} from 'lucide-react';
import NodeButton from '../ui/NodeButton';

interface NodeGridProps {
  onServicesClick?: () => void;
  onAboutClick?: () => void;
  onCaseStudiesClick?: () => void;
  onContactClick?: () => void;
  onBookMeetingClick?: () => void;
  onReviewsClick?: () => void;
  className?: string;
}

interface NodeConfig {
  label: string;
  icon: LucideIcon;
  angle: number; // Angle in degrees (0-360)
  variant: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
}

export default function NodeGrid({
  onServicesClick,
  onAboutClick,
  onCaseStudiesClick,
  onContactClick,
  onBookMeetingClick,
  onReviewsClick,
  className = ''
}: NodeGridProps) {
  // Calculate node positions using trigonometry for oval shape
  const calculateNodePosition = (angle: number, radiusX: number, radiusY: number) => {
    const angleInRadians = (angle * Math.PI) / 180;
    const x = Math.round(Math.cos(angleInRadians) * radiusX * 100) / 100;
    const y = Math.round(Math.sin(angleInRadians) * radiusY * 100) / 100;
    return { x, y };
  };

  // Responsive oval dimensions - longer horizontal oval to frame hero content
  const desktopRadiusX = 600; // horizontal radius (wider)
  const desktopRadiusY = 300; // vertical radius (narrower)
  const mobileRadiusX = 420; // horizontal radius for mobile
  const mobileRadiusY = 200; // vertical radius for mobile
  const nodes: NodeConfig[] = [
    {
      label: 'Services',
      icon: Settings,
      angle: 0, // Top
      variant: 'primary',
      onClick: onServicesClick
    },
    {
      label: 'About',
      icon: Info,
      angle: 60, // Top-right
      variant: 'secondary',
      onClick: onAboutClick
    },
    {
      label: 'Case Studies',
      icon: FileText,
      angle: 120, // Bottom-right
      variant: 'secondary',
      onClick: onCaseStudiesClick
    },
    {
      label: 'Contact',
      icon: Mail,
      angle: 180, // Bottom
      variant: 'primary',
      onClick: onContactClick
    },
    {
      label: 'Book Meeting',
      icon: Calendar,
      angle: 240, // Bottom-left
      variant: 'secondary',
      onClick: onBookMeetingClick
    },
    {
      label: 'Reviews',
      icon: Star,
      angle: 300, // Top-left
      variant: 'secondary',
      onClick: onReviewsClick
    }
  ];

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Desktop Layout - Oval Grid */}
      <div className="hidden lg:block relative w-[1200px] h-[600px] mx-auto">



        {/* Node Buttons */}
        {nodes.map((node, index) => {
          const position = calculateNodePosition(node.angle, desktopRadiusX, desktopRadiusY);
          return (
            <motion.div
              key={node.label}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8 + (index * 0.1),
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <NodeButton
                label={node.label}
                icon={node.icon}
                variant={node.variant}
                size="md"
                onClick={node.onClick}
                className="transition-all duration-500 hover:scale-110"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Layout - Oval Grid */}
      <div className="lg:hidden relative w-[840px] h-[400px] mx-auto">



        {/* Node Buttons in Oval Pattern */}
        {nodes.map((node, index) => {
          const position = calculateNodePosition(node.angle, mobileRadiusX, mobileRadiusY);
          return (
            <motion.div
              key={node.label}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5 + (index * 0.1),
                type: "spring",
                stiffness: 200
              }}
              whileTap={{ scale: 0.95 }}
            >
              <NodeButton
                label={node.label}
                icon={node.icon}
                variant={node.variant}
                size="md"
                onClick={node.onClick}
                className="transition-all duration-300 hover:scale-105 touch-manipulation"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(37, 252, 17, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>


    </motion.div>
  );
}

// Export individual node components for reuse
export function ServicesNode({ onClick }: { onClick?: () => void }) {
  return <NodeButton label="Services" icon={Settings} variant="primary" onClick={onClick} />;
}

export function AboutNode({ onClick }: { onClick?: () => void }) {
  return <NodeButton label="About" icon={Info} variant="secondary" onClick={onClick} />;
}

export function CaseStudiesNode({ onClick }: { onClick?: () => void }) {
  return <NodeButton label="Case Studies" icon={FileText} variant="secondary" onClick={onClick} />;
}

export function ContactNode({ onClick }: { onClick?: () => void }) {
  return <NodeButton label="Contact" icon={Mail} variant="primary" onClick={onClick} />;
}

export function BookMeetingNode({ onClick }: { onClick?: () => void }) {
  return <NodeButton label="Book Meeting" icon={Calendar} variant="secondary" onClick={onClick} />;
}

export function ReviewsNode({ onClick }: { onClick?: () => void }) {
  return <NodeButton label="Reviews" icon={Star} variant="secondary" onClick={onClick} />;
}
