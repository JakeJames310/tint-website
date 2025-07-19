'use client';

import { 
  Brain, 
  Zap, 
  Globe
} from 'lucide-react';
import ErrorBoundary from '../ErrorBoundary';

// Note: ServiceCardProps interface removed as it was unused


export default function ServiceCardWrapper() {
  return (
    <ErrorBoundary>
      <div className="service-cards-wrapper">
        <AIConsultingCard />
        <AutomationCard />
        <DigitalTransformationCard />
      </div>
    </ErrorBoundary>
  );
}

export function AIConsultingCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="group bg-neutral border border-border rounded-2xl p-6 hover:border-innovation hover:shadow-glow-innovation hover:bg-neutral/80 transition-all duration-300 cursor-pointer h-full flex flex-col" onClick={onClick}>
      <div className="w-14 h-14 bg-gradient-to-br from-innovation to-trust rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Brain size={28} className="text-black" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-innovation transition-colors duration-300 leading-tight">AI Consulting & Implementation</h3>
        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">Transform your business with cutting-edge AI solutions tailored to your specific industry needs.</p>
      </div>
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center text-xs font-medium text-innovation group-hover:text-innovation/80">
          <div className="w-1.5 h-1.5 bg-innovation rounded-full mr-2"></div>
          Smart Implementation
        </div>
      </div>
    </div>
  );
}

export function AutomationCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="group bg-neutral border border-border rounded-2xl p-6 hover:border-innovation hover:shadow-glow-innovation hover:bg-neutral/80 transition-all duration-300 cursor-pointer h-full flex flex-col" onClick={onClick}>
      <div className="w-14 h-14 bg-gradient-to-br from-trust to-innovation rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Zap size={28} className="text-black" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-innovation transition-colors duration-300 leading-tight">Business Process Automation</h3>
        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">Streamline operations with intelligent automation that reduces costs and improves efficiency.</p>
      </div>
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center text-xs font-medium text-innovation group-hover:text-innovation/80">
          <div className="w-1.5 h-1.5 bg-innovation rounded-full mr-2"></div>
          Workflow Optimization
        </div>
      </div>
    </div>
  );
}

export function DigitalTransformationCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="group bg-neutral border border-border rounded-2xl p-6 hover:border-innovation hover:shadow-glow-innovation hover:bg-neutral/80 transition-all duration-300 cursor-pointer h-full flex flex-col" onClick={onClick}>
      <div className="w-14 h-14 bg-gradient-to-br from-innovation via-trust to-innovation rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Globe size={28} className="text-black" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-innovation transition-colors duration-300 leading-tight">Digital Transformation</h3>
        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">Complete digital overhaul for your business with modern technologies and processes.</p>
      </div>
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center text-xs font-medium text-innovation group-hover:text-innovation/80">
          <div className="w-1.5 h-1.5 bg-innovation rounded-full mr-2"></div>
          Future-Ready Solutions
        </div>
      </div>
    </div>
  );
}
